import styled from 'styled-components';

const Label = styled.div`
  border-radius: 15px;
  ${({ theme }) => theme.mixins.fontStyles({
    fontSize: 11,
    fontWeight: theme.fontWeights.fw_bold,
    lineHeight: 12,
  })}
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

export const LabelLive = styled(Label)`
  width: 60px;
  max-height: 28px;
  padding: 9px 0;
  background: linear-gradient(90deg, #ff5019 0%, #ff9519 100%);
  box-shadow: 0 6px 12px -3px rgba(255, 191, 25, 0.2);
  text-align: center;
`;
