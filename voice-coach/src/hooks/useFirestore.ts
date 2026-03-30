import { useState, useEffect, useCallback } from 'react';
import {
  collection, addDoc, updateDoc, doc, getDocs, deleteDoc,
  query, orderBy, serverTimestamp, Timestamp, increment,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '../firebase';
import { Session, CallRecord, CallAnalysis, ConversationEntry, ChatMessage } from '../types';

function sessionFromDoc(id: string, data: Record<string, unknown>): Session {
  return {
    id,
    name: data.name as string,
    scenario: data.scenario as string,
    voice: (data.voice as string) || 'Aoede',
    createdAt: (data.createdAt as Timestamp)?.toDate() ?? new Date(),
    lastCallAt: (data.lastCallAt as Timestamp)?.toDate(),
    lastScore: data.lastScore as number | undefined,
    callCount: (data.callCount as number) || 0,
    lastMessageText: data.lastMessageText as string | undefined,
    lastMessageAt: (data.lastMessageAt as Timestamp)?.toDate(),
  };
}

function callFromDoc(id: string, data: Record<string, unknown>): CallRecord {
  return {
    id,
    timestamp: (data.timestamp as Timestamp)?.toDate() ?? new Date(),
    durationSecs: (data.durationSecs as number) || 0,
    transcript: (data.transcript as ConversationEntry[]) || [],
    analysis: data.analysis as CallAnalysis,
  };
}

export function useFirestore(user: User | null) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  const sessionsPath = user ? `users/${user.uid}/sessions` : null;

  const loadSessions = useCallback(async () => {
    if (!sessionsPath) return;
    setSessionsLoading(true);
    try {
      const q = query(collection(db, sessionsPath), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const list: Session[] = [];
      snap.forEach((d) => list.push(sessionFromDoc(d.id, d.data() as Record<string, unknown>)));
      // Sort: sessions with recent calls first, then by createdAt
      list.sort((a, b) => {
        const ta = a.lastCallAt?.getTime() ?? a.createdAt.getTime();
        const tb = b.lastCallAt?.getTime() ?? b.createdAt.getTime();
        return tb - ta;
      });
      setSessions(list);
    } catch (e) {
      console.error('loadSessions error:', e);
    } finally {
      setSessionsLoading(false);
    }
  }, [sessionsPath]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const createSession = useCallback(async (name: string, scenario: string, voice: string): Promise<Session | null> => {
    if (!sessionsPath) return null;
    try {
      const ref = await addDoc(collection(db, sessionsPath), {
        name,
        scenario,
        voice,
        createdAt: serverTimestamp(),
        callCount: 0,
      });
      const newSession: Session = {
        id: ref.id, name, scenario, voice,
        createdAt: new Date(), callCount: 0,
      };
      setSessions((prev) => [newSession, ...prev]);
      return newSession;
    } catch (e) {
      console.error('createSession error:', e);
      return null;
    }
  }, [sessionsPath]);

  const loadCalls = useCallback(async (sessionId: string): Promise<CallRecord[]> => {
    if (!sessionsPath) return [];
    try {
      const callsPath = `${sessionsPath}/${sessionId}/calls`;
      const q = query(collection(db, callsPath), orderBy('timestamp', 'asc'));
      const snap = await getDocs(q);
      const calls: CallRecord[] = [];
      snap.forEach((d) => calls.push(callFromDoc(d.id, d.data() as Record<string, unknown>)));
      return calls;
    } catch (e) {
      console.error('loadCalls error:', e);
      return [];
    }
  }, [sessionsPath]);

  const saveCall = useCallback(async (
    sessionId: string,
    transcript: ConversationEntry[],
    analysis: CallAnalysis,
    durationSecs: number,
  ): Promise<void> => {
    if (!sessionsPath) return;
    try {
      const callsPath = `${sessionsPath}/${sessionId}/calls`;
      await addDoc(collection(db, callsPath), {
        timestamp: serverTimestamp(),
        durationSecs,
        transcript,
        analysis,
      });
      // Update session summary
      await updateDoc(doc(db, sessionsPath, sessionId), {
        lastCallAt: serverTimestamp(),
        lastScore: analysis.overallScore,
        callCount: increment(1),
      });
      // Refresh sessions list
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? { ...s, lastCallAt: new Date(), lastScore: analysis.overallScore, callCount: s.callCount + 1 }
            : s
        )
      );
    } catch (e) {
      console.error('saveCall error:', e);
    }
  }, [sessionsPath]);

  const loadMessages = useCallback(async (sessionId: string): Promise<ChatMessage[]> => {
    if (!sessionsPath) return [];
    try {
      const q = query(collection(db, `${sessionsPath}/${sessionId}/messages`), orderBy('timestamp', 'asc'));
      const snap = await getDocs(q);
      const msgs: ChatMessage[] = [];
      snap.forEach((d) => {
        const data = d.data() as Record<string, unknown>;
        msgs.push({
          id: d.id,
          role: data.role as 'user' | 'assistant',
          text: data.text as string,
          timestamp: (data.timestamp as Timestamp)?.toDate() ?? new Date(),
        });
      });
      return msgs;
    } catch (e) {
      console.error('loadMessages error:', e);
      return [];
    }
  }, [sessionsPath]);

  const appendMessage = useCallback(async (sessionId: string, role: 'user' | 'assistant', text: string): Promise<void> => {
    if (!sessionsPath) return;
    // Save message to subcollection
    addDoc(collection(db, `${sessionsPath}/${sessionId}/messages`), {
      role,
      text,
      timestamp: serverTimestamp(),
    }).catch((e) => console.error('appendMessage error:', e));
    // Update session's last message preview
    const truncated = text.length > 80 ? text.slice(0, 80) + '…' : text;
    updateDoc(doc(db, sessionsPath, sessionId), {
      lastMessageText: truncated,
      lastMessageAt: serverTimestamp(),
    }).catch((e) => console.error('updateLastMessage error:', e));
    // Optimistic update in state
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, lastMessageText: truncated, lastMessageAt: new Date() }
          : s
      )
    );
  }, [sessionsPath]);

  const deleteSession = useCallback(async (sessionId: string): Promise<void> => {
    if (!sessionsPath) return;
    // Optimistic: remove immediately, then sync to Firestore
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    deleteDoc(doc(db, sessionsPath, sessionId)).catch((e) => {
      console.error('deleteSession error:', e);
    });
  }, [sessionsPath]);

  return { sessions, sessionsLoading, loadSessions, createSession, loadCalls, saveCall, deleteSession, loadMessages, appendMessage };
}
