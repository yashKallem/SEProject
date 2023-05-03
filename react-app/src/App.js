import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Feed from './components/Feed/Feed';
import Profile from './components/Profile/Profile';
import Project from './components/Project/ProjectScreen';
import NavigationBar from './components/NavBar/NavBar';
import Users from './components/Users/Users';

function App() {
  return (
    <div className="App"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/feed' element={<Feed />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/project' element={<Project />} />
          <Route exact path='/users' element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;