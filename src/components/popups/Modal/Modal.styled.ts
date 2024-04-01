import styled from 'styled-components';

import { theme } from '@layout';

const { widthModal } = theme.breakpoints;
const {
  heather,
  shark,
} = theme.colors;
const { primary } = theme.fontSizes;
const { styledScroll } = theme.mixins;
const { delay } = theme.transitions;
const {
  modal,
  modalOverlay,
  white,
} = theme.zIndexes;

interface IModalProps {
  showModal?: boolean;
}

export const ModalOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${modalOverlay};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;

  @media (min-width: ${widthModal}) {
    ${styledScroll}
  }
`;

export const ModalDialog = styled.div`
  display: flex;
  margin: 0;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: ${widthModal}) {
    height: initial;
    min-height: calc(100% - 60px);
    margin: 30px auto;
    justify-content: center;
    align-items: center;
  }
`;

export const Modal = styled.div<IModalProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 40px 0 0 0;
  background: ${shark};
  box-shadow: 0 8px 16px rgba(25, 33, 40, 0.5);
  opacity: ${({ showModal }) => (showModal ? '1' : '0')};
  transition: ${delay} ease-out;
  color: ${heather};
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 0;
  z-index: ${modal};
  ${styledScroll};

  @media (min-width: ${widthModal}) {
    border-radius: 15px;
    overflow-y: hidden;
    width: ${widthModal};
    max-width: ${widthModal};
    height: auto;
  }
`;

export const SmallModal = styled(Modal)<IModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  height: initial;
  max-width: 334px;
  padding: 40px 40px 20px;
  opacity: 1;
  border-radius: 12px;
  @media (min-width: ${widthModal}) {
    max-width: 530px;
  }
`;

export const ModalTitle = styled.h1`
  font-weight: 300;
  font-size: 26px;
  line-height: 36px;
  color: ${white};
  text-align: center;
  margin: 0;
  padding: 0 43px;

  @media (min-width: ${widthModal}) {
    font-size: 32px;
    line-height: 40px;
    padding: 0 60px;
  }
`;

export const ModalContent = styled.div`
  align-items: center;
  font-size: ${primary};
`;

export const ModalCenteredContent = styled(ModalContent)`
  display: flex;
  justify-content: center;
`;
