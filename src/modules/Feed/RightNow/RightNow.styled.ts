import styled, { keyframes, css } from 'styled-components';

import { theme } from '@layout';

const { vw } = theme.sizes;
const {
  lgMobile,
  smTablet,
  lgTablet,
  smDesktop,
  mdDesktop,
  lgDesktop,
} = theme.breakpoints;
const { liveItem } = theme.animationDurations;

const fadeInMobileWrapper = keyframes`
  0% {
    width: 0px;
    height: 0px;
  }
  50% {
    height: calc(${vw} * 144 / 256 + 42px);
  }
  100% {
    width: calc(${vw} * 200 / 256);
  }
`;

const fadeInLgMobileWrapper = keyframes`
  0% {
    width: 0px;
    height: 0px;
  }
  50% {
    height: calc(${vw} * 305 / 640 + 42px);
  }
  100% {
    width: calc(${vw} * 576 / 640);
  }
`;

const fadeInSmTabletWrapper = keyframes`
  0% {
    width: 0px;
    height: 0px;
  }
  50% {
    height: calc(${vw} * 218 / 896 + 42px);
  }
  100% {
    width: calc(${vw} * 416 / 896);
  }
`;

const fadeInLgTabletWrapper = keyframes`
  0% {
    width: 0px;
    height: 0px;
  }
  50% {
    height: calc(${vw} * 293 / 1152 + 42px);
  }
  100% {
    width: calc(${vw} * 544 / 1152);
  }
`;

const fadeInSmDesktopWrapper = keyframes`
  0% {
    width: 0px;
    height: 0px;
  }
  50% {
    height: calc(${vw} * 382 / 1536 + 42px);
  }
  100% {
    width: calc(${vw} * (684 + 24) / 1536);
  }
`;

const fadeInMdDesktopWrapper = keyframes`
  0% {
    width: 0px;
    height: 0px;
  }
  50% {
    height: calc(${vw} * 515 / 2048 + 42px);
  }
  100% {
    width: calc(${vw} * (920 + 24) / 2048);
  }
`;

const fadeInLgDesktopWrapper = keyframes`
  0% {
    width: 0px;
    height: 0px;
  }
  50% {
    height: calc(${vw} * 650 / 2560 + 42px);
  }
  100% {
    width: calc(${vw} * (1156 + 24) / 2560);
  }
`;

const fadeInItem = keyframes`
  0% {
    left: -1600px;
  }
  50% {
   left: -1600px;
  }
  100% {
    left: 0;
  }
`;

const fadeOutMobileWrapper = keyframes`
  0% { opacity: 1; }
  50% {
    opacity: 0;
    height: calc(${vw} * 144 / 256 + 42px);
  }
  60% {
    opacity: 0;
    width: calc(${vw} * 200 / 256);
  }
  100% {
    opacity: 0;
    height: 0;
    width: 0;
  }
`;

const fadeOutLgMobileWrapper = keyframes`
  0% { opacity: 1; }
  50% {
    opacity: 0;
    height: calc(${vw} * 305 / 640 + 42px);
  }
  60% {
    opacity: 0;
    width: calc(${vw} * 576 / 640);
  }
  100% {
    opacity: 0;
    height: 0;
    width: 0;
  }
`;

const fadeOutSmTabletWrapper = keyframes`
  0% { opacity: 1; }
  50% {
    opacity: 0;
    height: calc(${vw} * 218 / 896 + 42px);
  }
  60% {
    opacity: 0;
    width: calc(${vw} * 416 / 896);
  }
  100% {
    opacity: 0;
    height: 0;
    width: 0;
  }
`;

const fadeOutLgTabletWrapper = keyframes`
  0% { opacity: 1; }
  50% {
    opacity: 0;
    height: calc(${vw} * 293 / 1152 + 42px);
  }
  60% {
    opacity: 0;
    width: calc(${vw} * 544 / 1152);
  }
  100% {
    opacity: 0;
    height: 0;
    width: 0;
  }
`;

const fadeOutSmDesktopWrapper = keyframes`
  0% { opacity: 1; }
  50% {
    opacity: 0;
    height: calc(${vw} * 382 / 1536 + 42px);
  }
  60% {
    opacity: 0;
    width: calc(${vw} * (684 + 24) / 1536);
  }
  100% {
    opacity: 0;
    height: 0;
    width: 0;
  }
`;

const fadeOutMdDesktopWrapper = keyframes`
  0% { opacity: 1; }
  50% {
    opacity: 0;
    height: calc(${vw} * 515 / 2048 + 42px);
  }
  60% {
    opacity: 0;
    width: calc(${vw} * (920 + 24) / 2048);
  }
  100% {
    opacity: 0;
    height: 0;
    width: 0;
  }
`;

const fadeOutLgDesktopWrapper = keyframes`
  0% { opacity: 1; }
  50% {
    opacity: 0;
    height: calc(${vw} * 650 / 2560 + 42px);
  }
  60% {
    opacity: 0;
    width: calc(${vw} * (1156 + 24) / 2560);
  }
  100% {
    opacity: 0;
    height: 0;
    width: 0;
  }
`;

interface IVideoItemWrapper {
  showFullWidthOnMobile: boolean
}

export const VideoItemWrapper = styled.div<IVideoItemWrapper>`
  position: relative;
  @media (min-width: 250px) {
    width: calc(${vw} * 200 / 256);
  }

  @media (min-width: ${lgMobile}) {
    width: calc(${vw} * 576 / 640);
  }

  @media (min-width: ${smTablet}) {
    width: calc(${vw} * 416 / 896);
  }

  @media (min-width: ${lgTablet}) {
    width: calc(${vw} * 544 / 1152);
  }

  @media (min-width: ${smDesktop}) {
    width: calc(${vw} * (684 + 24) / 1536);
  }

  @media (min-width: ${mdDesktop}) {
    width: calc(${vw} * (920 + 24) / 2048);
  }

  @media (min-width: ${lgDesktop}) {
    width: calc(${vw} * (1156 + 24) / 2560);
  }

  ${({ showFullWidthOnMobile }) => showFullWidthOnMobile && css`
    @media (max-width: 640px) {
      .grid__item {
        width: 100vw;
      }
    }
  `}
`;

interface ILivesWrapper {
  showAnimation: boolean
}

export const LivesWrapper = styled.div<ILivesWrapper>`
  .swiper-wrapper {
    > .swiper-slide {
      margin-right: 24px;
    }
  }

  @media (min-width: ${lgMobile}) {
    .swiper-wrapper {
      > .swiper-slide {
        margin-right:0;
      }
    }
  }

  @media (max-width: ${lgMobile}) {
    .item-caption__wrapper {
      .item-caption__title {
        max-width: calc(${vw} * 120 / 256);
      }
    }
  }

  ${({ showAnimation }) => showAnimation && css`
    .item-entering {
      transition: 'all ${liveItem / 1000 + 0.2}s ease';

      @media (min-width: 250px) {
        animation: ${liveItem / 1000}s ${fadeInMobileWrapper} ease-out;
      }

      @media (min-width: ${lgMobile}) {
        animation: ${liveItem / 1000}s ${fadeInLgMobileWrapper} ease-out;
      }

      @media (min-width: ${smTablet}) {
        animation: ${liveItem / 1000}s ${fadeInSmTabletWrapper} ease-out;
      }

      @media (min-width: ${lgTablet}) {
        animation: ${liveItem / 1000}s ${fadeInLgTabletWrapper} ease-out;
      }

      @media (min-width: ${smDesktop}) {
        animation: ${liveItem / 1000}s ${fadeInSmDesktopWrapper} ease-out;
      }

      @media (min-width: ${mdDesktop}) {
        animation: ${liveItem / 1000}s ${fadeInMdDesktopWrapper} ease-out;
      }

      @media (min-width: ${lgDesktop}) {
        animation: ${liveItem / 1000}s ${fadeInLgDesktopWrapper} ease-out;
      }
    }

    .item-entering .grid__item {
      animation: ${liveItem / 1000 + 0.2}s ${fadeInItem} ease-out;
    }
  `}

  .item-exiting {
    @media (min-width: 250px) {
      animation: ${liveItem / 1000 + 0.2}s ${fadeOutMobileWrapper} ease-out;
    }

    @media (min-width: ${lgMobile}) {
      animation: ${liveItem / 1000 + 0.2}s ${fadeOutLgMobileWrapper} ease-out;
    }

    @media (min-width: ${smTablet}) {
      animation: ${liveItem / 1000 + 0.2}s ${fadeOutSmTabletWrapper} ease-out;
    }

    @media (min-width: ${lgTablet}) {
      animation: ${liveItem / 1000 + 0.2}s ${fadeOutLgTabletWrapper} ease-out;
    }

    @media (min-width: ${smDesktop}) {
      animation: ${liveItem / 1000 + 0.2}s ${fadeOutSmDesktopWrapper} ease-out;
    }

    @media (min-width: ${mdDesktop}) {
      animation: ${liveItem / 1000 + 0.2}s ${fadeOutMdDesktopWrapper} ease-out;
    }

    @media (min-width: ${lgDesktop}) {
      animation: ${liveItem / 1000 + 0.2}s ${fadeOutLgDesktopWrapper} ease-out;
    }
  }
`;
