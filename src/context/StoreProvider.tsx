import { useState, ReactNode, FC } from "react";
import { StoreContext } from "./storeContext";

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
 const [store, setStore] = useState<StoreContextType>({});

 return <StoreContext.Provider value={{ store, setStore }}>{children}</StoreContext.Provider>;
};

export { StoreProvider };