import { FC } from 'react';

import * as S from './Time.styled';

interface ITime {
  time: string;
}

export const Time: FC<ITime> = ({ time }) => (
  <S.Time>{time}</S.Time>
);
