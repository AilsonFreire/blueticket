import React from 'react';
import { createRootNavigator } from "./Router";
import { isSignedIn } from "./Auth";

class App extends React.Component {
  state = {
    signedIn: false,
    checkedSignIn: false
  }

  async componentDidMount() {
    isSignedIn()
      .then((res: any) => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch((err: any) => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}

export default App;