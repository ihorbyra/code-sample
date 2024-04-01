import styled from 'styled-components';

import { theme } from '@layout';

const { headerHeight } = theme.sizes;

export const Content = styled.div`
  display: block;
  max-width: 100vw;
  position: relative;
  top: ${headerHeight};
  height: calc(100% - ${headerHeight});
`;
