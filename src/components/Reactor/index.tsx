import React from "react";

import { drawBrownianMition } from "#utils/brownianMotion";
// @ts-ignore
import reactorImg from "../../static/reactor.png";
import * as S from "./styles";

type Props = {
  setOnFeed?: any;
  setSpeed: any;
};

const Reactor = ({ setOnFeed, setSpeed }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const drawParticles = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d") as CanvasRenderingContext2D;

    window.requestAnimationFrame(
      drawBrownianMition(canvas, ctx, undefined, undefined, setOnFeed, setSpeed)
    );
  };

  React.useEffect(() => {
    drawParticles();
  }, []);

  return (
    <S.Container>
      <S.ReactorImg src={reactorImg} />
      <S.Canvas height="559px" width="340px" ref={canvasRef} />
    </S.Container>
  );
};

export default Reactor;
