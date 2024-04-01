import styled, { keyframes } from 'styled-components';

import { theme } from '@layout';

const { liveItem } = theme.animationDurations;
const {
  lgMobile,
  smTablet,
  lgTablet,
  smDesktop,
  mdDesktop,
  lgDesktop,
} = theme.breakpoints;
const { blueRibbon } = theme.colors;
const { fontStyles } = theme.mixins;
const { fw_medium: fwMedium } = theme.fontWeights;
const { vw } = theme.sizes;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  .grid__item {
    width: 100%;
  }

  @media (min-width: ${lgMobile}) and (max-width: 895px) {
    grid-template-columns: repeat(2, 1fr);
    gap: calc(${vw} * 33 / 640) 0;
    padding: 0 calc(${vw} * 32 / 640);

    .grid__item {
      &:nth-child(1) {
        grid-column: 1 / 3;
      }

      &:not(:nth-child(1)) {
        .grid__item-title_wrapper {
          bottom: 22px;
          max-height: calc(${vw} * 22 * 2 / 640);

          .grid__item-title {
            font-size: calc(${vw} * 14 / 640);
            line-height: calc(${vw} * 22 / 640);
          }
        }

        .item-caption__title {
          max-width: calc(${vw} * 190 / 640);
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            .grid__item-poster_wrapper {
              .grid__item-poster {
                transform: scale(1.08);
              }
            }

            .grid__item-title_wrapper {
              max-height: calc((${vw} * 22 * 2 / 640) * 0.75);

              .grid__item-title {
                font-size: calc((${vw} * 14 / 640) * 0.75);
                line-height: calc((${vw} * 22 / 640) * 0.75);
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: ${smTablet}) {
    grid-template-columns: repeat(6, 1fr);
    gap: calc(${vw} * 33 / 896) 0;
    padding: 0 calc(${vw} * 32 / 896);

    .grid__item {
      grid-column: span 3;

      &:not(:nth-child(1)):not(:nth-child(2)) {
        grid-column: span 2;

        .grid__item-title_wrapper {
          bottom: 20px;
          max-height: calc(${vw} * 22 * 2 / 896);

          .grid__item-title {
            font-size: calc(${vw} * 14 / 896);
            line-height: calc(${vw} * 22 / 896);
          }
        }

        .item-caption__title {
          max-width: calc(${vw} * 180 / 896);
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            .grid__item-poster_wrapper {
              .grid__item-poster {
                transform: scale(1.08);
              }
            }

            .grid__item-title_wrapper {
              max-height: calc((${vw} * 22 * 2 / 896) * 0.75);

              .grid__item-title {
                font-size: calc((${vw} * 14 / 896) * 0.75);
                line-height: calc((${vw} * 22 / 896) * 0.75);
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: ${lgTablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: calc(${vw} * 33 / 1152) 0;
    padding: 0 calc(${vw} * 32 / 1152);

    .grid__item {
      grid-column: span 2;

      &:not(:nth-child(1)):not(:nth-child(2)) {
        grid-column: span 1;

        .grid__item-title_wrapper {
          bottom: 29px;
          max-height: calc(${vw} * 22 * 2 / 1152);

          .grid__item-title {
            font-size: calc(${vw} * 14 / 1152);
            line-height: calc(${vw} * 22 / 1152);
          }
        }

        .item-caption__title {
          max-width: calc(${vw} * 180 / 1152);
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            .grid__item-title_wrapper {
              max-height: calc((${vw} * 22 * 2 / 1152) * 0.75);

              .grid__item-title {
                font-size: calc((${vw} * 14 / 1152) * 0.75);
                line-height: calc((${vw} * 22 / 1152) * 0.75);
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: ${smDesktop}) {
    gap: calc(${vw} * 40 / 1536) 0;
    grid-template-columns: repeat(6, 1fr);
    padding: 0 calc(${vw} * 60 / 1536);

    .grid__item {
      grid-column: span 3;

      &:not(:nth-child(1)):not(:nth-child(2)) {
        grid-column: span 2;

        .grid__item-title_wrapper {
          max-height: calc(${vw} * 38 * 2 / 1536);

          .grid__item-title {
            font-size: calc(${vw} * 25 / 1536);
            line-height: calc(${vw} * 38 / 1536);
          }
        }

        .item-caption__title {
          max-width: calc(${vw} * 380 / 1536);
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            .grid__item-poster_wrapper {
              .grid__item-poster {
                transform: scale(1.05);
              }
            }

            .grid__item-title_wrapper {
              max-height: calc((${vw} * 38 * 2 / 1536) * 0.75);

              .grid__item-title {
                font-size: calc((${vw} * 25 / 1536) * 0.75);
                line-height: calc((${vw} * 38 / 1536) * 0.75);
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: ${mdDesktop}) {
    gap: calc(${vw} * 51 / 2048) 0;
    grid-template-columns: repeat(4, 1fr);
    padding: 0 calc(${vw} * 80 / 2048);

    .grid__item {
      grid-column: span 2;

      &:not(:nth-child(1)):not(:nth-child(2)) {
        grid-column: span 1;

        .grid__item-title_wrapper {
          max-height: calc(${vw} * 38 * 2 / 2048);

          .grid__item-title {
            font-size: calc(${vw} * 25 / 2048);
            line-height: calc(${vw} * 38 / 2048);
          }
        }

        .item-caption__title {
          max-width: calc(${vw} * 380 / 2048);
        }

        @media (hover: hover) and (pointer: fine) {

          &:hover {
            .grid__item-title_wrapper {
              max-height: calc((${vw} * 38 * 2 / 2048) * 0.75);

              .grid__item-title {
                font-size: calc((${vw} * 25 / 2048) * 0.75);
                line-height: calc((${vw} * 38 / 2048) * 0.75);
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: ${lgDesktop}) {
    gap: calc(${vw} * 62 / 2560) 0;
    grid-template-columns: repeat(10, 1fr);
    padding: 0 calc(${vw} * 100 / 2560);

    .grid__item {
      grid-column: span 5;

      &:not(:nth-child(1)):not(:nth-child(2)) {
        grid-column: span 2;

        .grid__item-title_wrapper {
          max-height: calc(${vw} * 38 * 2 / 2560);

          .grid__item-title {
            font-size: calc(${vw} * 25 / 2560);
            line-height: calc(${vw} * 38 / 2560);
          }
        }

        .item-caption__title {
          max-width: calc(${vw} * 380 / 2560);
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            .grid__item-title_wrapper {
              max-height: calc((${vw} * 38 * 2 / 2560) * 0.75);

              .grid__item-title {
                font-size: calc((${vw} * 25 / 2560) * 0.75);
                line-height: calc((${vw} * 38 / 2560) * 0.75);
              }
            }
          }
        }
      }
    }
  }
`;

const fadeOutMobile = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    height: 52px;
    margin-top: 26px;
  }
  100% {
    margin-top: 0;
    height: 0px;
    opacity: 0;
  }
`;

const fadeOutLgMobile = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    height: 52px;
    margin-top: calc(${vw} * 33 / 640);
  }
  100% {
    margin-top: 0;
    height: 0px;
    opacity: 0;
  }
`;

const fadeOutSmTablet = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    height: 52px;
    margin-top: calc(${vw} * 33 / 896);
  }
  100% {
    margin-top: 0;
    height: 0px;
    opacity: 0;
  }
`;

const fadeOutLgTablet = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    height: 52px;
    margin-top: calc(${vw} * 33 / 1152);
  }
  100% {
    margin-top: 0;
    height: 0px;
    opacity: 0;
  }
`;
const fadeOutSmDesktop = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    height: 52px;
    margin-top: calc(${vw} * 33 / 1536);
  }
  100% {
    margin-top: 0;
    height: 0px;
    opacity: 0;
  }
`;
const fadeOutMdDesktop = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    height: 52px;
    margin-top: calc(${vw} * 44 / 2048);
  }
  100% {
    margin-top: 0;
    height: 0px;
    opacity: 0;
  }
`;
const fadeOutLgDesktop = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    height: 52px;
    margin-top: calc(${vw} * 55 / 2560);
  }
  100% {
    margin-top: 0;
    height: 0px;
    opacity: 0;
  }
`;

export const LoadMore = styled.button`
  ${fontStyles({
    fontSize: 24,
    fontWeight: fwMedium,
    lineHeight: 36,
    letterSpacing: -0.01,
  })};
  padding: 8px 24px;
  background: ${blueRibbon};
  border-radius: 70px;
  margin: 26px auto 0;
  display: block;

  @media (max-width: 639px) {
    &.load-more-exiting {
      animation: ${liveItem / 2000 + 0.2}s ${fadeOutMobile} ease-out;
    }
  }

  @media (min-width: ${lgMobile}) {
    margin-top: calc(${vw} * 33 / 640);
    &.load-more-exiting {
      animation: ${liveItem / 2000 + 0.2}s ${fadeOutLgMobile} ease-out;
    }
  }

  @media(min-width: ${smTablet}) {
    margin-top: calc(${vw} * 33 / 896);
    &.load-more-exiting {
      animation: ${liveItem / 2000 + 0.2}s ${fadeOutSmTablet} ease-out;
    }
  }

  @media (min-width: ${lgTablet}) {
    margin-top: calc(${vw} * 33 / 1152);
    &.load-more-exiting {
      animation: ${liveItem / 2000 + 0.2}s ${fadeOutLgTablet} ease-out;
    }
  }

  @media (min-width: ${smDesktop}) {
    margin-top: calc(${vw} * 33 / 1536);
    &.load-more-exiting {
      animation: ${liveItem / 2000 + 0.2}s ${fadeOutSmDesktop} ease-out;
    }
  }

  @media (min-width: ${mdDesktop}) {
    margin-top: calc(${vw} * 44 / 2048);
    &.load-more-exiting {
      animation: ${liveItem / 2000 + 0.2}s ${fadeOutMdDesktop} ease-out;
    }
  }

  @media (min-width: ${lgDesktop}) {
    margin-top: calc(${vw} * 55 / 2560);
    &.load-more-exiting {
      animation: ${liveItem / 2000 + 0.2}s ${fadeOutLgDesktop} ease-out;
    }
  }
`;
