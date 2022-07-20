import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import getCards from '../../utils/data/getCards';
import createCard from '../../utils/helper/createCard';
import deleteCard from '../../utils/helper/deleteCard';
import DeleteIcon from '../icons/deleteIcon';

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

    return (
        <>
            {data.length === 0 ? (
                <Text style={{ padding: 15 }}>Nema kartica</Text>
            ) : (
                <>
                    {data.map((item, i) => {
                        console.log("🚀 ~ file: boardCard.js ~ line 50 ~ {data.filter ~ item", item)
                        return (
                            <View key={i} style={styles.card}>
                                <TouchableOpacity style={styles.item} onPress={() => onPress(item.id)}>
                                    <Text style={styles.title}>{item.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteCardHandler(item.id)}>
                                    <DeleteIcon />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
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
});