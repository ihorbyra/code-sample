import { FC } from 'react';

import * as S from './Modal.styled';

interface IModalTitle {
  title: string;
}

export const ModalTitle: FC<IModalTitle> = ({ title }) => <S.ModalTitle>{title}</S.ModalTitle>;
