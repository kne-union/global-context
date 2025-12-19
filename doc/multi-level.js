const {Global, useGlobalValue, useContext} = globalContext;

const ChildrenComponent = ({children}) => {
    const value = useGlobalValue('a');
    const value2 = useGlobalValue('b');
    console.log('ChildrenComponent render');
    return <div>
        context value.a: {value}
        <Global initValue={{a: value, b: value2}}>
            {children}
        </Global>
    </div>;
};

const SetGlobal = () => {
    const {setGlobal} = useContext();
    return <button onClick={() => {
        setGlobal(global => {
            return Object.assign({}, global, {a: global.a + 1});
        })
    }}>a + 1</button>
};

const BaseExample = () => {
    return <>
        <ChildrenComponent/>
        <Global initValue={{a: 1, b: 2}}>
            <ChildrenComponent>
                <ChildrenComponent/>
                <SetGlobal/>
            </ChildrenComponent>
            <SetGlobal/>
            <Global initValue={{a: 10, b: 20}}>
                <ChildrenComponent>
                    <ChildrenComponent/>
                    <SetGlobal/>
                </ChildrenComponent>
                <SetGlobal/>
            </Global>
        </Global>
    </>;
};

render(<BaseExample/>);
