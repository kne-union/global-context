import {createContext, useContext} from 'react';

export const context = createContext({});

export const {Provider, Consumer} = context;

export const useGlobalContext = () => {
    return useContext(context);
};

export default context;
