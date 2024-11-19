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
