import React from "react";

import { drawBrownianMotion } from "#utils/brownianMotion";
// @ts-ignore
import reactorImg from "../../static/reactor.png";
import * as S from "./styles";

type Props = {
  setOnFeed?: any;
  setSpeed: any;
  simulationId: string;
  setBacteriumCount: (count: number) => void;
  onReset?: () => void;
};

const Reactor = ({
  setOnFeed,
  setSpeed,
  simulationId,
  setBacteriumCount,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const requestIdRef = React.useRef<number | null>(null);

  const setRequestId = (tick: any) => {
    requestIdRef.current = requestAnimationFrame(tick);
  };

  const updateCanvasSize = (ctx: CanvasRenderingContext2D) => {
    ctx.canvas.width =
      (S.canvasWidthDefault / S.imgSizeDefault) * (window.innerHeight / 2);
    ctx.canvas.height =
      (S.canvasHeightDefault / S.imgSizeDefault) * (window.innerHeight / 2);
  };

  const handleResize = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d") as CanvasRenderingContext2D;

    updateCanvasSize(ctx);
  };

  React.useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d") as CanvasRenderingContext2D;

    updateCanvasSize(ctx);

    window.addEventListener("resize", handleResize);

    const tick = drawBrownianMotion(
      canvas,
      ctx,
      undefined,
      undefined,
      setOnFeed,
      setSpeed,
      setBacteriumCount,
      setRequestId
    );

    requestIdRef.current = requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(requestIdRef.current as number);
    };
  }, [simulationId]);

  return (
    // @ts-ignore
    <S.Container onResize={handleResize}>
      <S.ReactorImg src={reactorImg} />
      <S.Canvas ref={canvasRef} />
    </S.Container>
  );
};

export default Reactor;
