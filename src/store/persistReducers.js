// no caso do React Js, ele vai usar o localStorage
// se fosse no react native ele utilizaria o asyncStorage
import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      // pode-se colocar o nome da aplicacao, assim nao vai compartilhar o estado com outras coisas do storage
      // seria em casos de varios aplicacoes rolando no mesmo endereco "localhost:3000"
      key: 'gympoint',
      storage, // eh o storage importado anteriormente
      // nome dos reducers que precisam armazenar informacoes
      // os reducers nao incluidos aqui, nao terao as informacoes persistidas
      whitelist: ['auth','user'],
    },
    reducers // eh o parametro com os reducers recebidos em export default
  );

  return persistedReducer;
};
