import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
    onPress: (() => void);
    text: string;
    addStyle?: object;
    styleText?: object;
}

export default (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress}
            style={[{
                flex: 1,
                padding: 5,
                elevation: 4,
                borderWidth: 2,
                borderRadius: 5,
                alignSelf: 'stretch',
                borderColor: '#2A4065',
                backgroundColor: '#2A4065',
            }, props.addStyle]}>
            <Text style={props.styleText}>{props.text}</Text>
        </TouchableOpacity>
    );
};
