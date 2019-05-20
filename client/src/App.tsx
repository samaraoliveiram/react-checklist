import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IonApp, IonPage } from "@ionic/react";
import withAuth from "./components/WithAuth";
import { theme, ThemeProvider } from "./components/Theme";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Lists from "./pages/Lists";
import Todos from "./pages/Todos";
import NewTodo from "./pages/NewTodo";
import EditList from "./pages/EditList";
import CreateListPage from "./pages/CreateList";
import EditTodo from "./pages/EditTodo";

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
                  <Route path="/todo/:id/edit" component={withAuth(EditTodo)} />
                  <Route
                    path="/lists/:id/todo/create"
                    component={withAuth(NewTodo)}
                  />
                  <Route
                    path="/lists/create"
                    component={withAuth(CreateListPage)}
                  />
                  <Route
                    path="/lists/:id/edit"
                    component={withAuth(EditList)}
                  />
                  <Route path="/lists/:id" component={withAuth(Todos)} />
                  <Route path="/lists" component={withAuth(Lists)} />
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
