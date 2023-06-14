import React from "react";

import * as S from "./styles";

type Props = {
  count?: number;
};

const BacteriumCounter = ({ count }: Props) => {
  return (
    <S.Container>
      <S.Label>Bacterium count:&nbsp;</S.Label>
      <S.Count>{count || "-"}</S.Count>
    </S.Container>
  );
};

export default BacteriumCounter;
