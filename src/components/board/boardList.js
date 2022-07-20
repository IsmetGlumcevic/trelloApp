import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import createBoard from '../../utils/helper/createBoard';
import deleteBoard from '../../utils/helper/deleteBoard';
import DeleteIcon from '../icons/deleteIcon';

export default function BoardList({ boards, getBoardsData }) {
    const navigation = useNavigation();
    const [addBoard, setAddBoard] = useState(false);
    const [addBoardValue, setAddBoardValue] = useState('');

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <TouchableOpacity style={styles.item} onPress={() => onPress(item.id)}>
                    <View style={styles.img}></View>
                    <Text style={styles.title}>{item.name} {item.bgColor}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteBoardHandler(item.id)}>
                    <DeleteIcon />
                </TouchableOpacity>
            </View>
        )
    };

    const onPress = (id) => {
        navigation.navigate('Board', {
            boardId: id,
        })
    }

    const creatBoardHandler = async () => {
        await createBoard(addBoardValue);
        await getBoardsData();
        setAddBoardValue('');
    }

    const deleteBoardHandler = async (id) => {
        await deleteBoard(id);
        await getBoardsData();
    }

    return (
        <>
            {addBoard ? (
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddBoardValue}
                        value={addBoardValue}
                        placeholder="Ukucaj naziv"
                    />
                    <TouchableOpacity style={styles.itemAdd} onPress={() => creatBoardHandler()}>
                        <Text style={styles.title}>Dodaj</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.itemAdd} onPress={() => setAddBoard(true)}>
                    <Text style={styles.add}>+</Text>
                    <Text style={styles.title}>Dodaj Board</Text>
                </TouchableOpacity>
            )
            }
            <FlatList
                data={boards}
                extraData={boards}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

        </>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eee',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    itemAdd: {
        backgroundColor: '#ddd',
        marginVertical: 8,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 18,
        marginLeft: 16,
        lineHeight: 20
    },
    img: {
        width: 60,
        height: 60,
        backgroundColor: '#ddd'
    },
    add: {
        fontSize: 30,
        lineHeight: 30
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#eee'
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});