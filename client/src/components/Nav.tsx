import React, { Component, ChangeEvent } from "react";
import { Icon } from "@blueprintjs/core";
import { styled, theme } from "./Theme";
import { RouteComponentProps, withRouter } from "react-router";
import { H2, H3 } from "./Text";
import { Box } from "./Header";

interface WelcomeState {
  firstname: string;
}

const Align = styled.div`
  flex-direction: column;
  justify-content: center;
`;

class Welcome extends Component<RouteComponentProps, WelcomeState> {
  state = {
    firstname: ""
  };

  loadName = () => {
    const username = document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.setState({ firstname: username });
  };

  componentDidMount() {
    this.loadName();
  }

  signOut = async () => {
    await fetch(`/api/users/signout`);
    this.props.history.push(`/`);
  };
  profile = async (user: WelcomeState) => {
    this.props.history.push(`/profile`, this.state);
  };

  render() {
    return (
      <Box>
        <Align>
          <div>
            <H2 light>Olá {this.state.firstname}</H2>
            <H3 light>o que fará hoje?</H3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <div>
              <Icon
                style={{ color: theme.colors.base.lightest, flexGrow: 1 }}
                icon="person"
                onClick={() => this.profile(this.state)}
                iconSize={22}
              />
            </div>
            <div>
              <Icon
                onClick={this.signOut}
                style={{ color: theme.colors.base.lightest, flexGrow: 1 }}
                icon="log-out"
                iconSize={22}
              />
            </div>
          </div>
        </Align>
      </Box>
    );
  }
}

export default withRouter(Welcome);
