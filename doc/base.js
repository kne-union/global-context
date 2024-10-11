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
