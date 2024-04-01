import styled, { css, keyframes } from 'styled-components';

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
  }
  100% {
    width: calc(${vw} * 200 / 256);
  }
`;

const fadeInLgMobileWrapper = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: calc(${vw} * 288 / 640);
  }
`;

const fadeInSmTabletWrapper = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: calc(${vw} * 277 / 896);
  }
`;

const fadeInLgTabletWrapper = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: calc(${vw} * 272 / 1152);
  }
`;

const fadeInSmDesktopWrapper = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: calc(${vw} * 472 / 1536);
  }
`;

const fadeInMdDesktopWrapper = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: calc(${vw} * 472 / 2048);
  }
`;

const fadeInLgDesktopWrapper = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: calc(${vw} * 472 / 2560);
  }
`;

const fadeInItem = keyframes`
  0% {
    left: -1600px;
  }
  50% {
    left: -1400px;
  }
  100% {
    left: 0;
  }
`;

const fadeOutItem = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeOutMobileWrapper = keyframes`
  0% {
    width: calc(${vw} * 200 / 256);
  }
  50% {
    width: calc(${vw} * 200 / 256);
  }
  70% {
    opacity: 0;
  }
  100% {
    width: 0;
    opacity: 0;
  }
`;

const fadeOutLgMobileWrapper = keyframes`
  0% {
    width: calc(${vw} * 288 / 640);
  }
  50% {
    width: calc(${vw} * 288 / 640);
  }
  70% {
    opacity: 0;
  }
  100% {
    width: 0;
    opacity: 0;
  }
`;

const fadeOutSmTabletWrapper = keyframes`
  0% {
    width: calc(${vw} * 277 / 896);
  }
  50% {
    width: calc(${vw} * 277 / 896);
  }
  70% {
    opacity: 0;
  }
  100% {
    width: 0;
    opacity: 0;
  }
`;

const fadeOutLgTabletWrapper = keyframes`
  0% {
    width: calc(${vw} * 272 / 1152);
  }
  50% {
    width: calc(${vw} * 272 / 1152);
  }
  70% {
    opacity: 0;
  }
  100% {
    width: 0;
    opacity: 0;
  }
`;

const fadeOutSmDesktopWrapper = keyframes`
  0% {
    width: calc(${vw} * 472 / 1536);
  }
  50% {
    width: calc(${vw} * 472 / 1536);
  }
  70% {
    opacity: 0;
  }
  100% {
    width: 0;
    opacity: 0;
  }
`;

const fadeOutMdDesktopWrapper = keyframes`
  0% {
    width: calc(${vw} * 472 / 2048);
  }
  50% {
    width: calc(${vw} * 472 / 2048);
  }
  70% {
    opacity: 0;
  }
  100% {
    width: 0;
    opacity: 0;
  }
`;

const fadeOutLgDesktopWrapper = keyframes`
  0% {
    width: calc(${vw} * 472 / 2560);
  }
  50% {
    width: calc(${vw} * 472 / 2560);
  }
  70% {
    opacity: 0;
  }
  100% {
    width: 0;
    opacity: 0;
  }
`;

interface IPostWrapper {
  showFullWidthOnMobile: boolean;
}

export const PostWrapper = styled.div<IPostWrapper>`
  position: relative;
  box-sizing: border-box;
  width: ${({ showFullWidthOnMobile }) => (showFullWidthOnMobile ? '100vw' : `calc(${vw} * 200 / 256)`)};

  @media (min-width: ${lgMobile}) {
    padding: 0 12px;
    width: calc(${vw} * 288 / 640);

    .item-caption__title {
      max-width: calc(${vw} * 190 / 640);
    }
  }

  @media (min-width: ${smTablet}) {
    width: calc(${vw} * 277 / 896);
  }

  @media (min-width: ${lgTablet}) {
    width: calc(${vw} * 272 / 1152);
    .item-caption__title {
      max-width: calc(${vw} * 180 / 1152);
    }
  }

  @media (min-width: ${smDesktop}) {
    width: calc(${vw} * 472 / 1536);
    .item-caption__title {
      max-width: calc(${vw} * 380 / 1536);
    }
  }

  @media (min-width: ${mdDesktop}) {
    width: calc(${vw} * 472 / 2048);
    .item-caption__title {
      max-width: calc(${vw} * 380 / 2048);
    }
  }

  @media (min-width: ${lgDesktop}) {
    width: calc(${vw} * 472 / 2560);

    .item-caption__title {
      max-width: calc(${vw} * 380 / 2560);
    }
  }
`;

interface IPostsSectionWrapper {
  showAnimation: boolean;
}

export const PostsSectionWrapper = styled.div<IPostsSectionWrapper>`
  .swiper-wrapper {
    > .swiper-slide {
      margin-right: 24px;
    }
  }

  @media (min-width: ${lgMobile}) {
    .swiper-wrapper {
      > .swiper-slide {
        margin-right: 0;
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

    .item-entering .post__item {
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

  .item-exiting .post__item {
    animation: ${liveItem / 1500 + 0.2}s ${fadeOutItem} ease-out;
  }
`;
