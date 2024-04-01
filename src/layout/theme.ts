import { css, DefaultTheme } from 'styled-components';

import arrowBackWithoutPaddings from '@assets/icons/arrowBackWithoutPaddings.svg';
import arrowDown from '@assets/icons/arrowDown.svg';
import card from '@assets/icons/card.svg';
import close from '@assets/icons/close.svg';
import closeBig from '@assets/icons/closeBig.svg';
import contentUnavailable from '@assets/icons/contentUnavailable.png';
import userLogin from '@assets/icons/userLogin.svg';
import arrowTopRight from '@assets/icons/arrowTopRight.svg';
import arrowTopRightWhite from '@assets/icons/arrowTopRightWhite.svg';
import arrowLeft from '@assets/icons/arrow-left.svg';
import arrowRight from '@assets/icons/arrow-right.svg';
import arrowRightSmall from '@assets/icons/arrowRightSmall.svg';
import feedHeadline from '@assets/icons/feed-headline.svg';
import bigArrowLeft from '@assets/icons/big-arrow-left.svg';
import bigArrowRight from '@assets/icons/big-arrow-right.svg';
import iconEye from '@assets/icons/iconEye.svg';
import imagesGroup from '@assets/icons/imagesGroup.svg';
import poll from '@assets/icons/poll.svg';
import pollGray from '@assets/icons/pollGray.svg';
import pollNew from '@assets/icons/pollNew.svg';
import pollWhite from '@assets/icons/pollWhite.svg';
import redCircle from '@assets/icons/redCircle.svg';
import triangleLeftDark from '@assets/icons/triangleLeftDark.svg';
import triangleRightLight from '@assets/icons/triangleRightLight.svg';
import triangleLeftLight from '@assets/icons/triangleLeftLight.svg';
import causeFlag from '@assets/icons/causeFlag.svg';
import diamond from '@assets/icons/diamond.svg';
import checked from '@assets/icons/checked.svg';
import send from '@assets/icons/send.svg';
import back from '@assets/icons/back.svg';
import spinner from '@assets/icons/spinner.svg';
import metabet from '@assets/icons/metabet.svg';
import metabetBouncing from '@assets/icons/metabetBouncing.svg';
import closeBigBlack from '@assets/icons/closeBigBlack.svg';
import conversation from '@assets/icons/conversation.svg';
import arrowDownThin from '@assets/icons/arrowDownThin.svg';
import error from '@assets/icons/error.svg';
import pollArrow from '@assets/icons/pollArrow.svg';
import pollArrowBlue from '@assets/icons/pollArrowBlue.svg';
import readMoreArrow from '@assets/icons/readMoreArrow.svg';
import unmute from '@assets/icons/unmute.svg';
import orangeFigure from '@assets/icons/orangeFigure.svg';
import greenFigure from '@assets/icons/greenFigure.svg';
import purpleFigure from '@assets/icons/purpleFigure.svg';
import orangeFigureSmall from '@assets/icons/orangeFigureSmall.svg';
import purpleFigureSmall from '@assets/icons/purpleFigureSmall.svg';

const commonTheme: DefaultTheme = {
  icons: {
    arrowBackWithoutPaddings,
    arrowTopRight,
    arrowTopRightWhite,
    arrowDown,
    card,
    close,
    closeBig,
    contentUnavailable,
    userLogin,
    arrowLeft,
    arrowRight,
    arrowRightSmall,
    feedHeadline,
    bigArrowLeft,
    bigArrowRight,
    iconEye,
    imagesGroup,
    poll,
    pollGray,
    pollNew,
    pollWhite,
    redCircle,
    triangleLeftDark,
    triangleLeftLight,
    triangleRightLight,
    causeFlag,
    diamond,
    send,
    back,
    spinner,
    checked,
    metabet,
    metabetBouncing,
    closeBigBlack,
    conversation,
    arrowDownThin,
    error,
    pollArrow,
    pollArrowBlue,
    readMoreArrow,
    unmute,
    orangeFigure,
    greenFigure,
    purpleFigure,
    orangeFigureSmall,
    purpleFigureSmall,
  },

  breakpoints: {
    modal: '700px', // from old project
    tablet: '800px',
    mobile: '416px',
    widthTablet: '800px', // from old project
    widthMobile: '416px', // from old project
    widthModal: '530px', // from old project
    maxWidthMobile: '480px', // from old project
    maxHeightMobile: '896px', // from old project
    maxWidthLandscape: '700px', // from old project
    minHeighMobile: '629px', // from old project
    minWidthMobile: '376px', // from old project

    lgMobile: '640px',
    smTablet: '896px',
    lgTablet: '1152px',
    smDesktop: '1536px',
    mdDesktop: '2048px',
    lgDesktop: '2560px',
  },

  sizes: {
    headerHeight: '60px',
    footerHeight: '0px',
    feedbackSectionHeight: '326px',
    gapBetweenPlayerAndCommentsDesktop: '32',
    buyCoins: {
      selectBatch: 480,
      checkout: 540,
      default: 600,
    },
    metabetWidgetHeight: '120',
    vw: 'var(--view-width)',
  },

  zIndexes: {
    header: 502,
    profileSubmenu: 599,
    modal: 700,
    modalControls: 702,
    modalOverlay: 600,
    videoPlayer: 501,
    metabetWidget: 503,
    contentUpperDarkWrapper: 200,
    darkWrapper: 100,
    buyCoins: 503,
    labels: 100,
    stickerShop: 502,
    interactions: 503,
    modalContext: 100,
    underVideoControls: 502,
    shadow: 100,
    unmute: 10,
    noContent: 1,
  },

  colors: {
    athensGray: '#F3F4F6',
    black: '#000000',
    blackNight: '#080808',
    blueRibbon: '#006EFF',
    blushPink: '#FF78E6',
    blue: '#006EFF',
    bondiBlue: '#01A2AC',
    brightGray: '#3A424E',
    darkGrey: '#2E3942',
    electricViolet: '#8D48FF',
    white: '#ffffff',
    blackPearl: '#192128',
    blackTransparent2: 'rgba(0, 0, 0, 0.25)',
    transparent: 'rgba(255, 255, 255, 0)',
    transparentArrows: 'rgba(8, 8, 8, 0.8)',
    danube: '#518BCF',
    dodgerBlue: '#2f80ed',
    curiousBlue: '#2d9cdb',
    grayCharcoal: '#374151',
    greyChateau: '#9ba3a9',
    heather: '#ADB3B8',
    java: '#17DDAB',
    torchRed: '#ff5019',
    carrotOrange: '#ff9519',
    blueCharcoal: '#242C33',
    lavender: '#BB6BD9',
    orangePeel: '#FFA000',
    redOrange: '#FB3F39',
    shark: '#1F2227',
    shuttleGrey: '#536471',
    elephant: '#2E3942',
    warmPink: '#FF756C',
    errorColor: '#FF756C',
    successColor: '#4BA256',
    disabledColor: '#D1D5DB',
    royalBlue: '#2F80ED',
  },
  gradients: {},

  animationDurations: {
    bottomBarOpening: 200,
    liveItem: 2000,
  },

  fontSizes: {
    primary: '14px',
  },

  fontWeights: {
    fw_light: 300,
    fw_normal: 400,
    fw_medium: 600,
    fw_bold: 700,
    fw_black: 900,
  },

  transitions: {
    metabetWidgetAppearing: 300,
    delay: '0.4s',
    feedTransitions: 'all 0.3s ease-out',
    playerControls: 'visibility 200ms, opacity 200ms',
  },

  mixins: {
    styledScroll: css`
      scrollbar-width: thin;
      scrollbar-color: #3b3b3b #080808;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        width: var(--scrollbar-width);
      }

      &::-webkit-scrollbar-track {
        background-color: #080808;
      }

      &::-webkit-scrollbar-thumb {
        border: 3px solid #080808;
        border-radius: 6px;
        background-color: #3b3b3b;
      }

      @supports (-ms-overflow-style: -ms-autohiding-scrollbar) {
        -ms-overflow-style: -ms-autohiding-scrollbar;
      },
    `,
    fontStyles: ({
      fontSize = 10,
      lineHeight,
      fontWeight = commonTheme.fontWeights.fw_normal,
      color = commonTheme.colors.white,
      letterSpacing = 0.03,
    }) => css`
      font-size: ${fontSize / 10}rem;
      line-height: ${lineHeight ? `${lineHeight / 10}rem` : 'normal'};
      font-weight: ${fontWeight};
      color: ${color};
      letter-spacing: ${letterSpacing}rem;
    `,
    hideForMobile: ({
      breakpointMaxWidth,
      breakpointMaxHeight,
      isLandscape,
    }) => css`@media screen and (max-height: ${breakpointMaxWidth || commonTheme.breakpoints.maxWidthMobile}) and (max-width: ${breakpointMaxHeight || commonTheme.breakpoints.maxHeightMobile}) {
      opacity: ${isLandscape ? '0' : '1'};
      min-height: ${isLandscape ? '0' : 'initial'};
      height: ${isLandscape ? '0' : 'initial'};
    }
    `,
  },
};

commonTheme.gradients = {
  postDescriptionShadow: `linear-gradient(
    0deg,
    ${commonTheme.colors.black} 0%,
    ${commonTheme.colors.black} 35%,
    ${commonTheme.colors.transparent} 100%
  )`,
  newLabel: `linear-gradient(
    90deg,
    ${commonTheme.colors.dodgerBlue} 0%,
    ${commonTheme.colors.curiousBlue} 100%
  )`,
  liveLabel: `linear-gradient(
    90deg,
    ${commonTheme.colors.torchRed} 0%,
    ${commonTheme.colors.carrotOrange} 100%
  )`,
  pollGradient: `linear-gradient(
    90deg,
    ${commonTheme.colors.bondiBlue} 0%,
    ${commonTheme.colors.danube} 100%
  )`,
  loaderGradient: `linear-gradient(
    90deg,
    ${commonTheme.colors.curiousBlue} 0%,
    ${commonTheme.colors.lavender} 100%
  )`,
  commentGradient: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
};

export { commonTheme };
