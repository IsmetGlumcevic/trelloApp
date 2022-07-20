import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import deleteIcon from '../../assets/images/delikon.png';

export default function DeleteIcon() {


    return (
        <View style={styles.view}>
            <Image
                source={deleteIcon}
                style={styles.img}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40
    },
    img: {
        width: 20,
        height: 20
    }
});