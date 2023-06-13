import React from "react";

import * as S from "./styles";

type Props = {
  from: number[];
  to: number[];
  labelA: string;
  labelB: string;
};

const formatColor = (color: number[]) => {
  const [r, g, b] = color;

  return `rgb(${r}, ${g}, ${b})`;
};

const Color = ({ from, to, labelA, labelB }: Props) => (
  <S.Container>
    <S.ColorSample $from={formatColor(from)} $to={formatColor(to)} />
    <S.Labels>
      <S.Label>{labelA}</S.Label>
      <S.Label>{labelB}</S.Label>
    </S.Labels>
  </S.Container>
);

export default Color;
