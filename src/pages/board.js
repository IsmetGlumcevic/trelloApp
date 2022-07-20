import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import getBoard from '../utils/data/getBoard';
import BoardView from '../components/board/boardView';
import LoaderBoard from '../components/shared/loaderBoard';

export default function Board() {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const route = useRoute();
    const { boardId } = route.params;

    async function getBoardData() {
        try {
            const getData = await getBoard(boardId);
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
