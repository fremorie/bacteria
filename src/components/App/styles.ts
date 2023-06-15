import styled, { createGlobalStyle } from "styled-components";

// @ts-ignore
import font from "../../static/font.ttf";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Digital';
    src: url(${font}) format('truetype');
  }
  
  * {
    box-sizing: border-box;
    font-family: 'Exo', sans-serif;
    
    body {
      background-color: #EFEFF3;
      overflow: hidden;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
  align-items: center;
  height: 80vh;
  overflow: hidden;
`;

export const Page = styled.div`
  height: 100%;
  width: 100%;
`;
