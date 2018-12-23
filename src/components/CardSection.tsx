import React from 'react';
import { View } from 'react-native';

type Props = {
    addStyle?: object,
    children?: any
}
export default (props: Props) => {
    return (
        <View style={[{
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center',
        }, props.addStyle
        ]}
        >
            {props.children}
        </View>
    );
};
