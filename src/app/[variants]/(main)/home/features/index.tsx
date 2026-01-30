'use client';

import { Flexbox } from '@lobehub/ui';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useHomeStore } from '@/store/home';
import { useUserStore } from '@/store/user';
import { authSelectors } from '@/store/user/slices/auth/selectors';

import CommunityAgents from './CommunityAgents';
import InputArea from './InputArea';
import RecentPage from './RecentPage';
import RecentResource from './RecentResource';
import RecentTopic from './RecentTopic';
import SuggestQuestions from './SuggestQuestions';
import WelcomeText from './WelcomeText';

const Home = memo(() => {
  const { i18n } = useTranslation();
  const isLogin = useUserStore(authSelectors.isLogin);
  const inputActiveMode = useHomeStore((s) => s.inputActiveMode);

  const showSuggestQuestions = inputActiveMode && ['agent', 'group'].includes(inputActiveMode);

  const Welcome = useCallback(() => <WelcomeText />, [i18n.language]);

  return (
    <Flexbox gap={40}>
      <Welcome />
      <InputArea />
      {showSuggestQuestions ? (
        <SuggestQuestions mode={inputActiveMode} />
      ) : (
        <>
          {isLogin && (
            <>
              <RecentTopic />
              <RecentPage />
            </>
          )}
          <CommunityAgents />
          {/*<FeaturedPlugins />*/}
          {isLogin && <RecentResource />}
        </>
      )}
    </Flexbox>
  );
});

export default Home;
