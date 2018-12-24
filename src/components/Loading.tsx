import React from 'react';
import { View, Image } from 'react-native';
import Spinner from 'react-native-spinkit';

const logo = require('../assets/images/logo.png')


export default () => {
    return (
        <View
            style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                flex: 1,
                zIndex: 10,
                elevation: 8,
                position: 'absolute',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Spinner style={{ marginBottom: 50 }} isVisible size={120} type={'ChasingDots'} color={"#002a53"} />
            </View>
        </View>
    );
}