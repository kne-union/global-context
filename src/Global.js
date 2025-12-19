import React, {useState, useCallback, useEffect, useRef} from "react";
import {Provider, useContext, useSelectorContext, SelectProvider, PresetProvider, usePreset} from "./globalContext";

const Global = ({preset, children, initValue}) => {
    const [global, setGlobal] = useState(Object.assign({}, initValue));

    const setGlobalValue = useCallback((globalKey, value) => {
        setGlobal((global) => {
            return Object.assign({}, global, {[globalKey]: typeof value === "function" ? value(global[globalKey]) : value});
        });
    }, []);

    return <Provider value={{global, setGlobal, setGlobalValue}}>
        <PresetProvider value={preset}>
            <SelectProvider value={global}>
                {children}
            </SelectProvider>
        </PresetProvider>
    </Provider>;
};

export const GlobalSetting = ({loader, needReady = true, children}) => {
    const [loaded, setLoaded] = useState(false);
    const {global, setGlobal} = useContext();
    const globalRef = useRef(null);
    const loaderRef = useRef(loader);
    useEffect(() => {
        loaderRef.current().then((target) => {
            setGlobal((global) => {
                const nextGlobal = Object.assign({}, global, target);
                globalRef.current = nextGlobal;
                return nextGlobal;
            });
        });
    }, []);

    useEffect(() => {
        if (global === globalRef.current) {
            setLoaded(true);
        }
    }, [global]);

    if (needReady && !loaded) {
        return null;
    }

    return children;
};

export const useGlobalValue = (globalKey) => {
    return useSelectorContext(global => global?.[globalKey]);
};

export const GlobalValue = ({globalKey, children}) => {
    const value = useGlobalValue(globalKey);
    return children({value});
};

export const Preset = ({children}) => {
    const preset = usePreset();
    return children(preset);
};

export default Global;
