import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

//redux
import { createStore } from 'redux';
type defState = {
  token: string | undefined;
};
type actions = {
  type: string;
  payload?: any;
};
const defState: defState = {
  token: ''
};
const reduser = (state = defState, action: actions): defState => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return { token: action.payload };
    default:
      return state;
  }
};
const store = createStore(reduser);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
