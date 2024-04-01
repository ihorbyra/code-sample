import { FC } from 'react';

import * as S from './Labels.styled';

interface ILabelLive {
  type: string;
}

export const LabelLive: FC<ILabelLive> = ({ type }) => (
  <S.LabelLive>{type}</S.LabelLive>
);
