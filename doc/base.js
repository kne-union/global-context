const { Provider, useGlobalContext } = globalContext;
const BaseExample = () => {
  return <Provider value={{}}>
    <div>我是一个示例组件</div>
  </Provider>;
};

render(<BaseExample />);
