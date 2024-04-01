import styled from 'styled-components';

import { theme } from '@layout';

const { lgMobile } = theme.breakpoints;

export const ColoredFigures = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const BaseFigure = styled.img`
  position: absolute;
  z-index: 1;
  width: 30vw;
  height: 30vw;

  max-height: 490px;
  max-width: 490px;
`;

const MobileFigure = styled(BaseFigure)`
  display: block;
  @media(min-width: ${lgMobile}) {
    display: none;
  }

`;

const DesktopFigure = styled(BaseFigure)`
  display: none;
  @media(min-width: ${lgMobile}) {
    display: block;
  }
`;

export const OrangeFigureMobile = styled(MobileFigure)``;
export const PurpleFigureMobile = styled(MobileFigure)`
  right: 0;
  bottom: 0;
`;

export const OrangeFigure = styled(DesktopFigure)``;

export const GreenFigure = styled(DesktopFigure)`
  bottom: 7vw;
  transform: translateY(-50%);
  right: 0;
`;

export const PurpleFigure = styled(DesktopFigure)`
  bottom: -2vw;
  right: 0;
`;
