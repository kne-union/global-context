import createContext, {createSelectorContext} from "./createContext";

export const context = createContext({});

export const {Provider, useContext} = context;

export const useGlobalContext = useContext;

export const presetContext = createContext({});
export const {Provider: PresetProvider, useContext: usePreset} = presetContext;
export const selectorContext = createSelectorContext({});
export const {Provider: SelectProvider, useContext: useSelectorContext} = selectorContext;

export default context;
