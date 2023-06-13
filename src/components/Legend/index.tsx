import React from "react";

import { COLORS } from "#utils/index";
import Color from "./components/Color";
import * as S from "./styles";

const Legend = () => {
  return (
    <S.Container>
      <S.Speedometer>
        <S.Bacteria />
        <S.Label>Bacteria</S.Label>
      </S.Speedometer>
      <S.Speedometer>
        <S.Glucose />
        <S.Label>Glucose</S.Label>
      </S.Speedometer>
      <S.Speedometer>
        <S.Colors>
          <Color
            from={COLORS.A[0]}
            to={COLORS.A[1]}
            labelA={"low"}
            labelB={"high"}
          />
        </S.Colors>
        <S.Label>Acetate</S.Label>
      </S.Speedometer>
      <S.Speedometer>
        <S.Colors>
          <Color
            from={COLORS.DOTa[0]}
            to={COLORS.DOTa[1]}
            labelA={"min"}
            labelB={"max"}
          />
        </S.Colors>
        <S.Label>Oxygen</S.Label>
      </S.Speedometer>
    </S.Container>
  );
};

export default Legend;
