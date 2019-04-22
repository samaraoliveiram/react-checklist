import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IonApp, IonPage } from "@ionic/react";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import withAuth from "./components/WithAuth";
import { theme, ThemeProvider } from "./components/Theme";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <IonApp>
              <IonPage>
                <Switch>
                  <Route path="/signin" component={Signin} />
                  <Route path="/signup" component={Signup} />
                  {/* <Route path="/secret" component={withAuth(Secret)} /> */}
                  <Route path="/" component={Home} />
                </Switch>
              </IonPage>
            </IonApp>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
