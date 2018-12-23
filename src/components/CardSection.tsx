import React from 'react';
import { View } from 'react-native';

type Props = {
    styleSection?: object,
    children?: any
}
export default (props: Props) => {
    return (
        <View style={[{
            paddingTop: 10,
            paddingHorizontal: 20,
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'center',
        }, props.styleSection
        ]}
        >
            {props.children}
        </View>
    );
};
