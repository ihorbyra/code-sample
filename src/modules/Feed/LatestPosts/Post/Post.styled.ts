import styled from 'styled-components';
import { theme } from '@layout';

const { smDesktop } = theme.breakpoints;

export const Post = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;

  @media (min-width: ${smDesktop}) {
    .item-caption__wrapper,
    .item-short-description__wrapper {
      margin-left: 14px;
    }
  }
`;

interface IPostImage {
  opacity: number;
  position: string;
}

export const PostImage = styled.img<IPostImage>`
  width: 100%;
  opacity: ${({ opacity }) => opacity};
  position: ${({ position }) => position};
`;

export const MoreImage = styled.img`
  position: absolute;
  top: 28px;
  right: 42px;
  height: 24px;
  width: 24px;

  @media (min-width: ${smDesktop}) {
    height: 36px;
    width: 36px;
  }

`;
