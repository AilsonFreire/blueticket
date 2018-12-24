import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderLogo from '../../components/HeaderLogo';

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
                    // onPress={() => navigate('DrawerOpen')}
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

    render() {
        return (
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}

export default Home;