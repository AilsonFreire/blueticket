import React from 'react';
import { View, Image } from 'react-native';

const headerLogo = require('../assets/images/logo_topo.png');

export default () => {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={headerLogo} style={{ width: 73.5, height: 37,  marginRight: 60  }} />
        </View>
    )
}