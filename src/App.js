import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';
import RequireAuth from './components/RequireAuth/RequireAuth'
import Register from './components/Register/Register';
import AddTask from './components/AddTask/AddTask'
import Header from './components/Header/Header';
function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<RequireAuth><Home></Home></RequireAuth>}>

        </Route>
        <Route path='/addtasks' element={<RequireAuth><AddTask></AddTask></RequireAuth>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>

    </>
  );
}

export default App;
