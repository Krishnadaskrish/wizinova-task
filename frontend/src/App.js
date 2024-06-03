import {Route,Routes} from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import GetPost from './pages/GetPost';
import BulkEmailUploader from './pages/BulkMail';

import axios from 'axios'; 
import env from "react-dotenv"

export const Axios = axios.create({
  baseURL : process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type":"application/json",
    Authorization:  `Bearer ${localStorage.getItem("token")}`,
  }

})
function App() {
  return (
    <div className="App">
    <Toaster />
      <Routes>
              <Route path = '/' element = {<Registration/>}/>
              <Route path = '/login' element = {<Login/>}/>
              <Route path = '/home' element = {<Home/>}/>
              <Route path = '/forgot' element = {<ForgotPassword/>}/>
              <Route path = '/getpost' element = {<GetPost/>}/>
              <Route path = '/Bulkmail' element = {<BulkEmailUploader/>}/>

      </Routes>
    </div>
  );
}

export default App;
