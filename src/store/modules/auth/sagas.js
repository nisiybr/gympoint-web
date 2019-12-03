import api from '~/services/api';
import { all , takeLatest , call, put } from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {signFailure, signInSuccess} from './actions';
import history from '~/services/history';



export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, 'sessions' , {
      email,
      password,
    });
    const {user, token} = response.data;


    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(user,token));

    history.push('/students');
  } catch(err) {
    toast.error('Falha na autenticação, verifique seus dados.');
    yield put(signFailure());
  }
}
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    // Se deu certo, seta as informacoes que vao ser utilizadas em todas as requisicoes
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
export function signOut(){
  history.push('/');
}



export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST',signIn),
  takeLatest('@auth/SIGN_OUT',signOut),
])
