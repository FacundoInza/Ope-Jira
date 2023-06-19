import React, { FC } from "react";
import Head from "next/head";

import { Box } from "@mui/material";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

interface Props {
  title?: string;
  children: any;
}

const Layout: FC<Props> = ({ title = "Open Jira", children }) => {
  return (
    <Box overflow={"hidden"}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
export default Layout;
