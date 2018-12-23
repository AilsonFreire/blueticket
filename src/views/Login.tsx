import React from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/Input';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Text from '../components/Text';
import Button from '../components/Button';

import { validateEmail, validatePassword } from '../helpers/Validate'

const logo = require('../assets/images/logo.png');
const blueticket = require('../assets/images/blueticket.png')

class Login extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    state = {
        email: '',
        password: '',
        msgErrorEmail: '',
        msgErrorPassword: '',
        msgAlert: '',
        lock: true,
        alert: false
    }

    handleEmail = (email: string) => {
        const valid = validateEmail(email);
        if (valid) {
            this.setState({ email: email.toLowerCase(), msgErrorEmail: '' });
        } else {
            this.setState({ email: email.toLowerCase(), msgErrorEmail: 'Preencha um email válido' });
        }
    }

    handlePassword = (password: string) => {
        const valid = validatePassword(password);
        if (valid) {
            this.setState({ password, msgErrorPassword: '' });
        } else {
            this.setState({ password, msgErrorPassword: 'Senha deve ter no mínimo seis caracteres' })
        }
    }

    handleLock = () => {
        this.setState({ lock: !this.state.lock })
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

    login = () => {
        const { email, password, msgErrorEmail, msgErrorPassword } = this.state;
        if (email === '' || password ===  '') {
            this.setState({ alert: true, msgAlert: 'Preencha todos os campos' })
        } else if (msgErrorEmail !== '' || msgErrorPassword !== '') {
            this.setState({ alert: true, msgAlert: 'Preencha todos os campos corretamente' })
        } else {
            
        }
    }

    render() {
        const { email, password, msgErrorEmail, msgErrorPassword, lock } = this.state;
        return (
            <LinearGradient colors={['#FFF', '#014c85']}>
                <Card statusBarColor={'#FFF'}>
                    <CardSection addStyle={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Image source={logo} style={{ width: 66, height: 90 }} />
                        <Image source={blueticket} />
                        <Text
                            text='Bem-vindo! O seu show preferido está aqui'
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            onChangeText={(email) => this.handleEmail(email)}
                            value={email}
                            placeholder="E-mail:"
                            icon="email"
                            color="#006cb7"
                            keyboardType="email-address"
                        />
                    </CardSection>
                    {msgErrorEmail !== '' ?
                        <CardSection addStyle={{ paddingVertical: 0 }}>
                            <Text text={msgErrorEmail} />
                        </CardSection> : null
                    }
                    {this.showAlert()}
                    <CardSection>
                        <Input
                            onChangeText={(password) => this.handlePassword(password)}
                            value={password}
                            placeholder="Senha:"
                            icon={lock === true ? "lock" : "lock-open"}
                            color="#006cb7"
                            secureTextEntry={lock === true ? true : false}
                        />
                    </CardSection>
                    {msgErrorPassword !== '' ?
                        <CardSection addStyle={{ paddingVertical: 0 }}>
                            <Text text={msgErrorPassword} />
                        </CardSection> : null
                    }

                    {lock === true ?
                        <TouchableOpacity onPress={() => this.handleLock()}>
                            <CardSection>
                                <Text text="Visualizar senha" />
                            </CardSection>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => this.handleLock()}>
                            <CardSection>
                                <Text text="Ocultar senha" />
                            </CardSection>
                        </TouchableOpacity>
                    }
                    <CardSection>
                        <Button
                            onPress={() => this.login()}
                            text="Entrar"
                            styleText={{
                                fontSize: 16,
                                color: '#fff',
                                paddingTop: 10,
                                paddingBottom: 10,
                                alignSelf: 'center',
                                fontFamily: 'Ubuntu-Medium',
                            }}
                        />
                    </CardSection>
                </Card>
            </LinearGradient>
        )
    }
}

export default Login;
