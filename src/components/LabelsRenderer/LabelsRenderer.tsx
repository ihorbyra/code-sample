import { FC } from 'react';

import { ILabelsRenderer } from './types';

import * as S from './LabelsRenderer.styled';

export const LabelsRenderer: FC<ILabelsRenderer> = ({ labels }) => (
  <S.LabelsLayer className="grid__item-labels_layer">
    {labels.map(({
      background, color, icon, key, text,
    }) => (
      <S.Label
        background={background}
        key={key}
      >
        <S.LabelText
          className="grid__item-label_text"
          color={color}
        >
          {icon && (
            <S.LiveCircle
              alt="live circle"
              loading="lazy"
              src={icon}
            />
          )}
          {text}
        </S.LabelText>
      </S.Label>
    ))}
  </S.LabelsLayer>
);
