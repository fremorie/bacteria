import styled, { keyframes } from "styled-components";

const arrowAnimation = keyframes`
    0% {
    transform: translateY(0);
    }

    50% {
      transform: translateY(2px);
    }

  100% {
    transform: translateY(0);
  }
`;

export const Button = styled.button`
  margin-top: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: indianred;
  color: white;
  border: 2px solid black;
  height: 80px;
  width: 300px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.5s;

  & img {
    opacity: 0;
  }

  &:hover {
    background-color: darkred;

    & img {
      animation: ${arrowAnimation} 0.1s ease-in-out 0.01s infinite;
      opacity: 1;
    }
  }

  &:active {
    background: #500909;
  }

  & + & {
    margin-left: 16px;
  }
`;
