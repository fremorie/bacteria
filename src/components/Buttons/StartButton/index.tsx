import React from "react";

import * as S from "./styles";

type Props = {
  onClick?: () => void;
};

const StartButton = ({ onClick }: Props) => {
  return <S.StartButton onClick={onClick}>START</S.StartButton>;
};

export default StartButton;
