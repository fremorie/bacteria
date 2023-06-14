import React from "react";

import * as S from "../styles";

type Props = {
  onClick?: () => void;
};

const ResetButton = ({ onClick }: Props) => {
  return <S.Button onClick={onClick}>RESET</S.Button>;
};

export default ResetButton;
