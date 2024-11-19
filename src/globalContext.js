import createContext from "./createContext";

export const context = createContext({});

export const { Provider, Consumer, useContext } = context;

export const useGlobalContext = useContext;

export const usePreset = () => {
  const contextValue = useContext();
  return Object.assign({}, { apis: {} }, contextValue?.preset);
};

export default context;
