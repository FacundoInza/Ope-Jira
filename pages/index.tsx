import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import { EntrieList, NewEntry } from "../components/ui";

const HomePage: NextPage = () => {
  return (
    <Layout title="HOME - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pending"></CardHeader>
            {/* Agregar una nueva entrada */}
            <NewEntry />
            {/* Listado de las entradas */}
            <EntrieList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="In Progess"></CardHeader>
            <EntrieList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Complete"></CardHeader>
            <EntrieList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
