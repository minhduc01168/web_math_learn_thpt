import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Question } from '../types';

interface QuestionContextType {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id' | 'createdAt'>) => void;
  getQuestionsByCategory: (category: string) => Question[];
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

// Sample questions data
const sampleQuestions: Question[] = [
  // Easy questions
  {
    id: '1',
    category: 'easy',
    question: '15 + 7 = ?',
    answer: '22',
    explanation: 'Để tính 15 + 7, ta cộng 15 với 7 để được 22.',
    createdAt: new Date()
  },
  {
    id: '2',
    category: 'easy',
    question: '25 - 8 = ?',
    answer: '17',
    explanation: 'Để tính 25 - 8, ta lấy 25 trừ đi 8 để được 17.',
    createdAt: new Date()
  },
  {
    id: '3',
    category: 'easy',
    question: '6 × 4 = ?',
    answer: '24',
    explanation: 'Để tính 6 × 4, ta nhân 6 với 4 để được 24.',
    createdAt: new Date()
  },
  // Medium questions
  {
    id: '4',
    category: 'medium',
    question: '348 + 267 = ?',
    answer: '615',
    explanation: 'Thực hiện phép cộng theo từng hàng: 8+7=15 (viết 5 nhớ 1), 4+6+1=11 (viết 1 nhớ 1), 3+2+1=6.',
    createdAt: new Date()
  },
  {
    id: '5',
    category: 'medium',
    question: 'Một lớp có 24 học sinh. Trong đó có 13 nam và còn lại là nữ. Hỏi có bao nhiêu học sinh nữ?',
    answer: '11 học sinh nữ',
    explanation: 'Số học sinh nữ = Tổng số học sinh - Số học sinh nam = 24 - 13 = 11.',
    createdAt: new Date()
  },
  {
    id: '6',
    category: 'medium',
    question: '456 ÷ 6 = ?',
    answer: '76',
    explanation: 'Thực hiện phép chia: 45 ÷ 6 = 7 (dư 3), hạ 6 xuống được 36 ÷ 6 = 6. Vậy 456 ÷ 6 = 76.',
    createdAt: new Date()
  },
  // Hard questions
  {
    id: '7',
    category: 'hard',
    question: 'Một hình chữ nhật có chiều dài 12cm, chiều rộng 8cm. Tính diện tích hình chữ nhật đó.',
    answer: '96 cm²',
    explanation: 'Diện tích hình chữ nhật = Chiều dài × Chiều rộng = 12 × 8 = 96 cm².',
    createdAt: new Date()
  },
  {
    id: '8',
    category: 'hard',
    question: 'Mẹ mua 3 kg táo với giá 45,000 đồng. Hỏi 1 kg táo giá bao nhiêu?',
    answer: '15,000 đồng',
    explanation: 'Giá 1 kg táo = Tổng tiền ÷ Số kg = 45,000 ÷ 3 = 15,000 đồng.',
    createdAt: new Date()
  },
  {
    id: '9',
    category: 'hard',
    question: 'Tìm x biết: x + 35 = 127',
    answer: 'x = 92',
    explanation: 'x + 35 = 127, suy ra x = 127 - 35 = 92.',
    createdAt: new Date()
  }
];

export const QuestionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);

  const addQuestion = (newQuestion: Omit<Question, 'id' | 'createdAt'>) => {
    const question: Question = {
      ...newQuestion,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setQuestions(prev => [...prev, question]);
  };

  const getQuestionsByCategory = (category: string) => {
    return questions.filter(q => q.category === category);
  };

  return (
    <QuestionContext.Provider value={{ questions, addQuestion, getQuestionsByCategory }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionProvider');
  }
  return context;
};