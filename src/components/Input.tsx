import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
    onChangeText: ((text: string) => void);
    onBlur?: (() => void);
    placeholder?: string;
    secureTextEntry?: boolean;
    value?: string;
    editable?: boolean;
    keyboardType?: any | "default",
    maxLength?: number,
    addViewStyle?: object, 
    addStyle?: object,
    icon?: any,
    color?: string
}

export default (props: Props) => {
    return (
        <View style={[{
            flex: 1,
            padding: 5,
            elevation: 8,
            borderRadius: 5,
            borderColor: '#FFF',
            flexDirection: 'row',
            backgroundColor: '#FFF'
            }, props.addViewStyle ]}>
            <TextInput
                value={props.value}
                editable={props.editable}
                autoCorrect={false}
                placeholder={props.placeholder}
                onBlur={props.onBlur}
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType}
                underlineColorAndroid='transparent'
                secureTextEntry={props.secureTextEntry}
                style={[
                    {
                        flex: 5,
                        fontSize: 14,
                        paddingLeft: 20,
                        paddingRight: 20,
                        color: '#2D2D2D',
                        fontFamily: 'Ubuntu-Regular',
                    }, props.addStyle]}
            />
            <View
                style={{
                    flex: 1,
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFF',
                }}
            >
                <Icon
                    name={props.icon}
                    color={props.color}
                    size={25}
                />
            </View>
        </View>
    );
};

