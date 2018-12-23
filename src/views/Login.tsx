import React from 'react';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/Input';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Text from '../components/Text'

const logo = require('../assets/images/logo.png');
const blueticket = require('../assets/images/blueticket.png')

class Login extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    handleName = (email: string) => {
        console.log(email)
    }

    render() {
        return (
            <LinearGradient colors={['#FFF', '#DDDDDD']}>
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
                            onChangeText={(email) => this.handleName(email)}
                            placeholder="E-mail:"
                            icon="email"
                            color="#006cb7"
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            onChangeText={(email) => this.handleName(email)}
                            placeholder="Senha:"
                            icon="lock"
                            color="#006cb7"
                            secureTextEntry
                        />
                    </CardSection>
                </Card>
            </LinearGradient>
        )
    }
}

export default Login;
