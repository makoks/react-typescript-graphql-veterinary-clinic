import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import './App.css';

import Home from './components/home';
import Create from './components/create';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>Best Friend - Veterinary Clinic</Header>
      <Content>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </Router>
      </Content>
    </Layout>
  );
}

export default App;
