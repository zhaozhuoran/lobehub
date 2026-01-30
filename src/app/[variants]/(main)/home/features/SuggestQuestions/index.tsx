'use client';

import { Lightbulb } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { StarterMode } from '@/store/home';

import GroupBlock from '../components/GroupBlock';
import ScrollShadowWithButton from '../components/ScrollShadowWithButton';
import List from './List';

interface SuggestQuestionsProps {
  mode: StarterMode;
}

const SuggestQuestions = memo<SuggestQuestionsProps>(({ mode }) => {
  const { t } = useTranslation('suggestQuestions');

  if (!mode || !['agent', 'group', 'write'].includes(mode)) {
    return null;
  }

  return (
    <GroupBlock icon={Lightbulb} title={t('title')}>
      <ScrollShadowWithButton>
        <List mode={mode} />
      </ScrollShadowWithButton>
    </GroupBlock>
  );
});

export default SuggestQuestions;
