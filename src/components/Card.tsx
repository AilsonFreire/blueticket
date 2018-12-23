import React from 'react';
import { View, StatusBar } from 'react-native';

type Props = {
    addStyle?: object,
    children?: any,
    statusBarColor?: string  
} 

export default (props: Props) => {
  return (
    <View style={[{
        paddingTop: 10,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }, props.addStyle
    ]}>
      <StatusBar
        backgroundColor={props.statusBarColor}
        barStyle="light-content"
      />
      {props.children}
    </View>
  );
};
