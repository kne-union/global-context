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