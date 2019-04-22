import Signup from "../components/Signup";
import React from "react";
import { RouteComponentProps } from "react-router";

const SignupPage: React.FC<RouteComponentProps> = ({ history }) => (
  <Signup history={history} />
);

export default SignupPage;
