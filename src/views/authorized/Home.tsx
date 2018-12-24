import React from 'react';
import { View, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

import { onSignout } from '../../Auth';

import HeaderLogo from '../../components/HeaderLogo';
import Loading from '../../components/Loading';

class Home extends React.PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation;
        return {
            headerTitle: (
                <HeaderLogo />
            ),
            headerLeft: (
                <TouchableOpacity
                    style={{ paddingVertical: 20, paddingLeft: 10 }}
                    onPress={() => navigate('Logout')}
                >
                    <Icon
                        size={25}
                        name="logout"
                        color="#2a4065"
                    />
                </TouchableOpacity>
            ),
        };
    };

    state = {
        loading: true,
        alert: false,
        msgAlert: ''
    }

    async componentDidMount() {
        let response: object;
        try {
            response = await api.get('/auth/me');
            const { pdv, pos } = response.data;
            try {
                AsyncStorage.multiSet([
                    '@Blueticket:pdv', pdv,
                    '@Blueticket:pos', pos
                ]);
                this.setState({ loading: false })
            } catch (error) {
                this.setState({ alert: true, msgAlert: 'Não foi possível conectar com o servidor, tente novamente!', loading: false });
                await onSignout().then(() => this.props.navigation.navigate('SignedOut'))
            }
        } catch (error) {
            this.setState({ alert: true, msgAlert: 'Não foi possível conectar com o servidor, tente novamente!', loading: false });
            await onSignout().then(() => this.props.navigation.navigate('SignedOut'))
        }
    }

    showSpinner = () => {
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
    }

    showAlert = () => {
        if (this.state.alert) {
            return (
                Alert.alert(
                    'Blueticket',
                    `${this.state.msgAlert}`,
                    [
                        { text: 'OK', onPress: () => this.setState({ alert: false, msgAlert: '' }) },
                    ],
                    { cancelable: false }
                )
            )
        }
    }

    render() {
        return (
            <View>
                <Text>Home</Text>
                {this.showSpinner()}
                {this.showAlert()}
            </View>
        )
    }
}

export default Home;