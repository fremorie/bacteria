import React from "react";
import { v4 as uuid } from "uuid";

import Countdown, { CountdownApi } from "react-countdown";
import ReactorApp from "#components/ReactorApp";
import Header from "#components/Header";
import Timer from "#components/Timer";
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

  return (
    <S.Page>
      <S.GlobalStyle />
      <Header />
      <Timer setRef={setCountdownRef} onComplete={handleComplete} />
      <ReactorApp
        isCountdownInProgress={isCountdownInProgress}
        onStart={handleStart}
        onReset={handleReset}
        simulationId={simulationId}
        isGameFinished={isFinished}
        onAddToLeaderboard={handleAddToLeaderboard}
      />
    </S.Page>
  );
};

const LOCAL_STORAGE_KEY = "bacteria_leaderboard";

const Main = () => {
  const [leaderboard, setLeaderboard] = React.useState<Array<LeaderboardEntry>>(
    []
  );
  const [isFinished, setIsFinished] = React.useState(false);

  const handleAddToLeaderboard = ({ name, score }: LeaderboardEntry) => {
    const savedLeaderboard = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );
    const updatedLeaderboard = [...savedLeaderboard, { score, name }];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLeaderboard));

    setLeaderboard([...leaderboard, { name, score }]);

    setIsFinished(false);
  };

  return (
    <App
      isFinished={isFinished}
      setIsFinished={setIsFinished}
      handleAddToLeaderboard={handleAddToLeaderboard}
    />
  );
};

export default Main;
