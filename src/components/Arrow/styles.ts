import styled, { css } from "styled-components";

// const arrowAnimation = keyframes`
//     0% {
//     top: 0;
//     }
//
//     50% {
//     top: -2px;
//     }
//
//   100% {
//     top: 0;
//   }
// `;
//
// const Arrow = styled.div<{ $speed: number; $color?: string }>`
//   position: relative;
//   width: 90%;
//   height: 10px;
//   background-color: ${(props) => props.$color};
//   box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
//
//   &::after,
//   &::before {
//     content: "";
//     position: absolute;
//     width: 60%;
//     height: 10px;
//     right: -8px;
//     background-color: ${(props) => props.$color};
//   }
//
//   &::after {
//     top: -12px;
//     transform: rotate(45deg);
//   }
//
//   &::before {
//     top: 12px;
//     box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
//     transform: rotate(-45deg);
//   }
// `;
//
// export const Icon = styled.div`
//   position: relative;
//   width: 80px;
//   height: 60px;
// `;
//
// export const ArrowUp = styled(Arrow).attrs(() => ({ $color: "green" }))`
//   transform: rotate(-90deg) scale(${(props) => props.$speed / 100 / 2});
//   animation: ${arrowAnimation} 1s ease-in-out 0.3s infinite;
// `;
//
// export const ArrowDown = styled(Arrow).attrs(() => ({ $color: "blue" }))`
//   transform: rotate(-90deg) scale(${(props) => props.$speed / 100 / 2});
//   animation: ${arrowAnimation} 1s ease-in-out 0.1s infinite;
// `;
//
// export const ArrowFlat = styled.div``;

export const SvgContainer = styled.div<{$speed: number}>`
  transform-origin: center;
  ${(props) =>
    props.$speed > 0 &&
    css`
      transform: rotate(-90deg);
    `}

  ${(props) =>
    props.$speed < 0 &&
    css`
      transform: rotate(90deg);
    `}
  
  margin: -8px 0;
`;

export const ArrowsContainer = styled.div<{$speed: number}>`
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
  flex-direction: column;
  width: 20px;
  position: absolute;
  left: -20px;
`;
