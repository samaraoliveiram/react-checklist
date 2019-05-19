import React, { Component, ChangeEvent } from "react";
import { History } from "history";
import { H2 as MH2 } from "@blueprintjs/core";
import { styled, theme } from "../components/Theme";
interface WelcomeState {
  name: string;
}

const Box = styled.div`
  height: 20vh;
  background-color: ${theme.colors.base.dark};
  box-shadow: 2px 2px 5px ${theme.colors.base.shadow};
  padding: ${theme.sizes.sm};
`;

const H2 = styled(MH2)`
  color: ${theme.colors.secondary.green};
`;

export default class Welcome extends Component<{}, WelcomeState> {
  state = {
    name: ""
  };

  loadName = async () => {
    const me = await fetch("/api/users/me").then(r => r.json());
    this.setState({ name: me.firstname });
  };

  componentDidMount() {
    this.loadName();
  }

  render() {
    return (
      <Box>
        <H2>Olá {this.state.name}, o que fará hoje? </H2>
      </Box>
    );
  }
}
