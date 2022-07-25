import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import getCard from '../utils/data/getCard';
import getComments from '../utils/data/getComments';
import createComment from '../utils/helper/createComment';
import deleteComment from '../utils/helper/deleteComment';
import updateComment from '../utils/helper/updateComment';
import LoaderBoards from '../components/shared/loaderBoards';
import DeleteIcon from '../components/icons/deleteIcon';

export default function Card() {
    const { token } = useContext(AuthContext);
    const navigation = useNavigation();
    const route = useRoute();
    const { cardId, name } = route.params;
    const [data, setData] = useState();
    const [commentsData, setCommentsData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [commentValue, setCommentValue] = useState('');
    const [editComment, setEditComment] = useState(false);
    const [selectedComment, setSelectedComment] = useState('');
    const [createCommentValue, setCreateCommentValue] = useState('');

    async function getCardData() {
        try {
            const getData = await getCard(cardId, token);
            const getCommentsData = await getComments(cardId, token);
            setData(getData);
            setCommentsData(getCommentsData)
            setLoader(false);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCardData();
    }, [])

    if (loader) {
        return <LoaderBoards />
    }

    const deleteCommentHandler = async (id) => {
        await deleteComment(cardId, id, token);
        await getCardData();
    }

    const handleEditComment = (name, id) => {
        setEditComment(true);
        setCommentValue(name);
        setSelectedComment(id)
    }

    const handleCreateComment = async () => {
        await createComment(cardId, createCommentValue, token)
        await getCardData();
        setCreateCommentValue('');
    }

    const handleUpdateComment = async (id) => {
        await updateComment(cardId, commentValue, id, token)
        await getCardData();
        setEditComment(false);
        setCommentValue('');
    }



    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>{data.name}</Text>
                <Button onPress={() => navigation.goBack()} title="Zatvori" />
            </View>
            <Text style={styles.comment}>Ostavi komentar</Text>
            <View style={styles.cardHeader}>
                <TextInput
                    style={styles.titleInput}
                    onChangeText={setCreateCommentValue}
                    value={createCommentValue}
                />
                <TouchableOpacity onPress={() => handleCreateComment()}>
                    <Text>Snimi</Text>
                </TouchableOpacity>
            </View>
            {
                commentsData?.map((item) => {
                    return (
                        <View style={styles.cardHeader}>
                            {editComment && selectedComment === item.id ? (
                                <>
                                    <TextInput
                                        style={styles.titleInput}
                                        onChangeText={setCommentValue}
                                        value={commentValue}
                                    />
                                    <TouchableOpacity onPress={() => handleUpdateComment(item.id)}>
                                        <Text>Uredi</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity onPress={() => handleEditComment(item.data.text, item.id)}>
                                        <Text style={styles.title}>{item.data.text}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteCommentHandler(item.id)}>
                                        <DeleteIcon />
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    )
                })
            }
        </View >
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 30,
        marginHorizontal: 20
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: 20
    },
    title: {
        fontSize: 18,
        marginLeft: 16,
        lineHeight: 20
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
    comment: {
        marginHorizontal: 20,
        marginVertical: 15,
        fontSize: 18,
        fontWeight: 600
    }
});