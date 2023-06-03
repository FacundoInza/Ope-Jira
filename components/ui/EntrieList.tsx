import { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntrieCard } from "./EntrieCard";
import { EntryStatus } from "../../interfaces";

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntrieList: FC<Props> = ({ status }) => {
  const { isDragging } = useContext(UIContext);
  const { entries } = useContext(EntriesContext);

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
  };

  return (
    //TODO: aqui haremos un Drop
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles["dragging"] : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "-moz-hidden-unscrollable",
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
