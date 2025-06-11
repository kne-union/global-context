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
