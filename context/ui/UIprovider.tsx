import { FC, ReactNode, useReducer } from "react";
import { UIContext } from "./UIcontext";
import { uiReducer } from "./uiReducer";

export interface UIState {
  sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
};

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  return (
    <UIContext.Provider
      value={{
        sideMenuOpen: false,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
