
# global-context


### 描述

提供一个全局唯一的context，用在多个webpack 邦联模块系统中，可以避免不同版本导致context获取问题


### 安装

```shell
npm i --save @kne/global-context
```


### 概述

@kne/global-context 是一个轻量级的 React 全局上下文管理库，专为微前端架构设计，确保在多个 webpack 联邦模块系统中提供全局唯一的 context。

### 特性

#### 核心功能
- 提供全局唯一的 context 实例
- 支持预设值管理
- 简化的全局状态访问
- 支持动态值更新

#### 技术优势
- 轻量级实现
- 基于 React Context API
- 支持 TypeScript
- 适配微前端架构

### 架构设计

#### 核心模块
- **globalContext**: 全局唯一的上下文实例
- **createContext**: 上下文创建工具
- **Global**: 全局状态容器

#### 数据流
```
Provider (全局上下文)
    ↓
GlobalSetting (设置值)
    ↓
Global (状态管理)
    ↓
GlobalValue/useGlobalValue (获取值)
```

### 使用场景

#### 微前端应用
- 跨模块状态共享
- 统一配置管理
- 主题样式同步

#### 状态管理
- 用户认证信息
- 全局配置项
- 主题设置

### 最佳实践

#### 基本原则
- 在应用顶层使用 Provider
- 合理使用预设值
- 避免过度使用全局状态

#### 性能优化
- 使用 hooks 代替组件式API
- 合理划分全局状态
- 避免频繁更新


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
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

- 这里填写示例标题
- 这里填写示例说明
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


### API

### API 参考

#### 核心组件

| 组件名 | 描述 | 导入方式 |
|--------|------|----------|
| Global | 全局状态容器组件 | `import { Global } from '@kne/global-context'` |
| GlobalSetting | 设置全局值的组件 | `import { GlobalSetting } from '@kne/global-context'` |
| GlobalValue | 获取全局值的组件 | `import { GlobalValue } from '@kne/global-context'` |

#### Global

全局状态容器组件的属性：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| children | ReactNode | 是 | 子组件 |
| preset | object | 否 | 预设值对象 |

```jsx
<Global preset={{ theme: 'light' }}>
  <App />
</Global>
```

#### GlobalSetting

设置全局值的组件属性：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| name | string | 是 | 全局值的键名 |
| value | any | 是 | 要设置的值 |

```jsx
<GlobalSetting name="theme" value="dark" />
```

#### GlobalValue

获取全局值的组件属性：

| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| name | string | 是 | 全局值的键名 |
| children | (value: any) => ReactNode | 是 | 渲染函数 |

```jsx
<GlobalValue name="theme">
  {(theme) => <div>当前主题：{theme}</div>}
</GlobalValue>
```

#### Hooks API

| Hook 名称 | 参数 | 返回值 | 描述 |
|-----------|------|--------|------|
| useGlobalValue | name: string | any | 获取指定键名的全局值 |
| usePreset | - | object | 获取预设值对象 |

```jsx
const theme = useGlobalValue('theme');
const preset = usePreset();
```

#### Context API

| API | 参数 | 返回值 | 描述 |
|-----|------|--------|------|
| createContext | defaultValue?: any | Context 对象 | 创建新的上下文实例 |

Context 对象包含的组件：

| 组件 | 属性 | 描述 |
|------|------|------|
| Provider | value: any | 提供上下文值的组件 |
| Consumer | children: (value: any) => ReactNode | 消费上下文值的组件 |

```jsx
const MyContext = createContext(defaultValue);

<MyContext.Provider value={value}>
  <MyContext.Consumer>
    {value => /* 渲染内容 */}
  </MyContext.Consumer>
</MyContext.Provider>
```

#### 类型定义

```typescript
interface GlobalProps {
  children: ReactNode;
  preset?: Record<string, any>;
}

interface GlobalSettingProps {
  name: string;
  value: any;
}

interface GlobalValueProps {
  name: string;
  children: (value: any) => ReactNode;
}
```

