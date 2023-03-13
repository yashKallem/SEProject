import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NavigationBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
        <Route exact path='/' element={<Home />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;