import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import getCards from '../../utils/data/getCards';
import createCard from '../../utils/helper/createCard';
import deleteCard from '../../utils/helper/deleteCard';
import updateCardPosition from '../../utils/helper/updateCardPosition';
import DeleteIcon from '../icons/deleteIcon';
import DraggableFlatList, {
    ScaleDecorator,
    NestableScrollContainer, NestableDraggableFlatList,
} from "react-native-draggable-flatlist";

export default function BoardCard({ id, idList }) {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [addCard, setAddCard] = useState(false);
    const [addCardValue, setAddCardValue] = useState('');

    async function getCardData() {
        try {
            const getData = await getCards(id);
            setData(getData);
            setLoader(false)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCardData();
    }, [])

    if (loader) {
        return <ActivityIndicator />
    }

    const creatCardHandler = async () => {
        await createCard(idList, addCardValue);
        await getCardData();
        setAddCardValue('');
    }

    const deleteCardHandler = async (id) => {
        await deleteCard(id);
        await getCardData();
    }

    const renderItem = ({ item, drag, isActive }) => {
        return (
            <ScaleDecorator key={item.id}>
                <View style={styles.card}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onLongPress={drag}
                        disabled={isActive}
                        style={[
                            styles.item,
                            { backgroundColor: isActive ? "red" : "#fff" },
                        ]}
                    >
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteCardHandler(item.id)}>
                        <DeleteIcon />
                    </TouchableOpacity>
                </View>
            </ScaleDecorator>
        );
    };

    const handleDrag = (val1, val2, val3) => {
        const next = val3 + 1;
        setData(val1)
        const item = val1.find((el, i) => i === val3)
        const nextItem = val1.find((el, i) => i === next)
        console.log("🚀 ~ file: boardCard.js ~ line 74 ~ handleDrag ~ nextItem", nextItem)
        const position = nextItem.pos - 100;
        updateCardPosition(item.id, position)
    }

    return (
        <>
            {data.length === 0 ? (
                <Text style={{ padding: 15 }}>Nema kartica</Text>
            ) : (
                <>
                    <NestableScrollContainer>
                        <NestableDraggableFlatList
                            data={data ? data : []}
                            extraData={data}
                            onDragEnd={({ data, from, to }) => handleDrag(data, from, to)}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    </NestableScrollContainer>
                </>
            )}
            {addCard ? (
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddCardValue}
                        value={addCardValue}
                        placeholder="Ukucaj naziv kartice"
                    />
                    <TouchableOpacity style={styles.itemAdd} onPress={() => creatCardHandler()}>
                        <Text style={styles.title}>Dodaj</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.itemAdd} onPress={() => setAddCard(true)}>
                    <Text style={styles.add}>+</Text>
                    <Text style={styles.title}>Dodaj karticu</Text>
                </TouchableOpacity>
            )
            }

        </>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        backgroundColor: '#fff',
        marginVertical: 8,
        paddingVertical: 10,
        borderRadius: 8,
        flex: 1
    },
    itemAdd: {
        backgroundColor: '#ddd',
        marginVertical: 8,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        paddingHorizontal: 10,
        lineHeight: 20
    },
    add: {
        fontSize: 30,
        lineHeight: 30
    },
    input: {
        height: 40,
        marginTop: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#eee'
    },
    rowItem: {
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});