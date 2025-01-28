import { createContext, useContext } from "react";

const DarkModeContext = createContext();

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");

  return context;
}

export { useDarkMode };
export default DarkModeContext;
