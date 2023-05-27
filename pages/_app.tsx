import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { darkTheme, ligthTheme } from "../themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Component {...pageProps} />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default MyApp;
