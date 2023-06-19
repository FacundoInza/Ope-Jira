import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntrieCard } from "./EntrieCard";
import { Entry, EntryStatus } from "../../interfaces";

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntrieList: FC<Props> = ({ status }) => {
  const { isDragging, endDragging } = useContext(UIContext);
  const { entries, updateEntry } = useContext(EntriesContext);

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");

    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;

    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles["dragging"] : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 350px)",
          "&::-webkit-scrollbar": {
            width: "0.5em",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
          overflow: "auto",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        {/* Todo: cambiara dependiendo de si estoy haciendo un drag o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntrieCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
