"use client";

import { ReactNode, createContext } from "react";

type HydrationProviderProps = {
  children: ReactNode;
  userAgent: string;
};

type HydrationContextType = {
  userAgent: string;
};

export const HydrationContext = createContext<HydrationContextType>({
  userAgent: "",
});

const HydrationProvider = (props: HydrationProviderProps) => {
  const { children, userAgent } = props;

  return (
    <HydrationContext.Provider value={{ userAgent }}>
      {children}
    </HydrationContext.Provider>
  );
};

export default HydrationProvider;
