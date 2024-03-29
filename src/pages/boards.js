import React, { useState, useEffect, useContext } from 'react';
import getBoards from '../utils/data/getBoards';
import BoardList from '../components/board/boardList';
import LoaderBoards from '../components/shared/loaderBoards';
import { AuthContext } from '../context/AuthContext';

export default function Boards() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  async function getBoardsData() {
    try {
      const getData = await getBoards(token);
      setData(getData)
    } catch (e) {
      console.log(e)
    }
    setLoader(false)
  }

  useEffect(() => {
    getBoardsData();
  }, [])

  if (loader) {
    return <LoaderBoards />
  }

  return (
    <BoardList getBoardsData={getBoardsData} boards={data} />
  );
}
