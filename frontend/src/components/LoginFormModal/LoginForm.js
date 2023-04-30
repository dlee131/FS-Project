import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage({demoLogin}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
    <div id="login-signup">
      Log in or sign up
    </div>
      <div id="border-line"></div>
      <h1 id="welcome-text">Welcome to Melobnb</h1>
      <div className="input-container">
      <label id="username">
        <input
          className="placeholder-input"
          type="username"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder="Username/Email"
          required
        />
      </label>
      <label id="password">
        <input
          className="placeholder-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>
        <div className='login-div'>
          <button type="submit" className="login-button" style={{ textDecoration: "none" }}>
            <div id="login-text">
            Log In
            </div>
            </button>
          <button type="submit" className="demo=login" style={{ textDecoration: "none" }}>
            <div id="demo-login-text">
              Demo Login
            </div>
          </button>
        </div>
      </div>
      
  </form>
  );
}

export default LoginFormPage;