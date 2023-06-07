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
  const [feedState, setOnFeed] = React.useState<{ feed: () => void }>({
    feed: () => {
      console.log("initial feed");
    },
  });

  return (
    <S.Page>
      <S.Container>
        <Stats bacteriaSpeed={100} acetateSpeed={80} glucoseSpeed={-50} />
        <S.ButtonContainer>
          <Reactor setOnFeed={(feed: any) => setOnFeed(feed)} />
          <FeedButton onClick={feedState.feed} />
        </S.ButtonContainer>
        <S.GlobalStyle />
      </S.Container>
    </S.Page>
  );
};

export default App;
