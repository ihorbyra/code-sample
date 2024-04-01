import styled, { css, keyframes } from 'styled-components';

import { theme } from '@layout';

const { liveItem } = theme.animationDurations;
const {
  lgMobile, smTablet, lgTablet, smDesktop, mdDesktop, lgDesktop,
} = theme.breakpoints;
const { vw } = theme.sizes;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
`;

interface IHeadline {
  showAnimation?: boolean
  showFadeOutAnimation?: boolean
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Headline = styled.div<IHeadline>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  text-transform: uppercase;
  padding: 26px 0;

  ${({ showAnimation }) => showAnimation && css`
    ${Title} {
      animation: ${liveItem / 1000}s ${fadeIn} ease-out;
    }
  `}

  ${({ showFadeOutAnimation }) => showFadeOutAnimation && css`
    ${Title} {
      animation: ${liveItem / 1000 + 0.3}s ${fadeOut} ease-out;
    }
  `}

  ${Title} {
    font-size: calc(${vw} * 18 / 256);
    line-height: calc(${vw} * 18 / 256);
  }

  @media (min-width: ${lgMobile}) {
    padding: calc(${vw} * 33 / 640) 0;

    ${Title} {
      font-size: calc(${vw} * 24 / 640);
      line-height: calc(${vw} * 24 / 640);
    }
  }

  @media(min-width: ${smTablet}) {
    padding: calc(${vw} * 33 / 896) 0;
    gap: 20px;

    ${Title} {
      font-size: calc(${vw} * 32 / 896);
      line-height: calc(${vw} * 32 / 896);
    }
  }

  @media (min-width: ${lgTablet}) {
    gap: 24px;
    padding: calc(${vw} * 33 / 1152) 0;

    ${Title} {
      font-size: calc(${vw} * 38 / 1152);
      line-height: calc(${vw} * 38 / 1152);
    }
  }

  @media (min-width: ${smDesktop}) {
    gap: 20px;
    padding: calc(${vw} * 33 / 1536) 0;

    ${Title} {
      font-size: calc(${vw} * 32 / 1536);
      line-height: calc(${vw} * 32 / 1536);
    }
  }

  @media (min-width: ${mdDesktop}) {
    gap: 24px;
    padding: calc(${vw} * 44 / 2048) 0;

    ${Title} {
      font-size: calc(${vw} * 38 / 2048);
      line-height: calc(${vw} * 38 / 2048);
    }
  }

  @media (min-width: ${lgDesktop}) {
    gap: 30px;
    padding: calc(${vw} * 55 / 2560) 0;

    ${Title} {
      font-size: calc(${vw} * 46 / 2560);
      line-height: calc(${vw} * 46 / 2560);
    }
  }
`;
