import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IonApp, IonPage } from "@ionic/react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import withAuth from "./components/WithAuth";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <IonApp>
            <IonPage>
              <Switch>
                <Route path="/login" component={Login} />
                {/* <Route path="/secret" component={withAuth(Secret)} /> */}
                <Route path="/" component={Home} />
              </Switch>
            </IonPage>
          </IonApp>
        </div>
      </Router>
    );
  }
}

export default App;
