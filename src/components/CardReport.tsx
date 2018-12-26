import React from 'react';
import { View } from 'react-native';
import Text from './Text';

type Props = {
    labels: Array<string>,
    chartData: Array<string>,
    tickets: string,
    revenue: string
}

export default (props: Props) => {

    function renderDailyData() {
        if (props.labels.length !== 0 && props.chartData.length !== 0) {
            for (let i = 0; i <= props.labels.length; i++) {
                for (let j = 0; j <= props.chartData.length; j++) {
                    return (
                        <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 5 }}>
                            <Text text={`Receita do dia : ${props.labels[i]}`} styleText={{ fontSize: 20, color: '#FFF' }} />
                            <Text text={`R$: ${props.chartData[j]}`} styleText={{ fontSize: 15, color: '#FFF' }} />
                        </View>
                    )
                }
            }
        }
    }

    return (
        <View
            style={{
                width: '100%',
                elevation: 8,
                marginVertical: 5,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: '#006cb7',
                alignItems: 'center'
            }}>
            {renderDailyData()}
            <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 5 }}>
                <Text text="Total de ingressos:" styleText={{ fontSize: 20, color: '#FFF' }} />
                <Text text={props.tickets} styleText={{ fontSize: 15, color: '#FFF' }} />
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 5 }}>
                <Text text="Receita total:" styleText={{ fontSize: 20, color: '#FFF' }} />
                <Text text={`R$: ${props.revenue}`} styleText={{ fontSize: 15, color: '#FFF' }} />
            </View>
        </View>
    );
}