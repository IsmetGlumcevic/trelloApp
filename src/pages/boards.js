import React, { useState, useEffect } from 'react';
import getBoards from '../utils/data/getBoards';
import BoardList from '../components/board/boardList';
import LoaderBoards from '../components/shared/loaderBoards';
import { TouchableOpacity, Text } from 'react-native';
import Login from '../components/login';

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
    <>
      {/* <TouchableOpacity><Text>Login</Text></TouchableOpacity>
      <Login /> */}
      <BoardList getBoardsData={getBoardsData} boards={data} />
    </>
  );
}
