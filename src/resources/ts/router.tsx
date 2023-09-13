import React from 'react';
import {
  BrowserRouter,
  Routes, // v6からSwitchからRoutesに
  Route,
  Link
} from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          // v6からelementを用いた書き方に変更
          <Route path='/about' element={<h2>About</h2>} />
          <Route path='/users' element={<Users/>} />
          <Route path='/' element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}