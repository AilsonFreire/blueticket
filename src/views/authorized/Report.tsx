import React from 'react';
import { View, ScrollView, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

import Card from '../../components/Card';
import HeaderLogo from '../../components/HeaderLogo';
import Loading from '../../components/Loading';
import CardReport from '../../components/CardReport';

class Report extends React.PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { goBack } = navigation;
        return {
            headerTitle: (
                <HeaderLogo />
            ),
            headerLeft: (
                <TouchableOpacity
                    style={{ paddingVertical: 20, paddingLeft: 10 }}
                    onPress={() => goBack()}
                >
                    <Icon
                        size={25}
                        name="arrow-left"
                        color="#2a4065"
                    />
                </TouchableOpacity>
            ),
        };
    };

    state = {
        loading: true,
        alert: false,
        msgAlert: '',
        report: null
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const event_id = navigation.getParam('event_id', 'NO-ID');

        let response: object;

        try {
            const pdv = JSON.parse(await AsyncStorage.getItem('@Blueticket:pdv'));
            try {
                response = await api.get(`/test/reports/daily/${pdv[0].codigo_ponto_venda}/${event_id}/1`);
                this.setState({ report: response.data, loading: false });
            } catch (error) {
                this.setState({ alert: true, msgAlert: 'Não foi possível conectar com o servidor, tente novamente!', loading: false });
                this.props.navigation.navigate('Home');
            }
        } catch (error) {
            this.setState({ alert: true, msgAlert: 'Não foi possível conectar com o servidor, tente novamente!', loading: false });
            this.props.navigation.navigate('Home');
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

    renderReport = () => {
        const { report } = this.state;
        if (report !== null) {
            const { labels, chartData, tickets, revenue } = report;
            if (labels.length > 0 && chartData.length > 0) {
                return (
                    <CardReport
                        labels={labels}
                        chartData={chartData}
                        tickets={tickets}
                        revenue={revenue}
                    />
                );
            }
        }
    }

    render() {
        return (
            <Card addStyle={{ justifyContent: 'flex-start', paddingHorizontal: 10 }}>
                {this.showSpinner()}
                <ScrollView style={{ width: '100%' }}>
                    {this.renderReport()}
                </ScrollView>
                {this.showAlert()}
            </Card>
        )
    }
}

export default Report;