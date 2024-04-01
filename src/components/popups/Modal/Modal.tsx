import * as React from 'react';

import * as S from './Modal.styled';
import { Portal } from '../../Portal';
import { CloseButton } from '../PopupControls';
import { EModalTypes, TCloseModal } from '../types';

interface IModal {
  children: JSX.Element[] | JSX.Element;
  type?: EModalTypes;
  showModal?: boolean;
  closeModal?: TCloseModal;
}

export const Modal: React.FC<IModal> = ({
  type = EModalTypes.regular,
  closeModal,
  showModal,
  children,
}) => {
  const modal = showModal
    ? (
      <Portal>
        <S.ModalOverlay>
          <S.ModalDialog>
            {type === EModalTypes.small ? (
              <S.SmallModal>{children}</S.SmallModal>
            ) : (
              <S.Modal showModal={showModal}>
                {closeModal && <CloseButton onClose={closeModal} />}
                {children}
              </S.Modal>
            )}
          </S.ModalDialog>
        </S.ModalOverlay>
      </Portal>
    )
    : null;

  return (
    <>{modal}</>
  );
};
