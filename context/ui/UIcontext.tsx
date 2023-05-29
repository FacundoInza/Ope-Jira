import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;

  //methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
