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
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
  align-items: center;
`;

export const Page = styled.div`
  height: 100%;
  width: 100%;
`;

export const AppContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 98vh;
`;
