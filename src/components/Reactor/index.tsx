import React from "react";

import * as S from "./styles";

type Props = {
  bacteriaCount?: number;
  glucoseCount?: number;
};

const Reactor = ({ bacteriaCount, glucoseCount }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
  }, []);

  return <S.Canvas ref={canvasRef} />;
};

export default Reactor;
