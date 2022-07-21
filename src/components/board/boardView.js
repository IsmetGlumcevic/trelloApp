import React, { useState, useRef } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BoardCard from './boardCard';
import createList from '../../utils/helper/createList';
import deleteList from '../../utils/helper/deleteList';
import DeleteIcon from '../icons/deleteIcon';
import DraggableFlatList, {
    ScaleDecorator,
    NestableScrollContainer, NestableDraggableFlatList,
} from "react-native-draggable-flatlist";
import updateListPosition from '../../utils/helper/updateListPosition';

export default function BoardView({ board, getBoardData }) {
    const navigation = useNavigation();
    const [addList, setAddList] = useState(false);
    const [addListValue, setAddListValue] = useState('');
    const [data, setData] = useState(board.lists);
    const dragRef = useRef(null)

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

    const renderItem = ({ item, drag, isActive }) => {
        return (
            <ScaleDecorator key={item.id}>
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        styles.item,
                        { backgroundColor: isActive ? "lightgreen" : "#fff" },
                    ]}
                >
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
            </ScaleDecorator>

        )
    };

    const handleDrag = (val1, val2, val3) => {
        const next = val3 + 1;
        const prev = val3 - 1;
        setData(val1)
        const item = val1.find((el, i) => i === val3)
        const nextItem = val1.find((el, i) => i === next)
        const prevItem = val1.find((el, i) => i === prev)
        if (nextItem) {
            const position = nextItem.pos - 100;
            updateListPosition(item.id, position)
        } else {
            const position = prevItem.pos + 100;
            updateListPosition(item.id, position)
        }
    }

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
            <DraggableFlatList
                data={data.filter(item => item.closed === false)}
                extraData={data}
                horizontal
                onDragEnd={({ data, from, to }) => handleDrag(data, from, to)}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                simultaneousHandlers={dragRef}
            />
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f2f2f2',
        padding: 3,
        marginVertical: 8,
        marginHorizontal: 5,
        width: Dimensions.get("window").width - 120,
        borderRadius: 8
    },
    card: {
        backgroundColor: '#ddd',
        padding: 8,
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