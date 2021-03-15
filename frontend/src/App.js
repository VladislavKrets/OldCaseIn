import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Route, Switch} from "react-router";
import Auth from "./panels/Auth";

class App extends React.Component{
  render() {
    return (
        <Switch>
            <Route exact path='/auth'>
                <Auth/>
            </Route>
        </Switch>
    );
  }
}

export default App;
