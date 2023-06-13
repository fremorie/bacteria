import React from "react";

// @ts-ignore
import yasuo from "../../static/yasuo.jpg";
import * as S from "./styles";

type Props = {
  onClick?: () => void;
};

const FeedButton = ({ onClick }: Props) => {
  return (
    <S.Button onClick={onClick}>
      FEED
    </S.Button>
  );
};

export default FeedButton;
