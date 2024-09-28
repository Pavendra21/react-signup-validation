import './App.css';
 import ExcelList from './Components/ExcelList';
import Home from './Components/Home';
import List from './Components/List';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
 import Signup from './Components/Signup';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Edit from './Components/Edit';

function App() {
  return (
    <> <Router>
      <div className="App ">
        <Navbar />
        <Routes>

          <Route path='/' element={<Signup />} />
          {/* <Route path='/register' element={<Signup />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<  Home />} />
          <Route path='/excellist' element={<ExcelList />} />
          <Route path='/excellist/list/:index' element={<List />} />
          <Route path='/user/:index' element={<Edit />} />


        </Routes>



      </div>

    </Router>
    </>
  );
}

export default App;
