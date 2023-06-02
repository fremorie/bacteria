import React from "react";

import Arrow from "#components/Arrow";
import * as S from "./styles";

type Props = {
  bacteriaSpeed: number;
  glucoseSpeed: number;
  acetateSpeed: number;
};

const Stats = ({ bacteriaSpeed, glucoseSpeed, acetateSpeed }: Props) => {
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
    </S.Container>
  );
};

export default Stats;
