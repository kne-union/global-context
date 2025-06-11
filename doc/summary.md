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
