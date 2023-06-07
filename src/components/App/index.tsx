import React from "react";

import Reactor from "#components/Reactor";
import Stats from "#components/Stats";
import FeedButton from "#components/FeedButton";
import * as S from "./styles";
import {
  solve,
  initial_state,
  parameters,
  prepareCanvasData,
} from "#utils/index";

const App = () => {
  return (
    <S.Page>
      <S.Container>
        <Stats bacteriaSpeed={100} acetateSpeed={80} glucoseSpeed={-50} />
        <Reactor />
        <S.GlobalStyle />
      </S.Container>
      <S.ButtonContainer>
        <FeedButton onClick={() => console.log("FEED!")} />
      </S.ButtonContainer>
    </S.Page>
  );
};

export default App;
