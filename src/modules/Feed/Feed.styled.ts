import styled from 'styled-components';

import { theme } from '@layout';

const { lgMobile } = theme.breakpoints;

export const FeedWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Feed = styled.div``;

export const FeedItemSection = styled.section`
  width: var(--view-width);
`;

export const Version = styled.div`
  display: none;
`;

export const EmptyBlock = styled.div`
  height: 60px;

  @media (min-width: ${lgMobile}) {
    height: 80px;
  }
`;
