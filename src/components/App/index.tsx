import React from "react";

import Reactor from "#components/Reactor";
import Stats from "#components/Stats";
import FeedButton from "#components/FeedButton";
import Header from '#components/Header'
import * as S from "./styles";

const App = () => {
  const [feedState, setOnFeed] = React.useState<{ feed: () => void }>({
    feed: () => {
      console.log("initial feed");
    },
  });

  const [speedState, setSpeed] = React.useState<any>({
    getSpeed: () => ({
      X: 0,
      A: 0,
      S: 0,
      DOTa: 0,
    }),
  });

  return (
    <S.Page>
      <S.Container>
        <Stats getSpeed={speedState.getSpeed} />
        <S.ButtonContainer>
          <Reactor
            setOnFeed={(feed: any) => setOnFeed(feed)}
            setSpeed={(currentSpeed: any) => setSpeed(currentSpeed)}
          />
          <FeedButton onClick={feedState.feed} />
        </S.ButtonContainer>
        <S.GlobalStyle />
      </S.Container>
    </S.Page>
  );
};

export default App;
