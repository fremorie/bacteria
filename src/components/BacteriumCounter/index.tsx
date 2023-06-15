import React from "react";


import * as S from "./styles";

type Props = {
  count?: number;
};


const formatCount = (count: number | undefined) => {
  if (count === undefined) {
    return '----';
  } else {
    return String(Math.round(count * 100)).padStart(4, '0');
  }
}

const BacteriumCounter = ({ count }: Props) => {
  return (
    <S.Container>
{/*       <S.Label>Bacteria count:&nbsp;</S.Label> */}
      <S.Count>{formatCount(count)}</S.Count>
    </S.Container>
  );
};

export default BacteriumCounter;
