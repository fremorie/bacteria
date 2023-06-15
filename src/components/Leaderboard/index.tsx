import * as React from "react";

import FullScreenDialog from "#components/Leaderboard/FullscreenDialog";
import Button from "#components/Leaderboard/Button";

export default function Leaderboard({ leaderboard }: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div key={leaderboard.length}>
      <Button onClick={handleClickOpen} />
      <FullScreenDialog open={open} onClose={handleClose} />
    </div>
  );
}
