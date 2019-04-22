import Signin from "../components/Signin";
import React from "react";
import { RouteComponentProps } from "react-router";

const SigninPage: React.FC<RouteComponentProps> = ({ history }) => (
  <Signin history={history} />
);

export default SigninPage;
