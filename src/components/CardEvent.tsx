import React from 'react';
import { View, TextInput } from 'react-native';
import Button from './Button';
import Text from './Text'

type Props = {
    key: number,
    date: string,
    name: string,
    local: string,
    descrption: string,
    onPress: (() => void)
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

            <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 5 }}>
                <Text text="Decrição:" styleText={{ fontSize: 20, color: '#FFF' }} />
                <TextInput value={props.descrption} style={{
                    fontSize: 14,
                    paddingLeft: 20,
                    paddingRight: 20,
                    color: '#FFF',
                    fontFamily: 'Ubuntu-Regular',
                }}
                    multiline
                />
            </View>

            <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                <Button
                    addStyle={{ flex: 0 }}
                    onPress={props.onPress}
                    text="RELATÓRIO"
                    styleText={{
                        fontSize: 16,
                        color: '#fff',
                        paddingTop: 10,
                        paddingBottom: 10,
                        alignSelf: 'center',
                        fontFamily: 'Ubuntu-Medium',
                    }}
                />
            </View>

        </View>
    );
}