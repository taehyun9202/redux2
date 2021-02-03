import React, { useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/ItemModal'
import Register from './components/Register'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
      <div className="app">
        <AppNavbar />
        <ItemModal />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;

