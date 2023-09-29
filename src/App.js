import { useEffect, useState } from 'react';
import './App.css';
import Slidebar from './Slidebar';
import Chat from './Chat';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from "./Login";
import {useStateValue} from './StateProvider';
function App() {

const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
 
    {!user ?(
        <Login/>
    ):(
      <div className="app__body">
    
      <Router>

         <Slidebar></Slidebar>

         <Switch>
          <Route  path="/room/:roomId">
          <Chat></Chat>
          </Route>
          <Route  path="/">
          <Chat></Chat>
          </Route>
        </Switch>
      </Router>

   
     </div>


    )}

</div>
   
  );

}


export default App;

