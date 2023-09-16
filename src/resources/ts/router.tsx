import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes, // v6からSwitchからRoutesに
  Route,
  Link
} from "react-router-dom";
import TaskPage from './pages/tasks';
import LoginPage from './pages/login';
import HelpPage from './pages/help';

import axios from 'axios';

const Router = () => {

  useEffect(() => {
    axios.post('/api/login', {
      email: 'yamada@example.com',
      password: '12345678',
    }).then(response => {
      console.log(response)
    });
  }, [])

  return (
    <BrowserRouter>
      <div>
        <header className="global-head">
          <ul>
            <li><Link to="/">ホーム</Link></li>
            <li><Link to="/help">ヘルプ</Link></li>
            <li><Link to="/login">ログイン</Link></li>
            <li><span>ログアウト</span></li>
          </ul>
        </header>
        <Routes>
          // v6からelementを用いた書き方に変更
          <Route path='/' element={<TaskPage />} />
          <Route path='/help' element={<HelpPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;
