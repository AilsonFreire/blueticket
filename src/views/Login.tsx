import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../components/Input';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

class Login extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    handleName = (email) => {
        console.log(email)
    }

    render = () => {
        return (
            <Card>
                <CardSection>
                    <Input
                        onChangeText={(email) => this.handleName(email)}
                        placeholder="E-mail:"
                        icon="email"
                    />
                </CardSection>
            </Card>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    root: {

    }
})