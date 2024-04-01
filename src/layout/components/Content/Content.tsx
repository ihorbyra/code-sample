import debounce from 'lodash/debounce';
import {
  FC, useEffect, useRef,
} from 'react';
import { useMatch } from 'react-router-dom';

import { routes } from '@routes';
import { getSessionStorageItem, setSessionStorageItem } from '@utils';

import * as S from './Content.styled';

export const Content: FC = ({ children }) => {
  const isFeedRoute = Boolean(useMatch(routes.HOME));
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const top = Number(getSessionStorageItem('scrollTop'));
    if (isFeedRoute && top && ref.current) {
      ref.current.scrollTo({
        top,
      });
    }
  }, [isFeedRoute]);

  const handleScroll = (): void => {
    if (!ref?.current?.scrollTop) return;
    const { scrollTop } = ref.current;
    setSessionStorageItem('scrollTop', scrollTop);
  };

  return (
    <S.Content
      id="layout-content"
      ref={ref}
      onScroll={debounce(handleScroll, 300)}
    >
      {children}
    </S.Content>
  );
};
