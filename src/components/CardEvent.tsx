import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import CardSection from './CardSection';
import Text from './Text'

type Props = {
    key: number,
    date: string,
    name: string,
    local: string,
    // descrption: string
}

export default (props: Props) => {
    return (
        <View
            key={props.key}
            style={{
                width: '100%',
                elevation: 8,
                marginVertical: 5,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: '#006cb7',
                alignItems: 'center'
            }}>

            <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 5 }}>
                <Text text="Nome do evento:" styleText={{ fontSize: 20, color: '#FFF' }} />
                <Text text={props.name} styleText={{ fontSize: 15, color: '#FFF' }} />
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 5 }}>
                <Text text="Local:" styleText={{ fontSize: 20, color: '#FFF' }} />
                <Text text={props.local} styleText={{ fontSize: 15, color: '#FFF' }} />
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 5 }}>
                <Text text="Data:" styleText={{ fontSize: 20, color: '#FFF' }} />
                <Text text={props.date} styleText={{ fontSize: 15, color: '#FFF' }} />
            </View>

        </View>
    );
}