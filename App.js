import React, {Component, createContext} from 'react';

// console.log(createContext())
//createContext这个方法的结果是一个对象, 里面有Provider和Consumer
//Provider 用于提供状态
//Cconsumer 用于接收状态
const {
    Provider,
    Consumer: CounterConsumer   //解构出来的值重新赋值给CounterConsumer组件
} = createContext();

// Provider 里的东西就可以通过Consumer 共享了
//封装一个基本的Provider, 直接使用Provider不方便管理状态
class CounterProvider extends Component{
    constructor(){
        super()
        //这里的state状态就是共享的, 任何Procider的后代组件都可以通过CounterConsumer来接收这个值
        this.state = {
            count: 100,
        }
    }
    //这里的方法也会通过Provider的value属性共享下去
    increse = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    decrese = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

    render(){
        return (
            // value属性可以传递任何的数据, 一般是一个对象
            <Provider value={{
                count: this.state.count,
                onIncreaseCount: this.increse,
                onDecreaseCount: this.decrese
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

class Counter extends Component {
    render(){
        return (
            //CounterConsumer组件来接收count
            <CounterConsumer>
                {/* CounterConsumer组件的children必须是函数, 函数的参数可以接收到Provider组件的value值 */}
                {   
                    // 把value 里的值解构出来
                    ({count}) => {
                        // console.log(arg)
                        return <span>{count}</span>
                    }
                }
            </CounterConsumer>
        )
    }
}

class CountBtn extends Component {
    render(){
        return (
            <CounterConsumer>
                {
                    ({ onIncreaseCount, onDecreaseCount }) => {
                        const handler = this.props.type === 'increse' ? onIncreaseCount : onDecreaseCount

                        return (
                            <button onClick={handler}>{this.props.children}</button>
                        )
                    }
                }
            </CounterConsumer>
        )
    }
}

function App() {
  return (
    <>
        <CountBtn type="decrese">-</CountBtn>
        <Counter />
        <CountBtn type="increse">+</CountBtn>
    </>
  );
}

export { 
    App, 
    CounterProvider
};
