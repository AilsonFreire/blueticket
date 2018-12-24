import { AsyncStorage } from "react-native";

export const onSignIn = (token: string) => AsyncStorage.setItem('@Blueticket:token', token);

export const onSignout = () => AsyncStorage.removeItem('@Blueticket:token');

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('@Blueticket:token')
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    })
};