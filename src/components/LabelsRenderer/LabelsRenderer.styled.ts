/* eslint-disable camelcase */
import styled from 'styled-components';

import { theme } from '@layout';

const { fw_medium } = theme.fontWeights;
const { feedTransitions } = theme.transitions;
const {
  lgMobile, smDesktop,
} = theme.breakpoints;
const { labels } = theme.zIndexes;

export const LabelsLayer = styled.div`
  position: absolute;
  top: 12px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  pointer-events: none;
  transition: ${feedTransitions};
  z-index: ${labels};

  @media (min-width: ${lgMobile}) {
    top: 19px;
    left: 24px;
  }

  @media (min-width: ${smDesktop}) {
    top: 29px;
    left: 36px;
  }
`;

interface ILabel {
  background: string
}

export const Label = styled.div<ILabel>`
  background: ${({ background }) => background};

  padding: 3px 12px;
  margin-bottom: 4px;
  transition: ${feedTransitions};
`;

interface ILabelText {
  color: string
}

export const LabelText = styled.span<ILabelText>`
  transition: ${feedTransitions};
    ${({ color }) => theme.mixins.fontStyles({
    color,
    fontSize: 12,
    fontWeight: fw_medium,
    letterSpacing: -0.01,
  })}
`;

export const LiveCircle = styled.img`
  margin-right: 8px;
  height: 1rem;
  width: 1rem;
  transition: ${feedTransitions};

  @media (min-width: ${smDesktop}) {
    margin-right: 10px;
    height: 1.2rem;
    width: 1.2rem;
  }
`;
