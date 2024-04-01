import styled from 'styled-components';
import { theme } from '@layout';

const { noContent } = theme.zIndexes;

interface INoContentWrapper {
  showNoContent: boolean;
}

export const NoContentWrapper = styled.div<INoContentWrapper>`
  position: absolute;
  opacity: ${({ showNoContent }) => (showNoContent ? 1 : 0)};
  transition: opacity 300ms ease-in-out;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const NoContent = styled.span`
  padding: 0 10px;
  z-index: ${noContent};
`;
