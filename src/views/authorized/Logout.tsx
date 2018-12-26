import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { onSignout } from '../../Auth';

import HeaderLogo from '../../components/HeaderLogo';
import Card from '../../components/Card';
import CardSection from '../../components/CardSection';
import Text from '../../components/Text';
import Button from '../../components/Button';

class Logout extends React.PureComponent {
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

    render() {
        return (
            <Card>
                <CardSection>
                    <Text text='Voce tem certeza que quer sair?' />
                </CardSection>
                <CardSection>
                    <Button
                        text='SAIR'
                        styleText={{
                            fontSize: 16,
                            color: '#fff',
                            paddingTop: 10,
                            paddingBottom: 10,
                            alignSelf: 'center',
                            fontFamily: 'Ubuntu-Medium',
                        }}
                        onPress={() => onSignout().then(() => this.props.navigation.navigate('SignedOut'))}
                    />
                </CardSection>
            </Card>
        )
    }
}

export default Logout;