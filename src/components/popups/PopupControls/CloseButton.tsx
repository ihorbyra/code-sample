import { memo, FC } from 'react';
import { useTheme } from 'styled-components';

import * as S from './PopupControls.styled';

interface ICloseButton {
  onClose: () => void;
}

export const CloseButton: FC<ICloseButton> = memo(({ onClose }) => {
  const { icons: { closeBig: close } } = useTheme();

  return (
    <S.Close onClick={onClose}>
      <img
        src={close}
        alt="close"
        loading="lazy"
      />
    </S.Close>
  );
});

CloseButton.displayName = 'CloseButton';
