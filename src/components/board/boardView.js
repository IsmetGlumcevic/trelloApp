import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BoardCard from './boardCard';
import createList from '../../utils/helper/createList';
import deleteList from '../../utils/helper/deleteList';
import DeleteIcon from '../icons/deleteIcon';

export default function BoardView({ board, getBoardData }) {
    console.log("🚀 ~ file: boardView.js ~ line 10 ~ BoardView ~ board", board)
    const navigation = useNavigation();
    const [addList, setAddList] = useState(false);
    const [addListValue, setAddListValue] = useState('');

    const onPress = (id) => {
        navigation.navigate('Board', {
            boardId: id,
        })
    }

    if (!board) {
        return (
            <View><Text>loader</Text></View>
        )
    }

    const createListHandler = async () => {
        await createList(addListValue, board.id);
        await getBoardData();
        setAddListValue('');
    }

    const deleteListHandler = async (id) => {
        await deleteList(id);
        await getBoardData();
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => onPress(item.id)}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.title}>{item.name}</Text>
                        <TouchableOpacity onPress={() => deleteListHandler(item.id)}>
                            <DeleteIcon />
                        </TouchableOpacity>
                    </View>
                    <BoardCard id={item.id} idList={item.id} />
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <>
            {addList ? (
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddListValue}
                        value={addListValue}
                        placeholder="Ukucaj naziv"
                    />
                    <TouchableOpacity style={styles.itemAdd} onPress={() => createListHandler()}>
                        <Text style={styles.title}>Dodaj</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.itemAdd} onPress={() => setAddList(true)}>
                    <Text style={styles.add}>+</Text>
                    <Text style={styles.title}>Dodaj Listu</Text>
                </TouchableOpacity>
            )
            }
            <FlatList
                data={board.lists.filter(item => item.closed === false)}
                extraData={board.lists}
                horizontal
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
            />
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 5,
        width: Dimensions.get("window").width - 60,
    },
    card: {
        backgroundColor: '#ddd',
        padding: 16,
        borderRadius: 8
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        marginLeft: 16,
        lineHeight: 20
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
});