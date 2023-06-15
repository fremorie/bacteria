import React from "react";

import * as S from "./styles";

type Props = {
  count?: number | string;
};

const BacteriumCounter = ({ count }: Props) => {
  return (
    <S.Container>
      <S.Count>{count}</S.Count>
    </S.Container>
  );
};

export default BacteriumCounter;
