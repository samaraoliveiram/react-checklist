import Login from "../components/Login";
import React from "react";

const LoginPage: React.FC<{ history: any }> = ({ history }) => (
  <Login history={history} />
);

export default LoginPage;