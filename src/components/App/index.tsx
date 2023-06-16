import React from "react";
import { v4 as uuid } from "uuid";

import Countdown, { CountdownApi } from "react-countdown";
import ReactorApp from "#components/ReactorApp";
import Header from "#components/Header";
import Timer from "#components/Timer";
import Leaderboard from "#components/Leaderboard";
import Footer from "#components/Footer";
import { addEntryToLocalStorage } from "#utils/localStorage";
import * as S from "./styles";

type LeaderboardEntry = {
  name: string;
  score: number;
};

const App = ({ isFinished, setIsFinished, handleAddToLeaderboard }: any) => {
  const [isCountdownInProgress, setIsCountdownInProgress] =
    React.useState(false);
  const countdownRef = React.useRef<CountdownApi | null>(null);
  const [simulationId, setSimulationId] = React.useState("123");

  const setCountdownRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownRef.current = countdown.getApi();
    }
  };

  const handleStart = () => {
    countdownRef.current!.start();
    setIsCountdownInProgress(true);
    setSimulationId(uuid());
    setIsFinished(false);
  };

  const handleReset = () => {
    setSimulationId(uuid());
  };

  const handleComplete = () => {
    setIsCountdownInProgress(false);
    setSimulationId(uuid());
    setIsFinished(true);
  };

  const handleCloseLeaderboardPopup = () => {
    setIsFinished(false);
  };

  return (
    <S.Page>
      <S.GlobalStyle />
      <Header />
      <Timer setRef={setCountdownRef} onComplete={handleComplete} />
      <ReactorApp
        isCountdownInProgress={isCountdownInProgress}
        onCancel={handleCloseLeaderboardPopup}
        onStart={handleStart}
        onReset={handleReset}
        simulationId={simulationId}
        isGameFinished={isFinished}
        onAddToLeaderboard={handleAddToLeaderboard}
      />
    </S.Page>
  );
};

const Main = () => {
  const [leaderboard, setLeaderboard] = React.useState<Array<LeaderboardEntry>>(
    []
  );
  const [isFinished, setIsFinished] = React.useState(false);

  const handleAddToLeaderboard = ({ name, score }: LeaderboardEntry) => {
    addEntryToLocalStorage({ name, score });

    setLeaderboard([...leaderboard, { name, score }]);

    setIsFinished(false);
  };

  return (
    <S.AppContainer>
      <Leaderboard leaderboard={leaderboard} />
      <App
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        handleAddToLeaderboard={handleAddToLeaderboard}
      />
      <Footer />
    </S.AppContainer>
  );
};

export default Main;
