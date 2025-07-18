export interface Question {
  id: string;
  category: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string;
  explanation?: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  level: 'easy' | 'medium' | 'hard';
  color: string;
  icon: string;
  description: string;
}