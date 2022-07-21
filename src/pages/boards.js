import React, { useState, useEffect } from 'react';
import getBoards from '../utils/data/getBoards';
import BoardList from '../components/board/boardList';
import LoaderBoards from '../components/shared/loaderBoards';

export default function Boards() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  async function getBoardsData() {
    try {
      const getData = await getBoards();
      setData(getData)
    } catch (e) {
      console.log(e)
    }
    setLoader(false)
  }

  useEffect(() => {
    getBoardsData()
  }, [])

  if (loader) {
    return <LoaderBoards />
  }

  return (
    <BoardList getBoardsData={getBoardsData} boards={data} />
  );
}
