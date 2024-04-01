import styled from 'styled-components';

export const Time = styled.div`
  ${({ theme }) => theme.mixins.fontStyles({
    fontSize: 22,
    fontWeight: theme.fontWeights.fw_light,
  })}
  letter-spacing: -0.02em;
  text-shadow: 0 1px 2px rgba(59, 86, 126, 0.2);
`;
