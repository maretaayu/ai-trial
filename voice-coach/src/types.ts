export interface ConversationEntry {
  role: 'user' | 'ai';
  text: string;
}

export interface CallAnalysis {
  overallScore: number;
  scores: {
    clarity: number;
    confidence: number;
    energy: number;
    empathy: number;
    structure: number;
  };
  summary?: string;
  strengths?: string[];
  improvements?: string[];
  feedback: string;
}

export interface CallRecord {
  id: string;
  timestamp: Date;
  durationSecs: number;
  transcript: ConversationEntry[];
  analysis: CallAnalysis;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface Session {
  id: string;
  name: string;
  scenario: string;
  voice: string;
  createdAt: Date;
  lastCallAt?: Date;
  lastScore?: number;
  callCount: number;
  lastMessageText?: string;
  lastMessageAt?: Date;
}

export type CallStatus =
  | 'idle'
  | 'connecting'
  | 'live'
  | 'ai-speaking'
  | 'user-speaking'
  | 'ending'
  | 'analyzing';
