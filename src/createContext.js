import React, {
    createContext as createReactContext, useContext as useReactContext, useRef, useEffect, useSyncExternalStore
} from "react";

const createContext = (initValue = {}) => {
    const context = createReactContext(initValue);
    const {Provider, Consumer} = context;
    const useContext = () => useReactContext(context);

    return {context, Provider, Consumer, useContext};
};

export default createContext;

export const createSelectorContext = (initValue = {}) => {
    const {context, Provider, useContext} = createContext(initValue);

    const SelectorProvider = ({value, children}) => {
        const storeRef = useRef();
        let store = storeRef.current;
        if (!store) {
            const listeners = new Set();
            store = {
                value, subscribe: (l) => {
                    listeners.add(l);
                    return () => listeners.delete(l);
                }, notify: () => listeners.forEach((l) => l()),
            }
            storeRef.current = store;
        }
        useEffect(() => {
            if (!Object.is(store.value, value)) {
                store.value = value;
                store.notify();
            }
        });
        return <Provider value={store}>{children}</Provider>
    };

    const useSelectorContext = (selector) => {
        const store = useContext();
        return useSyncExternalStore(store.subscribe||(()=>{}), () => {
            return selector(store.value);
        });
    };

    return {context, Provider: SelectorProvider, useContext: useSelectorContext};
};
