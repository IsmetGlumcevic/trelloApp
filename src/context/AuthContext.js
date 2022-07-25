import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [token, setToken] = useState(undefined);

  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@token_Key')
      console.log("🚀 ~ file: AuthContext.js ~ line 13 ~ checkUser ~ value", value)
      const tokenValue = value != null ? value : null;
      setToken(tokenValue)
    } catch (e) {
      console.log(e);
      setToken(null)
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        checkUser,
        token,
        setToken,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
