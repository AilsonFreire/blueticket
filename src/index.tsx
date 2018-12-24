import React from 'react';
import { AsyncStorage } from 'react-native';
import { UnauthorizedScreens, AuthorizedScreens } from "./Router";

export default class App extends React.PureComponent {
  state = {
    login: false
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@Blueticket:token');
    if (token) {
      this.setState({ login: true });
    } else {
      this.setState({ login: false });
    }
  }

  render() {
    const { login } = this.state;
    return (
      login === false ? <UnauthorizedScreens /> : <AuthorizedScreens />
    );
  }
}
