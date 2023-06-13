import React from "react";

import * as S from "./styles";

type Props = {
  from: number[];
  to: number[];
};

const formatColor = (color: number[]) => {
  const [r, g, b] = color;

  return `rgb(${r}, ${g}, ${b})`;
};

const Color = ({ from, to }: Props) => (
  <S.Container>
    <S.ColorSample $from={formatColor(from)} $to={formatColor(to)} />
    <S.Labels>
      <S.Label>min</S.Label>
      <S.Label>max</S.Label>
    </S.Labels>
  </S.Container>
);

export default Color;
