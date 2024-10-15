import createContext from "./createContext";

export const context = createContext({});

export const { Provider, Consumer, useContext } = context;

export const useGlobalContext = useContext;

export { createContext };

export default context;
