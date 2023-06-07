import React from "react";

import * as S from "./styles";

type Props = {
  // -5 to 5
  speed: number;
};

const Arrow = ({ speed }: Props) => {
  return (
    <React.Fragment>
      <S.Icon>
        {speed > 0 && <S.ArrowUp $speed={speed} />}
        {speed === 0 && <S.ArrowFlat />}
        {speed < 0 && <S.ArrowDown $speed={speed} />}
      </S.Icon>
    </React.Fragment>
  );
};

export default Arrow;
