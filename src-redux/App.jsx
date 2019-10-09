/* 
  应用根组件
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as actions from './redux/actions'


export default class App extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  // 增加
  increment = () => {
    const number = this.refs.selectNumber.value * 1

    this.props.store.dispatch(actions.increment(number))
  }

  // 减少
  decrement = () => {
    const number = this.refs.selectNumber.value * 1
    this.props.store.dispatch(actions.decrement(number))
  }

  // 奇数增加
  incrementIfOdd = () => {
    const number = this.refs.selectNumber.value * 1

    if (this.props.store.getState() % 2 === 1) {
      this.props.store.dispatch(actions.increment(number))
    }
  }

  // 异步增加
  incrementAsync = () => {
    const number = this.refs.selectNumber.value * 1
    setTimeout(() => {
      this.props.store.dispatch(actions.increment(number))
    }, 1000);
  }



  render() {
    const count = this.props.store.getState()

    return (
      <div>
        <p>click {count} times</p>
        <select ref="selectNumber">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
