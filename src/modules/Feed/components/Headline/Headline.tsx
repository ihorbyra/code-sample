import { FC } from 'react';

import * as S from './Headline.styled';

interface IHeadline {
  showAnimation?: boolean;
  showFadeOutAnimation?: boolean;
  title: string;
}

export const Headline: FC<IHeadline> = ({
  showAnimation, showFadeOutAnimation, title,
}) => (
  <S.Headline
    showAnimation={showAnimation}
    showFadeOutAnimation={showFadeOutAnimation}
  >
    <S.Title>{title}</S.Title>
  </S.Headline>
);
