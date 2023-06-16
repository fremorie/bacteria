import React from "react";
import { v4 as uuid } from "uuid";

import Reactor from "#components/Reactor";
import Stats from "#components/Stats";
import FeedButton from "#components/Buttons/FeedButton";
import Legend from "#components/Legend";
import StartButton from "#components/Buttons/StartButton";
import ResetButton from "#components/Buttons/ResetButton";
import BacteriumCounter from "#components/BacteriumCounter";
import FormDialog from "#components/FormDialog";
import { initial_state } from "#utils/index";
import * as S from "./styles";

type Props = {
  isCountdownInProgress: boolean;
  onStart: () => void;
  onReset: () => void;
  onCancel: () => void;
  simulationId: string;
  isGameFinished: boolean;
  onAddToLeaderboard: (entry: { name: string; score: number | string }) => void;
};

const formatCount = (count: number | undefined) => {
  if (count === undefined) {
    return "--";
  } else {
    return String(count).padStart(2, "0");
  }
};

const ReactorApp = ({
  isCountdownInProgress,
  onStart,
  onReset,
  onCancel,
  simulationId,
  isGameFinished,
  onAddToLeaderboard,
}: Props) => {
  const [feedState, setOnFeed] = React.useState<{ feed: () => void }>({
    feed: () => {},
  });

  const [bacteriumCount, setBacteriumCount] = React.useState<number | string>(
    initial_state.X
  );

  const [speedState, setSpeed] = React.useState<any>({
    getSpeed: () => ({
      X: 0,
      A: 0,
      S: 0,
      DOTa: 0,
    }),
  });

  const handleSetBacteriumCount = (count: number) => {
    if (!isGameFinished) {
      setBacteriumCount(formatCount(count));
    }
  };

  return (
    <div>
      <S.Row>
        <BacteriumCounter count={bacteriumCount} />
      </S.Row>
      <S.MainRow>
        <Stats getSpeed={speedState.getSpeed} />
        <S.Column>
          <Reactor
            setOnFeed={(feed: any) => setOnFeed(feed)}
            setSpeed={(currentSpeed: any) => setSpeed(currentSpeed)}
            simulationId={simulationId}
            setBacteriumCount={handleSetBacteriumCount}
          />
          <S.ButtonsContainer>
            {isCountdownInProgress && <FeedButton onClick={feedState.feed} />}
            {!isCountdownInProgress && <StartButton onClick={onStart} />}
            {!isCountdownInProgress && <ResetButton onClick={onReset} />}
          </S.ButtonsContainer>
        </S.Column>
        <Legend />
      </S.MainRow>
      <FormDialog
        score={bacteriumCount}
        onSave={onAddToLeaderboard}
        open={isGameFinished}
        onCancel={onCancel}
        onClose={onCancel}
      />
    </div>
  );
};

export default ReactorApp;
