import React from 'react';
import { TouchableOpacity, Alert, AsyncStorage, ScrollView, View } from 'react-native';
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
        totalRevenue: '',
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
            this.fetchDetailEvent();
        } catch (error) {
            this.setState({ alert: true, msgAlert: 'Não foi possível conectar com o servidor, tente novamente!', loading: false });
            await onSignout().then(() => this.props.navigation.navigate('SignedOut'));
        }
    }

    fetchDetailEvent = async () => {
        const { events } = this.state;
        if(events.length > 0) {
            let response: object;
            events.map(async event => {
                try {
                    const pdv = JSON.parse(await AsyncStorage.getItem('@Blueticket:pdv'));
                    try {
                        response = await api.get(`/test/reports/daily/${pdv[0].codigo_ponto_venda}/${event.codigo}/1`);
                        this.setState({ totalRevenue: this.state.totalRevenue + response.data.revenue });
                    } catch (error) {
                        this.setState({ alert: true, msgAlert: 'Não foi possível conectar com o servidor, tente novamente!', loading: false });
                        this.props.navigation.navigate('Home');
                    }
                } catch (error) {
                    this.setState({ alert: true, msgAlert: 'Não foi possível conectar com o servidor, tente novamente!', loading: false });
                    this.props.navigation.navigate('Home');
                }
            })
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
                <View style={{ padding: 15,   backgroundColor: '#006cb7', borderRadius: 10,  width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text text={'Total: '} styleText={{ fontSize: 20, color: '#FFFF'}} />
                    <Text text={`${this.state.totalRevenue}`} styleText={{ fontSize: 20, color: '#FFFF'}} />
                </View>
            </Card>
        )
    }
}

export default Home;