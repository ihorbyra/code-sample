import { FC } from 'react';

import * as S from './Modal.styled';

export const ModalContent: FC = ({ children }) => (
  <S.ModalContent>{children}</S.ModalContent>
);
