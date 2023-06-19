import React, { ChangeEvent, FC, useContext, useMemo, useState } from "react";

import { GetServerSideProps } from "next";

import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";

import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { Entry, EntryStatus } from "../../interfaces";
import Layout from "../../components/layout/Layout";

import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";
import { useRouter } from "next/router";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState(entry.status);
  const [touched, setTouched] = useState(false);

  const router = useRouter();

  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status,
    };

    updateEntry(updatedEntry, true);
  };

  const onClickDelete = () => {
    deleteEntry(entry, true);
    router.push("/");
  };

  return (
    <Layout title={inputValue.substring(0, 10) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 15 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Ticket`}
              subheader={`Created at ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )} few minutes ago`}
            />
            <Typography margin={2}>{inputValue}</Typography>
            <FormControl sx={{ marginLeft: 2 }}>
              <FormLabel>Status:</FormLabel>
              <RadioGroup row value={status} onChange={onStatusChanged}>
                {validStatus.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva Entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChange}
                helperText={isNotValid && "Insert value"}
                error={isNotValid}
              />

              {/* RADIO */}

              <CardActions>
                <Button
                  startIcon={<SaveAsOutlinedIcon />}
                  variant="contained"
                  fullWidth
                  onClick={onSave}
                  disabled={inputValue.length <= 0}
                >
                  Save
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        onClick={onClickDelete}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { entry },
  };
};

export default EntryPage;
