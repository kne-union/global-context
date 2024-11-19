
# global-context


### 描述

提供一个全局唯一的context，用在多个webpack 邦联模块系统中，可以避免不同版本导致context获取问题


### 安装

```shell
npm i --save @kne/global-context
```


### 概述

这里填写组件概要说明


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

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

