import React, { createContext, useContext } from "react";

export const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp повинен використовуватись лише в межах AppContext.Provider");
  }

  return context;
};