import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import { connect } from 'react-redux'


import './admin.less'
import LeftNav from '../../components/leftnav'
import AdminHeader from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const { Footer, Sider, Content } = Layout;

class Admin extends Component {

  render() {
    // 判断当前用户是否已经登录
    if (!this.props.user._id) {
      this.props.history.replace('/login')
      return null
    }
    
    return (
      <div className="admin">
        <Layout>
          <Sider>
            <LeftNav></LeftNav>
          </Sider>
          <Layout>
            <AdminHeader></AdminHeader>
            <Content style={{ margin: 15, backgroundColor: '#fff', marginBottom: 0 }} >
              <Switch>
                <Route path="/home" component={Home} />
                <Route path='/category' component={Category} />
                <Route path='/product' component={Product} />
                <Route path='/role' component={Role} />
                <Route path='/user' component={User} />
                <Route path='/charts/bar' component={Bar} />
                <Route path='/charts/line' component={Line} />
                <Route path='/charts/pie' component={Pie} />
                <Redirect to="/home"></Redirect>
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>推荐使用谷歌浏览器进行访问</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}


export default connect(
  state => ({
    user: state.user
  }),
  {}
)(Admin)