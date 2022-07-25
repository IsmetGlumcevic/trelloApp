import React, { useState, useEffect, useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import getBoard from '../utils/data/getBoard';
import BoardView from '../components/board/boardView';
import LoaderBoard from '../components/shared/loaderBoard';
import { AuthContext } from '../context/AuthContext';

export default function Board() {
    const { token } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const route = useRoute();
    const { boardId } = route.params;

    async function getBoardData() {
        try {
            const getData = await getBoard(boardId, token);
            setData(getData);
            setLoader(false);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getBoardData();
    }, [])

    if (loader) {
        return <LoaderBoard />
    }

    return (
        <BoardView board={data} getBoardData={getBoardData} />
    );
}
