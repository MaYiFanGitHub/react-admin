/* 
  应用根组件
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Counter extends Component {

  static propTypes = {
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
  }

  // 增加
  increment = () => {
    const number = this.refs.selectNumber.value * 1
    this.props.increment(number)
  }

  // 减少
  decrement = () => {
    const number = this.refs.selectNumber.value * 1
    this.props.decrement(number)
  }

  // 奇数增加
  incrementIfOdd = () => {
    const number = this.refs.selectNumber.value * 1

    if (this.props.count % 2 === 1) {
      this.props.increment(number)
    }
  }

  // 异步增加
  incrementAsync = () => {
    const number = this.refs.selectNumber.value * 1
    this.props.incrementAsync(number)
  }



  render() {
    const count = this.props.count

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
