import * as component_9 from '@kne/global-context';
const readmeConfig = {
    name: `@kne/global-context`,
    description: ``,
    summary: `<p>这里填写组件概要说明</p>`,
    api: `<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
</table>`,
    example: {
        isFull: false,
        className: `global_context_7eeb0`,
        style: ``,
        list: [{
    title: `这里填写示例标题`,
    description: `这里填写示例说明`,
    code: `const { Provider, useGlobalContext } = globalContext;
const BaseExample = () => {
  return <Provider value={{}}>
    <div>我是一个示例组件</div>
  </Provider>;
};

render(<BaseExample />);

`,
    scope: [{
    name: "globalContext",
    packageName: "@kne/global-context",
    component: component_9
}]
}]
    }
};
export default readmeConfig;
