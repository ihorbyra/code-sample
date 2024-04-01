import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import 'swiper/swiper-bundle.css';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  ;
  :root {
    --scrollbar-width: 11px;
    --view-width: 100vw;
  }

  #root {
    height: 100%;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%; // 62.5% === 10px
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.blackNight};
    ${({ theme }) => theme.mixins.styledScroll};
    height: 100%;
  }

  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    text-rendering: geometricPrecision;
    background: ${({ theme }) => theme.colors.blackNight};
    height: 100%;
    overflow-x: hidden;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  a {
    color: #2D9CDB;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;
