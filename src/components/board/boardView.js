import React, { useState, useContext, useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BoardCard from './boardCard';
import createList from '../../utils/helper/createList';
import deleteList from '../../utils/helper/deleteList';
import DeleteIcon from '../icons/deleteIcon';
import DraggableFlatList, {
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import updateListPosition from '../../utils/helper/updateListPosition';
import updateList from '../../utils/helper/updateList';
import { AuthContext } from '../../context/AuthContext';

export default function BoardView({ board, getBoardData }) {
    const { token } = useContext(AuthContext);
    const navigation = useNavigation();
    const [addList, setAddList] = useState(false);
    const [addListValue, setAddListValue] = useState('');
    const [editListTitle, setEditListTitle] = useState(false);
    const [listTitleValue, setListTitleValue] = useState('');
    const [selectedList, setSelectedList] = useState();
    const [data, setData] = useState([]);
    const [isDragView, setIsDragView] = useState(false);
    const [boardValue, setBoardValue] = useState('');
    const [editBoard, setEditBoard] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState('');

    if (!board) {
        return (
            <View><Text>loader</Text></View>
        )
    }

    const createListHandler = async () => {
        await createList(addListValue, board.id, token);
        await getBoardData();
        setAddListValue('');
    }

    const deleteListHandler = async (id) => {
        await deleteList(id, token);
        await getBoardData();
    }

    const handleEditListTitle = (name, id) => {
        setEditListTitle(true);
        setListTitleValue(name);
        setSelectedList(id)
    }

    const handleUpdateTitle = async (id) => {
        await updateList(id, listTitleValue, token)
        await getBoardData();
        setEditListTitle(false);
        setListTitleValue('');
    }


    const handleEditBoard = (name, id) => {
        setEditBoard(true);
        setBoardValue(name);
        setSelectedBoard(id)
    }

    const handleUpdateBoard = async (id) => {
        await updateBoard(id, boardValue, token)
        await getBoardsData();
        setEditBoard(false);
        setBoardValue('');
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onLongPress={handleDraggableView}
                style={styles.item}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        {editListTitle && selectedList === item.id ? (
                            <>
                                <TextInput
                                    style={styles.titleInput}
                                    onChangeText={setListTitleValue}
                                    value={listTitleValue}
                                />
                                <TouchableOpacity onPress={() => handleUpdateTitle(item.id)}>
                                    <Text>Snimi</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity onPress={() => handleEditListTitle(item.name, item.id)}>
                                    <Text style={styles.title}>{item.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteListHandler(item.id)}>
                                    <DeleteIcon />
                                </TouchableOpacity>
                            </>
                        )}

                    </View>
                    <BoardCard isDrag={false} id={item.id} idList={item.id} />
                </View>
            </TouchableOpacity>
        )
    };

    const renderDraggableItem = ({ item, drag, isActive }) => {
        return (
            <ScaleDecorator key={item.id}>
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        styles.dragItem,
                        { backgroundColor: isActive ? "lightgreen" : "transparent" },
                    ]}
                >
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                        <BoardCard isDrag={true} id={item.id} idList={item.id} />
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
            updateListPosition(item.id, position, token)
        } else {
            const position = prevItem.pos + 100;
            updateListPosition(item.id, position, token)
        }
    }

    useEffect(() => {
        setData(board.lists)
    }, [board])

    const handleDraggableView = () => {
        setIsDragView(true)
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {isDragView ? (
                <DraggableFlatList
                    data={data}
                    extraData={data}
                    horizontal
                    onDragEnd={({ data, from, to }) => handleDrag(data, from, to)}
                    keyExtractor={item => item.id}
                    renderItem={renderDraggableItem}
                />
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                        data={data}
                        extraData={data}
                        horizontal
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
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
                </ScrollView>
            )}
        </View>
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
    dragItem: {
        backgroundColor: 'transparent',
        padding: 3,
        marginVertical: 8,
        marginHorizontal: 5,
        width: Dimensions.get("window").width * 1 / 3,
        borderRadius: 8,
        borderColor: 'green',
        borderWidth: 1
    },
    card: {
        backgroundColor: '#ddd',
        padding: 8,
        borderRadius: 8
    },
    dragCard: {
        maxHeight: 30
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
        width: Dimensions.get("window").width - 120,
        alignSelf: 'flex-start'
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
    titleInput: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#eee',
        flex: 1
    },
});