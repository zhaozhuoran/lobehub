'use client';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { type StarterMode } from '@/store/home';

import Item from './Item';
import { useRandomQuestions } from './useRandomQuestions';

interface ListProps {
  mode: StarterMode;
}

const List = memo<ListProps>(({ mode }) => {
  const { t } = useTranslation('suggestQuestions');
  const questions = useRandomQuestions(mode);

  if (questions.length === 0) {
    return null;
  }

  return (
    <>
      {questions.map((item) => (
        <Item key={item.id} prompt={t(item.promptKey as any)} title={t(item.titleKey as any)} />
      ))}
    </>
  );
});

export default List;
