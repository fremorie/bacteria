import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  score: number | string;
  onSave: (entry: { name: string; score: number | string }) => void;
  open: boolean;
  onCancel: () => void;
  onClose: () => void;
};

export default function FormDialog({
  score,
  open,
  onSave,
  onCancel,
  onClose,
}: Props) {
  const [name, setName] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSave = () => {
    onSave({ name, score });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Your score is: {score}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Would you like your score to appear in the leaderboard?
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
