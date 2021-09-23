import React, { Component } from 'react';
import './styles/app.css';
import ReactImage from './assets/react.png';
import Layout from './components/Layout';
import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:8080/api/'
export default class App extends Component {
  
  render() {
  return (
    <div>
      <Layout>
      </Layout>
    </div>
  )
  }
}
