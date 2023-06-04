import { Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import { Box } from "@mui/system";
import { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue("");
  };

  return (
    <Box sx={{ marginBottom: 2, padding: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New Ticket"
            autoFocus
            multiline
            label="Ticket"
            error={inputValue.length <= 0 && touched}
            helperText={inputValue.length <= 0 && touched && "Insert Value"}
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={() => setTouched(true)}
          ></TextField>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              variant="text"
              onClick={() => {
                setIsAddingEntry(false);
                setInputValue("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Button
            startIcon={<AddCardOutlinedIcon />}
            variant="outlined"
            fullWidth
            onClick={() => setIsAddingEntry(true)}
          >
            Add Ticket
          </Button>
        </>
      )}
    </Box>
  );
};
