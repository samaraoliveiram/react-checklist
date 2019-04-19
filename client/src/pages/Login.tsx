import Login from "../components/Login";
import React from "react";
import { RouteComponentProps } from "react-router";

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => (
  <Login history={history} />
);

export default LoginPage;