import styled from 'styled-components';

import { theme } from '@layout';

const { fw_medium: fwMedium } = theme.fontWeights;
const { mobile } = theme.breakpoints;

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 20px 0 40px 0;
  @media (min-width: ${mobile}) {
    padding: 20px 42px 40px 42px;
  }
`;

export const PostDetailsScreen = styled.div`
  width: 100%;
`;

export const PostImage = styled.img`
  width: 100%;
`;

export const ItemCaptionWrapper = styled.div`
  padding: 0 10px;

  .item-caption__wrapper {
    margin-top: 53px;
    @media (min-width: ${mobile}) {
      margin-top: 20px;
    }
  }

  .item-caption__title {
    font-size: 20px;
    font-weight: ${fwMedium};
  }

  .item-caption__subTitle {
    font-size: 20px;
  }

  .item-caption__image {
    width: 42px;
    height: 42px;
    margin-right: 20px;
  }
`;
