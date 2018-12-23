import React from 'react';
import { Text } from 'react-native';

type Props = {
    text: string,
    styleText?: object
}

export default (props: Props) => {
    return (<Text style={props.styleText}>{props.text}</Text>)
}