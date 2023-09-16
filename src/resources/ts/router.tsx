import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes, // v6からSwitchからRoutesに
  Route,
  Link,
  RouteProps,
  Redirect,
  // useNavigate,
} from "react-router-dom";
import TaskPage from './pages/tasks';
import LoginPage from './pages/login';
import HelpPage from './pages/help';
import { useLogout, useUser } from './queries/AuthQuery';
import { useAuth } from './hooks/AuthContext';

import axios from 'axios';

const Router = () => {
  const logout = useLogout()
  const { isAuth, setIsAuth } = useAuth()
  const { isLoading, data: authUser } = useUser()
  const navigate = useNavigate();

  // 初期表示に実行
  useEffect(() => {
    if (authUser) {
      setIsAuth(true)
    }
  }, [authUser])// authUser変数に変更があった時にUseEffectが実行

  // ログインしていない時はログインページへリダイレクトするためのルートを設定
  const GuardRoute = (props: RouteProps) => {
    // toに遷移先のページを指定
    // if (!isAuth) {
    //   navigate('/login')
    //   return null
    // }
     return <Redirect to="/login" />
    return <Route {...props} />
  }

  // ログイン状態でログインページへアクセス時に、トップページへリダイレクトするためのルートを設定
  const LoginRoute = (props: RouteProps) => {
    // toに遷移先のページを指定
    if (isAuth) return <Redirect to="/" />
    // if (isAuth) {
    //   navigate('/');
    //   return null;
    // }
    return <Route {...props} />
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

  return (
    <BrowserRouter>
      { isAuth ? navigation: loginNavigation }
      <div>
        <Routes>
          // v6からelementを用いた書き方に変更
          // exactで完全一致でアクセスできるようにする
          <GuardRoute exact path='/' element={<TaskPage />} />
          <Route path='/help' element={<HelpPage />} />
          <LoginRoute path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;
