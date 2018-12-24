import React from 'react';

type Props = {
    msg: string;
    onPress: (() => void)
}

export default (props: Props) => {
    return (
        alert(
            'Blueticket',
            `${props.msg}`,
            [
                { text: 'OK', onPress: props.onPress },
            ],
            { cancelable: false }
        )
    )
}