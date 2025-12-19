
# global-context


### 描述

提供一个全局唯一的context，用在多个webpack 邦联模块系统中，可以避免不同版本导致context获取问题


### 安装

```shell
npm i --save @kne/global-context
```


### 概述

Global Context 是一个专为 React 应用设计的全局状态管理解决方案，特别适用于使用多个 Webpack 联邦模块的复杂项目架构。该项目通过提供全局唯一的 Context 实例，有效解决了不同模块版本间 Context 隔离的问题，确保跨模块组件间的数据共享和状态同步。

**核心特性**
- 提供全局唯一的 Context，支持跨模块数据共享
- 兼容 Webpack 联邦模块系统，避免版本冲突
- 内置选择器模式，优化组件渲染性能
- 支持异步数据加载和预设值配置
- 轻量级设计，无额外依赖，易于集成

**适用场景**
- 微前端架构中的跨应用状态管理
- 多模块联邦系统中的数据同步需求
- 需要全局配置信息共享的大型 React 项目
- 组件库与业务应用间的参数传递场景

**技术亮点**
采用 React 18 最新特性，基于 useSyncExternalStore 实现高效的状态订阅机制。通过 Context 隔离和选择器模式，在保证全局状态可访问性的同时，最大化减少了不必要的组件重渲染。项目设计遵循 React 最佳实践，提供完整的 TypeScript 类型支持，确保开发体验和代码质量。

### 示例

#### 示例代码

- 基础上下文
- 展示Provider和useContext的基本使用方法
- globalContext(@kne/current-lib_global-context)

```jsx
const { Provider, useContext } = globalContext;

const ChildrenComponent = () => {
  const value = useContext();

  return <div>context value: {JSON.stringify(value)}</div>;
};

const BaseExample = () => {
  return <Provider value={{ a: 1 }}>
    <div>我是一个示例组件</div>
    <ChildrenComponent />
  </Provider>;
};

render(<BaseExample />);

```

- 全局状态管理
- 使用Global组件管理全局状态，支持预设和异步加载
- globalContext(@kne/current-lib_global-context)

```jsx
const { Global, GlobalSetting, GlobalValue, Preset } = globalContext;

const BaseExample = () => {
  return <Global preset={{ a: 1 }}>
    <GlobalSetting loader={() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ userName: "Linzp" });
        }, 1000);
      });
    }}>
      userName:<GlobalValue globalKey="userName">{({ value }) => value}</GlobalValue>
    </GlobalSetting>
    <Preset>{({ a }) => a}</Preset>
  </Global>;
};

render(<BaseExample />);

```

- 性能优化渲染
- 使用useGlobalValue避免不必要的组件重渲染
- globalContext(@kne/current-lib_global-context)

```jsx
const {Global, useGlobalValue, useContext} = globalContext;

const Children1Component = () => {
    console.log('children1 render');
    const value = useGlobalValue('a');
    return <div>context value.a: {value}</div>;
};

const Children2Component = () => {
    console.log('children2 render');
    const value = useGlobalValue('b');
    return <div>context value.b: {value}</div>;
};

const ChildrenSetValue = () => {
    const {setGlobalValue} = useContext();

    return <div>
        <button onClick={() => {
            setGlobalValue('a', a => a + 1);
        }}>a + 1
        </button>
        <button onClick={() => {
            setGlobalValue('b', b => b + 1);
        }}>b + 1
        </button>
    </div>
};

const BaseExample = () => {
    return <Global initValue={{a: 1, b: 2}}>
        <div>我是一个示例组件</div>
        <Children1Component/>
        <Children2Component/>
        <ChildrenSetValue/>
    </Global>;
};

render(<BaseExample/>);

```


### API

### Global
全局状态管理组件，提供跨模块的数据共享能力。

#### 属性说明
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| preset | object | 否 | - | 预设配置数据 |
| children | ReactNode | 是 | - | 子组件 |
| initValue | object | 否 | {} | 初始全局状态值 |

### GlobalSetting
全局状态设置组件，支持异步数据加载。

#### 属性说明
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| loader | function | 是 | - | 异步加载函数，返回 Promise |
| needReady | boolean | 否 | true | 是否需要等待加载完成 |
| children | ReactNode | 是 | - | 子组件 |

### GlobalValue
全局状态值渲染组件，通过渲染函数模式获取状态值。

#### 属性说明
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| globalKey | string | 是 | - | 全局状态键名 |
| children | function | 是 | - | 渲染函数，接收 value 参数 |

### Preset
预设配置渲染组件，通过渲染函数模式获取预设值。

#### 属性说明
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| children | function | 是 | - | 渲染函数，接收 preset 参数 |

### createContext
创建 Context 实例的工具函数。

#### 返回值
| 属性名 | 类型 | 说明 |
|--------|------|------|
| context | Context | React Context 对象 |
| Provider | Component | Context Provider 组件 |
| Consumer | Component | Context Consumer 组件 |
| useContext | function | 获取 Context 值的 Hook |

### useSelectorContext
创建选择器 Context 的工具函数，支持细粒度状态订阅。

#### 返回值
| 属性名 | 类型 | 说明 |
|--------|------|------|
| context | Context | React Context 对象 |
| Provider | Component | 选择器 Provider 组件 |
| useContext | function | 选择器 Hook |

### useGlobalContext
获取全局 Context 值的 Hook。

#### 返回值
| 类型 | 说明 |
|------|------|
| object | 包含 global、setGlobal、setGlobalValue 的对象 |

### useGlobalValue
根据键名获取全局状态值的 Hook。

#### 参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| globalKey | string | 是 | 全局状态键名 |

#### 返回值
| 类型 | 说明 |
|------|------|
| any | 对应键名的全局状态值 |

### usePreset
获取预设配置值的 Hook。

#### 返回值
| 类型 | 说明 |
|------|------|
| object | 预设配置对象 |

### useSelectorContext
使用选择器订阅状态变化的 Hook。

#### 参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| selector | function | 是 | 选择器函数 |

#### 返回值
| 类型 | 说明 |
|------|------|
| any | 选择器函数的返回值 |
