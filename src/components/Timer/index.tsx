import React, { LegacyRef } from "react";
import ReactDOM from "react-dom";
import Countdown, {
  zeroPad,
  calcTimeDelta,
  formatTimeDelta,
  CountdownTimeDelta,
  CountdownApi,
} from "react-countdown";

import * as S from "./styles";

const TIME_LIMIT = 30; // seconds

// Random component
const Completionist = () => <span>You are good to go!</span>;

type RendererProps = {
  minutes: number;
  seconds: number;
};

const renderer = ({ minutes, seconds }: RendererProps) => (
  <S.Countdown>
    {zeroPad(minutes)}:{zeroPad(seconds)}
  </S.Countdown>
);

type Props = {
  setRef: LegacyRef<Countdown>;
  onComplete?: () => void;
};

const Timer = React.memo(({ setRef, onComplete }: Props) => {
  const t = new Date();
  t.setSeconds(t.getSeconds() + TIME_LIMIT);

  return (
    <S.Container>
      <Countdown
        date={t}
        renderer={renderer}
        // intervalDelay={0}
        // precision={3}
        autoStart={false}
        ref={setRef}
        //onStart={onStart}
        //controlled={true}
        onComplete={onComplete}
      >
        <Completionist />
      </Countdown>
    </S.Container>
  );
});

export default Timer;
