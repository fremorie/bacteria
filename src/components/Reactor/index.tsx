import React from "react";

import { drawBrownianMition } from "#utils/brownianMotion";
import {
  solve,
  initial_state,
  parameters,
  prepareCanvasData,
} from "#utils/index";
// @ts-ignore
import reactorImg from "../../static/reactor.png";
import * as S from "./styles";

type Props = {
  setOnFeed?: any;
};

const Reactor = ({ setOnFeed }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const drawBacteria = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d") as CanvasRenderingContext2D;

    window.requestAnimationFrame(drawBrownianMition(canvas, ctx));
  };

  const drawGlucose = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d") as CanvasRenderingContext2D;

    window.requestAnimationFrame(
      drawBrownianMition(canvas, ctx, undefined, undefined, setOnFeed)
    );
  };

  React.useEffect(() => {
    drawBacteria();
  }, []);

  React.useEffect(() => {
    drawGlucose();
  }, []);

  return (
    <S.Container>
      <S.ReactorImg src={reactorImg} />
      <S.Canvas height="559px" width="340px" ref={canvasRef} />
    </S.Container>
  );
};

export default Reactor;
