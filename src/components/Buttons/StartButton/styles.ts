import styled from "styled-components";

import { Button } from "../styles";

export const StartButton = styled(Button)`
  background-color: darkolivegreen;

  &:hover {
    background-color: darkgreen;
  }

  &:active {
    background-color: seagreen;
  }
`;
