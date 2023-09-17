import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes, // v6からSwitchからRoutesに
  Route,
  Link,
  RouteProps,
  useNavigate,
} from "react-router-dom";
import TaskPage from './pages/tasks';
import LoginPage from './pages/login';
import NotFoundPage from './pages/error';
import HelpPage from './pages/help';
import { useLogout, useUser } from './queries/AuthQuery';
import { useAuth } from './hooks/AuthContext';

import axios from 'axios';

const Router = () => {
  const logout = useLogout()
  const { isAuth, setIsAuth } = useAuth()
  const { isLoading, data: authUser } = useUser()

  // 初期表示に実行
  useEffect(() => {
    if (authUser) {
      setIsAuth(true)
    }
  }, [authUser])// authUser変数に変更があった時にUseEffectが実行

  // ログアウト状態の時は、ログインページへリダイレクトするためのルートを設定
  const GuardedTaskPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuth) {
        navigate('/login');
      }
    }, [isAuth, navigate]);

    return isAuth ? <TaskPage /> : null;
  }

  // ログイン状態の時は、トップページへリダイレクトするためのルートを設定
  const GuardedLoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuth) {
        navigate('/');
      }
    }, [isAuth, navigate]);

    return !isAuth ? <LoginPage /> : null;
  }

  const navigation = (
    <header className="global-head">
      <ul>
        <li><Link to="/">ホーム</Link></li>
        <li><Link to="/help">ヘルプ</Link></li>
        <li onClick={() => logout.mutate()}><span>ログアウト</span></li>
      </ul>
    </header>
  )

  const loginNavigation = (
    <header className="global-head">
      <ul>
        <li><Link to="/help">ヘルプ</Link></li>
        <li><Link to="/login">ログイン</Link></li>
      </ul>
    </header>
  )

  if (isLoading) return <div className='loader'></div>

  return (
    <BrowserRouter>
      { isAuth ? navigation: loginNavigation }
      <div>
        <Routes>
          // v6からelementを用いた書き方に変更
          // exactで完全一致でアクセスできるようにする
          <Route path="/" element={<GuardedTaskPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/login" element={<GuardedLoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;
