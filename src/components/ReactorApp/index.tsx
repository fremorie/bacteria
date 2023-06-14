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
  simulationId: string;
  isGameFinished: boolean;
  onAddToLeaderboard: (entry: { name: string; score: number }) => void;
};

const ReactorApp = ({
  isCountdownInProgress,
  onStart,
  onReset,
  simulationId,
  isGameFinished,
  onAddToLeaderboard,
}: Props) => {
  const [feedState, setOnFeed] = React.useState<{ feed: () => void }>({
    feed: () => {},
  });

  const [bacteriumCount, setBacteriumCount] = React.useState<number>(
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
      setBacteriumCount(count);
    }
  };

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div>
      <S.Row>
        <BacteriumCounter count={bacteriumCount} />
      </S.Row>
      <S.Row>
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
      </S.Row>
      <FormDialog
        score={bacteriumCount}
        onSave={onAddToLeaderboard}
        open={isGameFinished}
        onCancel={() => {}}
        onClose={() => {}}
      />
    </div>
  );
};

export default ReactorApp;
