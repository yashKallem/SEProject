import './App.css';
import collaborate from './collaborate.png';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import SignIn from './components/SignIn/SignIn';
// import SignUp from './components/SignUp/SignUp';

function App() {
  const title = "Campus\nCollaborator";
  return (
    <div className="App">
      <header className="App-header">
        {title}
      </header>
      <div className="button-container">
        <button className="sign-in-button">Sign in</button>
        <button className="sign-up-button">Create an account</button>
      </div>
      <div className="img-container">
        <img src={collaborate}/>
      </div>
      {/* <Router>
          <Switch>
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </Router> */}
    </div>
  );
}

export default App;