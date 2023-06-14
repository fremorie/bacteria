import React from "react";

import Arrow from "#components/Arrow";
import * as S from "./styles";

type Props = {
  getSpeed: () => {
    X: number;
    S: number;
    A: number;
    DOTa: number;
  };
};

const Stats = ({ getSpeed }: Props) => {
  const {
    X: bacteriaSpeed,
    S: glucoseSpeed,
    A: acetateSpeed,
    DOTa: oxygenSpeed,
  } = getSpeed();

  return (
    <S.Container>
      <S.Speedometer>
        <Arrow speed={bacteriaSpeed} />
        <S.Label>Bacteria</S.Label>
      </S.Speedometer>
      <S.Speedometer>
        <Arrow speed={glucoseSpeed} />
        <S.Label>Glucose</S.Label>
      </S.Speedometer>
      <S.Speedometer>
        <Arrow speed={acetateSpeed} />
        <S.Label>Acetate</S.Label>
      </S.Speedometer>
      <S.Speedometer>
        <Arrow speed={oxygenSpeed} />
        <S.Label>Oxygen</S.Label>
      </S.Speedometer>
    </S.Container>
  );
};

export default Stats;
