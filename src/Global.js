import React, { useState, useCallback, useEffect, useRef } from "react";
import { Provider, useContext, usePreset } from "./globalContext";
import createProps, { createFunction } from "@kne/create-props";

const globalPropTypes = createProps("Global", (z) => {
  return {
    preset: z.unknown().default({}).describe("global中的预设参数，组件初始化时传入不可修改"), children: z.unknown()
  };
}, "context的Provider");

const Global = (p) => {
  const { preset, children, ...props } = globalPropTypes(p);
  const [global, setGlobal] = useState({});

  const setGlobalWithKey = useCallback((globalKey, value) => {
    setGlobal((global) => {
      return Object.assign({}, global, { [globalKey]: typeof value === "function" ? value(global[globalKey]) : value });
    });
  }, []);

  return <Provider value={{ ...props, global, preset, setGlobal, setGlobalWithKey }}>
    {children}
  </Provider>;
};

const globalSettingPropTypes = createProps("GlobalSetting", (z) => {
  return {
    loader: z.function().describe("设置到global的值，为一个或多个键值对，将会和之前的global进行Object.assign合并").returns(z.promise(z.unknown())),
    needReady: z.boolean().default(true).describe("是否在global值设置好之前不显示children"),
    children: z.unknown()
  };
}, "设置global的值，通常是通过异步获取");

export const GlobalSetting = (p) => {
  const { loader, needReady, children } = globalSettingPropTypes(p);
  const [loaded, setLoaded] = useState(false);
  const { global, setGlobal } = useContext();
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

export const useGlobalValue = createFunction("useGlobalValue", (z) => {
  return {
    args: [z.string().describe("globalKey:需要从global获取的值")],
    returns: z.unknown().describe("获取到的global的key的值")
  };
}, "获取global里面的globalKey对应的值的hooks")((globalKey) => {
  const { global } = useContext();
  return global[globalKey];
});

const globalValuePropTypes = createProps("GlobalValue", (z) => {
  return [{
    globalKey: z.string().describe("需要获取的global的key"),
    children: z.function().args(z.object({ value: z.unknown().describe("获取到的global的key的值") }))
  }, { children: true, globalKey: true }];
}, "获取global中globalKey的值");

export const GlobalValue = (p) => {
  const { globalKey, children } = globalValuePropTypes(p);
  const value = useGlobalValue(globalKey);
  return children({ value });
};

const presetPropTypes = createProps("Preset", (z) => {
  return [{
    children: z.function().args(z.unknown().describe("预设对象")).describe("接收预设对象的方法")
  }, { children: true }];
}, "获取Preset的值");

export const Preset = (p) => {
  const { children } = presetPropTypes(p);
  const preset = usePreset();
  return children(preset);
};

export default Global;
