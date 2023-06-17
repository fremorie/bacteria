import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

const canvasTopDefault = 156;
const canvasLeftDefault = 229;
export const imgSizeDefault = 800;
export const canvasHeightDefault = 562;
export const canvasWidthDefault = 344;

const canvasTop = `${canvasTopDefault / (imgSizeDefault / 100)}%`;
const canvasLeft = `${canvasLeftDefault / (imgSizeDefault / 100)}%`;

export const ReactorImg = styled.img`
  height: 50vh;
`;

export const Canvas = styled.canvas`
  border: 2px solid black;
  border-radius: 0 0 70% 70% / 0 0 42% 42%;
  position: absolute;
  top: ${canvasTop};
  left: ${canvasLeft};
`;
