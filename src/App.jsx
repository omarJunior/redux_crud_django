import './App.css';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect

} from 'react-router-dom'
import Usuario from './Components/Usuario';


function App({callback}) {
  return (
    <Router>
        <div className='container p-4 ml-5' ref={callback}>
          <Switch>
            <Route component={Usuario} path="/user" exact></Route>
            <Redirect to="/user"/>
          </Switch>
        </div>
      </Router>

  );
}

export default App;
