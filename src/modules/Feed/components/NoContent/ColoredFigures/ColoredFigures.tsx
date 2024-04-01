import { FC } from 'react';

import { theme } from '@layout';

import * as S from './ColoredFigures.styled';

const {
  orangeFigure, greenFigure, purpleFigure, orangeFigureSmall, purpleFigureSmall,
} = theme.icons;

export const ColoredFigures: FC = () => (
  <S.ColoredFigures>
    <S.OrangeFigureMobile
      src={orangeFigureSmall}
      alt="orange figure"
      loading="lazy"
    />
    <S.PurpleFigureMobile
      src={purpleFigureSmall}
      alt="purple figure"
      loading="lazy"
    />
    <S.OrangeFigure
      src={orangeFigure}
      alt="orange figure"
      loading="lazy"
    />
    <S.GreenFigure
      src={greenFigure}
      alt="green figure"
      loading="lazy"
    />
    <S.PurpleFigure
      src={purpleFigure}
      alt="purple figure"
      loading="lazy"
    />
  </S.ColoredFigures>
);
