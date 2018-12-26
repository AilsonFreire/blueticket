import React from 'react';
import { TouchableOpacity, Alert, AsyncStorage, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

import { onSignout } from '../../Auth';

import Card from '../../components/Card';
import CardEvent from '../../components/CardEvent';
import HeaderLogo from '../../components/HeaderLogo';
import Loading from '../../components/Loading';
import Text from '../../components/Text';

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
        events: [],
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
                await AsyncStorage.multiSet([
                    ['@Blueticket:pdv', JSON.stringify(pdv)],
                    ['@Blueticket:pos', JSON.stringify(pos)]
                ]);
                this.getEvents();
            } catch (error) {
                this.setState({ alert: true, msgAlert: 'Não foi possível conectar com o servidor, tente novamente!', loading: false });
                await onSignout().then(() => this.props.navigation.navigate('SignedOut'))
            }
        } catch (error) {
            this.setState({ alert: true, msgAlert: 'Não foi possível conectar com o servidor, tente novamente!', loading: false });
            await onSignout().then(() => this.props.navigation.navigate('SignedOut'))
        }
    }

    getEvents = async () => {
        let response: object;
        try {
            response = await api.get('/test/events/list');
            this.setState({ events: response.data, loading: false })
        } catch (error) {
            this.setState({ alert: true, msgAlert: 'Não foi possível conectar com o servidor, tente novamente!', loading: false });
            await onSignout().then(() => this.props.navigation.navigate('SignedOut'));
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

    renderEvents = () => {
        const { events } = this.state;
        if (events.length > 0) {
            return (
                events.map((event: object) => {
                    const date = new Date(event.data * 1000);
                    const description = event.descricao.replace(/[^\r\n\w\s]/gi, '')
                    return (
                        <CardEvent
                            key={event.codigo}
                            name={event.nome}
                            local={event.local}
                            date={date.toDateString()}
                            descrption={description}
                            onPress={() => this.props.navigation.navigate('Report', { event_id: event.codigo })}
                        />
                    )
                })
            )
        }
    }

    render() {
        return (
            <Card addStyle={{ justifyContent: 'flex-start', paddingHorizontal: 10 }}>
                <Text text="EVENTOS" styleText={{ fontSize: 20 }} />
                {this.showSpinner()}
                <ScrollView style={{ width: '100%' }}>
                    {this.renderEvents()}
                </ScrollView>
                {this.showAlert()}
            </Card>
        )
    }
}

export default Home;