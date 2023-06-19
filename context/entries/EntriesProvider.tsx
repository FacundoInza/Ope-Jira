import { FC, ReactNode, useEffect, useReducer } from "react";
import { EntriesContext } from "./";
import { entriesReducer } from "./";

import { Entry } from "../../interfaces";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";
import { error } from "console";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] - AddEntry", payload: data });
  };

  const updateEntry = async (
    { description, _id, status }: Entry,
    showSnackBar: boolean = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      if (showSnackBar) {
        enqueueSnackbar("Updated Entry", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
      }

      dispatch({ type: "[Entry] - Entry-Update", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntry = async (entry: Entry, showSnackBar: boolean = false) => {
    try {
      const { data } = await entriesApi.delete(`/entries/${entry._id}`);

      if (showSnackBar) {
        enqueueSnackbar(data.message, {
          variant: "error",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
      }

      dispatch({ type: "[Entry] - Entry-Delete", payload: entry });
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] - Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        //methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
