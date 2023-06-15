import * as React from "react";
import _Button from "@mui/material/Button";

type Props = {
  onClick: () => void;
};

export default function Button({ onClick }: Props) {
  return (
    <div>
      {/* @ts-ignore */}
      <_Button variant="outlined" onClick={onClick}>
        Leaderboard
      </_Button>
    </div>
  );
}
