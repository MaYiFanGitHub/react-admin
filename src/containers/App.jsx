import { connect } from 'react-redux'

import { increment, decrement, incrementAsync } from '../redux/actions'
import Counter from '../components/counter'

const mapStateToProps = (state) => {
  return {
    count: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (number) => ({ type: "increment", number: number }),
    decrement: (number) => dispatch(decrement(number)),
  }
}

// 生成并返回容器组件
/* export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter) */


// 简写方式
export default connect(
  state => ({ count: state }),
  {
    increment,
    decrement,
    incrementAsync
  }
)(Counter)

/* 
  1. mapStateToProps
    1.1 mapStateToProps是一个函数。它的作用是建立一个从外部state对象到 UI 组件的props对象的映射关系。执行后返回一个对象，里面的每一个键值对就是一个映射。
    1.2 mapStateToProps会订阅（绑定） Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
    1.3 mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。

  2. mapDispatchToProps 
    2.1 如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。从下面代码可以看到，mapDispatchToProps作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。

    const mapDispatchToProps = (dispatch, ownProps) => {
      return {
        increment: (number) => dispatch(increment(number)),
        decrement: (number) => dispatch(decrement(number)),
      }
    }

    2.2 如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出。
*/