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
