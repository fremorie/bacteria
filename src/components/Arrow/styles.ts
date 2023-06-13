import styled, { css } from "styled-components";

export const SvgContainer = styled.div<{ $speed: number }>`
  transform-origin: center;
  ${(props) =>
    props.$speed > 0 &&
    css`
      transform: rotate(0deg);
    `}

  ${(props) =>
    props.$speed < 0 &&
    css`
      transform: rotate(180deg);
    `}
  
  width: 20px;
  margin: 0 -6px;
`;

export const ArrowsContainer = styled.div<{ $speed: number }>`
  ${(props) =>
    props.$speed < 0 &&
    css`
      transform: translateX(-3px);
      bottom: -6px;
    `}

  ${(props) =>
    props.$speed > 0 &&
    css`
      bottom: 6px;
    `}
  display: flex;
  flex-direction: row;
`;

export const Container = styled.div`
  width: 202px;
  display: flex;
  flex-direction: row;
`;

export const DecreasingSpeed = styled.div`
  width: 100px;
  height: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const IncreasingSpeed = styled.div`
  width: 100px;
  height: 20px;
  display: flex;
  justify-content: flex-start;
`;

export const Separator = styled.div`
  height: 20px;
  width: 2px;
  background-color: black;
  margin: 0 4px;
`;
