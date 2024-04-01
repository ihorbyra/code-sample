import { memo, FC } from 'react';
import { useTheme } from 'styled-components';

import * as S from './PopupControls.styled';

interface IBackButton {
  onBack: () => void;
}

export const BackButton: FC<IBackButton> = memo(({ onBack }) => {
  const { icons: { back: backIcon } } = useTheme();

  return (
    <S.Back onClick={onBack}>
      <S.BackImg
        src={backIcon}
        alt="back"
        loading="lazy"
      />
    </S.Back>
  );
});

BackButton.displayName = 'BackButton';
