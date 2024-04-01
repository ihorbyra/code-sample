import { memo, FC } from 'react';

import { CloseButton } from './CloseButton';
import { BackButton } from './BackButton';
import * as S from './PopupControls.styled';

interface IPopupControls {
  onBack?: () => void;
  onClose?: () => void;
}

export const PopupControls: FC<IPopupControls> = memo(({
  onBack,
  onClose,
}) => (
  <S.ControlsContainer>
    {onBack && <BackButton onBack={onBack} />}
    {onClose && <CloseButton onClose={onClose} />}
  </S.ControlsContainer>
));

PopupControls.displayName = 'PopupControls';
