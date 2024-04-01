import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectors, actions } from '@store';

import * as S from './BottomBar.styled';

interface IBottomBar {
  showBar: boolean;
  zIndex: number;
  defaultMaxHeight: number;
}

export const BottomBar: FC<IBottomBar> = ({
  showBar,
  zIndex,
  defaultMaxHeight = 600,
  children,
}) => {
  const dispatch = useDispatch();

  const isMobileLandscape = useSelector(selectors.common.selectIsMobileLandscape);
  const windowSizes = useSelector(selectors.common.selectWindowSizes);

  useEffect(() => {
    if (isMobileLandscape && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur(); // to close keyboard once phone was rotated
    }
  }, [isMobileLandscape]);

  return (
    <S.BottomBarContainer
      showBar={showBar}
      zIndex={zIndex}
      windowHeight={windowSizes.height}
      isLandscape={isMobileLandscape}
      defaultMaxHeight={defaultMaxHeight}
      onTransitionEnd={() => dispatch(actions.microTransactions.onBottomBarTransitionEnd())}
    >
      {children}
    </S.BottomBarContainer>
  );
};
