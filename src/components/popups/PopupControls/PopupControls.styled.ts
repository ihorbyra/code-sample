import styled from 'styled-components';

export const ControlsContainer = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const BaseButton = styled.button`
  position: absolute;
  top: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: ${({ theme }) => theme.zIndexes.modalControls};
`;

export const Back = styled(BaseButton)`
  left: 24px;
`;
export const BackImg = styled.img`
  opacity: 0.5;
`;

export const Close = styled(BaseButton)`
  right: 24px;
`;
