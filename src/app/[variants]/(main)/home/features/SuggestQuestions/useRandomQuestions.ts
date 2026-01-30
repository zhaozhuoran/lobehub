import { useEffect, useState } from 'react';

import { type StarterMode } from '@/store/home';

const QUESTION_COUNT = 20;
const DISPLAY_COUNT = 5;

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export interface QuestionItem {
  id: number;
  promptKey: string;
  titleKey: string;
}

export const useRandomQuestions = (mode: StarterMode): QuestionItem[] => {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);

  useEffect(() => {
    if (mode && ['agent', 'group', 'write'].includes(mode)) {
      const ids = Array.from({ length: QUESTION_COUNT }, (_, i) => i + 1);
      const shuffled = shuffleArray(ids);
      const selected = shuffled.slice(0, DISPLAY_COUNT).map((id) => ({
        id,
        promptKey: `${mode}.${id}.prompt`,
        titleKey: `${mode}.${id}.title`,
      }));
      setQuestions(selected);
    } else {
      setQuestions([]);
    }
  }, [mode]);

  return questions;
};
