import { useMemo } from 'react';

import { type StarterMode } from '@/store/home';

const QUESTION_COUNT = 40;
const DISPLAY_COUNT = 12;

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
  return useMemo(() => {
    if (!mode || !['agent', 'group', 'write'].includes(mode)) {
      return [];
    }

    const ids = Array.from({ length: QUESTION_COUNT }, (_, i) => i + 1);
    const shuffled = shuffleArray(ids);
    return shuffled.slice(0, DISPLAY_COUNT).map((id) => ({
      id,
      promptKey: `${mode}.${String(id).padStart(2, '0')}.prompt`,
      titleKey: `${mode}.${String(id).padStart(2, '0')}.title`,
    }));
  }, [mode]);
};
