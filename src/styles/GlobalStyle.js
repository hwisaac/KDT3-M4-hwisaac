import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Pangram';
        src: url('../public/fonts/Pangram-Regular.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pangram';
        src: url('../public/fonts/Pangram-ExtraLight.otf') format('opentype');
        font-weight: 200;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pangram';
        src: url('../public/fonts/Pangram-Light.otf') format('opentype');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pangram';
        src: url('../public/fonts/Pangram-Medium.otf') format('opentype');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pangram';
        src: url('../public/fonts/Pangram-Bold.otf') format('opentype');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pangram';
        src: url('../public/fonts/Pangram-ExtraBold.otf') format('opentype');
        font-weight: 800;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pangram';
        src: url('../public/fonts/Pangram-Black.otf') format('opentype');
        font-weight: 900;
        font-style: normal;
    }
        
    :root {
        --brown: #936836;
        --black: #1b1b1b;
        --semi-black: #303631;
        --gray: #969d97;
        --semi-gray: #8a8a8a;
        --white: #f4f4f4;
    }
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;
        vertical-align: baseline;
    }
    body{
        line-height: 1;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #F6F9F0;
        margin-bottom: 100px;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
`;

export default GlobalStyles;
