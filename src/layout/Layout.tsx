import { FC, useEffect } from 'react';

import { GlobalStyle } from '@layout/GlobalStyle';
import { Notification } from '@components';
import { useSelector } from 'react-redux';
import { selectors } from '@store';
import { listeners } from '@utils';

import { useInitialLoad } from './useInitialLoad';
import {
  Header, Content,
  // Footer,
} from './components';

const { NetworkListener } = listeners;

export const Layout: FC = ({ children }) => {
  useInitialLoad();

  const isUserAuthorized = useSelector(selectors.profile.isUserAuthorized);
  const teamName = useSelector(selectors.feed.getTeamName);
  const titleName = teamName ? `${teamName} Antourage` : 'Antourage';

  useEffect(() => {
    if (document.title !== titleName) {
      document.title = titleName;
    }
  }, [titleName]);

  return (
    <>
      <GlobalStyle />
      <Notification />
      <NetworkListener />
      {isUserAuthorized && (
        <>
          <Header />
          <Content>{children}</Content>
        </>
      )}
      {/* <Footer /> */}
    </>
  );
};
