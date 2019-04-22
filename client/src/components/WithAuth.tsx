import React, { Component, ComponentClass, SFC } from "react";
import { Redirect } from "react-router-dom";

interface State {
  loading: boolean;
  redirect: boolean;
}

export default function withAuth(ComponentToProtect: ComponentClass | SFC) {
  return class extends Component<any, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        loading: true,
        redirect: false
      };
    }
    componentDidMount() {
      fetch("/api/users/checkToken")
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.statusText);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/signin" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}
