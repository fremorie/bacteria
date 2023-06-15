const LOCAL_STORAGE_KEY = "bacteria_leaderboard";

type Entry = {
  name: string;
  score: string;
};

export const getLeaderboardFromLocalStorage = () => {
  const res = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

  return res.sort((a: Entry, b: Entry) =>
    Number.parseFloat(a.score) < Number.parseFloat(b.score) ? 1 : -1
  );
};

export const addEntryToLocalStorage = ({
  name,
  score,
}: {
  name: string;
  score: number;
}) => {
  const savedLeaderboard = getLeaderboardFromLocalStorage();
  const updatedLeaderboard = [...savedLeaderboard, { score, name }];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLeaderboard));
};
