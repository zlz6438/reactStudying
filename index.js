import React from 'react';
import ReactDOM from 'react-dom';
import { App, CounterProvider} from './App';


ReactDOM.render(
    // 提供共享的数据
    <CounterProvider>
        <App />
    </CounterProvider>
        , 
    document.getElementById('root'));
