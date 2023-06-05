import React from "react";

import { drawBrownianMition } from "#utils/brownianMotion";
import * as S from "./styles";

type Props = {
  bacteriaCount?: number;
  glucoseCount?: number;
};

const Reactor = ({ bacteriaCount, glucoseCount }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const drawBacteria = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    window.requestAnimationFrame(drawBrownianMition(canvas, ctx));
  };

  const drawGlucose = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    window.requestAnimationFrame(drawBrownianMition(canvas, ctx));
  };

  React.useEffect(() => {
    drawBacteria();
  }, []);

  React.useEffect(() => {
    drawGlucose();
  }, []);

  return <S.Canvas height="300px" width="500px" ref={canvasRef} />;
};

export default Reactor;
