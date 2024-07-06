import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import {BrowserRouter, Routes} from 'react-router-dom';
import DataProvider from './context/DataProvider';
import Login from './Login';
import Home from './Home';
import Header from './Header';
import Chat from './Chat';
import Chats from './Chats';
function App() {
  return (
    <>
       <DataProvider>
        <BrowserRouter>
         <Header/>
        <div style={{marginTop:5}}>
            <Routes>
            <Route  path = '/login' element = {<Login/>}/>
              <Route  path = '/chat/:chatId' element = {<Chat/>}/>
              <Route  path = '/chats' element = {<Chats/>}/>
              </Routes>
          </div>
        </BrowserRouter>
     </DataProvider>
    </>
  );
}

export default App;
