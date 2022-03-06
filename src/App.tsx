import React from 'react';
import Authorization from './components/authorization/Authorization';
import Registration from './components/registration/Registration';
import MainForm from './components/todo/MainForm';
import RegistrOrAuth from './components/RegistrOrAuth';
import { getCookie } from './service/getCookie';
import { useState, useEffect, useContext } from 'react';
import { TokenContext } from './service/context';
//@ts-ignore
import { API } from './API/API';
import { url } from './service/index';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
const api = new API(url);
const App = () => {
  const dispatch = useDispatch();

  const token: string | undefined = useSelector((state: RootStateOrAny) => state.token);
  const catchToken = () => {
    const text = getCookie('token');

    dispatch({ type: 'ADD_TOKEN', payload: text });
  };

  useEffect(() => {
    catchToken();
  }, []);

  if (token === 'Invalid token' || token === '' || token === undefined || token === 'error') {
    catchToken();

    return <RegistrOrAuth />;
  } else if (token === 'registration') {
    return <Registration />;
  } else if (token === 'authorization') {
    return <Authorization token={token} />;
  } else {
    catchToken();
    return <MainForm />;
  }
};

export default App;
