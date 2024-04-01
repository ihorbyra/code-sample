import styled, { css } from 'styled-components';
import { theme } from '@layout';

const {
  sizes: {
    headerHeight, vw,
  }, breakpoints: {
    lgMobile,
    smTablet,
    lgTablet,
    smDesktop,
    mdDesktop,
    lgDesktop,
  }, colors: { blackNight }, zIndexes: { header },
} = theme;

interface IHeader {
  showBackButton: boolean
}

export const FeedLogo = styled.button`
  padding: 1px;
  background: none;
`;

export const Header = styled.div<IHeader>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${headerHeight};
  background: ${blackNight};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  z-index: ${header};
  padding: 0 10px;

  ${({ showBackButton }) => showBackButton
  && css`
    justify-content: flex-end;

    ${FeedLogo} {
      display: none;

      @media (min-width: ${lgMobile}) {
        display: inline;
      }
    }
  `};

  @media (min-width: ${lgMobile}) {
    justify-content: space-between;
    padding: 0 calc(${vw} * 32 / 640 + 12px);
  }

  @media (min-width: ${smTablet}) {
    padding: 0 calc(${vw} * 32 / 896 + 12px);
  }

  @media (min-width: ${lgTablet}) {
    padding: 0 calc(${vw} * 32 / 1152 + 12px);
  }

  @media (min-width: ${smDesktop}) {
    padding: 0 calc(${vw} * 60 / 1536 + 12px);
  }

  @media (min-width: ${mdDesktop}) {
    padding: 0 calc(${vw} * 80 / 2048 + 12px);
  }

  @media (min-width: ${lgDesktop}) {
    padding: 0 calc(${vw} * 100 / 2560 + 12px);
  }
`;

export const LeftButtonsWrapper = styled.div`
  display: flex;
`;

export const FeedLogoImg = styled.img`
  min-width: 42px;
  max-width: 180px;
  height: 42px;
  object-fit: contain;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 0;
  padding: 0;
  height: ${headerHeight};
  width: 50px;

  @media (min-width: ${lgMobile}) {
    width: calc(${vw} * 32 / 640);
  }

  @media (min-width: ${smTablet}) {
    width: calc(${vw} * 32 / 896);
  }

  @media (min-width: ${lgTablet}) {
    width: calc(${vw} * 32 / 1152);
  }

  @media (min-width: ${smDesktop}) {
    width: calc(${vw} * 60 / 1536);
  }

  @media (min-width: ${mdDesktop}) {
    width: calc(${vw} * 80 / 2048);
  }

  @media (min-width: ${lgDesktop}) {
    width: calc(${vw} * 100 / 2560);
  }
`;

export const ArrowImage = styled.img`
  left: 50%;
  height: 23px;

  @media (min-width: ${smDesktop}) {
    height: 33px;
  }
`;
