import styled from 'styled-components';

import { theme as appTheme } from '@layout';

const { blueCharcoal } = appTheme.colors;
const { widthTablet } = appTheme.breakpoints;
const { bottomBarOpening } = appTheme.animationDurations;

interface IBottomBarContainer {
  windowHeight: number;
  defaultMaxHeight: number;
  zIndex: number;
  showBar: boolean;
  isLandscape: boolean;
}

export const BottomBarContainer = styled.div<IBottomBarContainer>`
  overflow-x: hidden;
  overflow-y: ${({
    windowHeight,
    defaultMaxHeight,
  }) => (windowHeight < defaultMaxHeight ? 'auto' : 'hidden')};
  ${({ theme }) => theme.mixins.styledScroll};
  ${({
    theme,
    isLandscape,
  }) => theme.mixins.hideForMobile({
    isLandscape,
  })};

  max-height: ${({
    showBar,
    defaultMaxHeight,
  }) => (showBar ? `${defaultMaxHeight}px` : '0px')};
  transition: max-height ${bottomBarOpening}ms ease-out;
  position: fixed;
  top: ${({
    windowHeight,
    defaultMaxHeight,
  }) => (windowHeight < defaultMaxHeight
    ? '0px'
    : 'auto')}; // NOTE: to fix issue with non-scrolling bottom bar on android phones and blinking on input change
  bottom: 0;
  background: ${blueCharcoal};
  border-radius: 12px 12px 0 0;
  z-index: ${({ zIndex = '0' }) => zIndex};
  width: 100%;

  @media (min-width: ${widthTablet}) {
    width: 568px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
