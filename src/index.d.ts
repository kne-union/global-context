import { ReactNode, ComponentType, FC } from 'react';

// 基础类型定义
export interface GlobalContextType<T = any> {
  global: T;
  setGlobal: React.Dispatch<React.SetStateAction<T>>;
  setGlobalValue: (globalKey: keyof T, value: ((prevValue: any) => any) | any) => void;
}

export interface SelectorStoreType<T = any> {
  value: T;
  subscribe: (listener: () => void) => () => void;
  notify: () => void;
}

// createContext 相关类型
export interface CreateContextResult<T = any> {
  context: React.Context<T>;
  Provider: ComponentType<{ value: T; children: ReactNode }>;
  Consumer: ComponentType<{ children: (value: T) => ReactNode }>;
  useContext: () => T;
}

export interface SelectorContextResult<T = any> {
  context: React.Context<SelectorStoreType<T>>;
  Provider: ComponentType<{ value: T; children: ReactNode }>;
  useContext: <R>(selector: (value: T) => R) => R;
}

// 组件 Props 类型定义
export interface GlobalProps<T = any> {
  preset?: any;
  children: ReactNode;
  initValue?: T;
}

export interface GlobalSettingProps {
  loader: () => Promise<Record<string, any>>;
  needReady?: boolean;
  children: ReactNode;
}

export interface GlobalValueProps<T = any> {
  globalKey: keyof T;
  children: (props: { value: any }) => ReactNode;
}

export interface PresetProps {
  children: (preset: any) => ReactNode;
}

// Context 实例类型
export const context: CreateContextResult<any>;
export const {Provider, useContext}: CreateContextResult<any>;
export const useGlobalContext: () => GlobalContextType<any>;

export const presetContext: CreateContextResult<any>;
export const {Provider: PresetProvider, useContext: usePreset}: CreateContextResult<any>;

export const selectorContext: SelectorContextResult<any>;
export const {Provider: SelectProvider, useContext: useSelectorContext}: SelectorContextResult<any>;

// 主要导出类型声明
export declare const createContext: <T = any>(initValue?: T) => CreateContextResult<T>;
export declare const createSelectorContext: <T = any>(initValue?: T) => SelectorContextResult<T>;

export declare const Global: FC<GlobalProps>;
export declare const GlobalSetting: FC<GlobalSettingProps>;
export declare const GlobalValue: FC<GlobalValueProps>;
export declare const Preset: FC<PresetProps>;

export declare const useGlobalValue: <T = any>(globalKey: keyof T) => any;

// 默认导出
declare const _default: CreateContextResult<any>;
export default _default;