import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  //methods
  setIsAddingEntry: (isAdding: boolean) => void;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  endDragging: () => void;
  startDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
