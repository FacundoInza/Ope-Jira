import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { darkTheme, ligthTheme } from "../themes";
import { UIProvider } from "../context/ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
    </UIProvider>
  );
}

export default MyApp;
