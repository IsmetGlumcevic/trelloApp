import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [token, setToken] = useState(undefined);
  const [verifyToken, setVerifyToken] = useState(undefined);


  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@token_Key')
      const tokenValue = value != null ? value : null;
      console.log("🚀 ~ file: AuthContext.js ~ line 16 ~ checkUser ~ tokenValue", tokenValue)
      const verifyValue = await AsyncStorage.getItem('@verify_token_Key')
      const verifyTokenValue = verifyValue != null ? verifyValue : null;
      console.log("🚀 ~ file: AuthContext.js ~ line 19 ~ checkUser ~ verifyTokenValue", verifyTokenValue)
      setToken(tokenValue)
      setVerifyToken(verifyTokenValue)
    } catch (e) {
      console.log(e);
      setToken(null)
      setVerifyToken(null)
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
        verifyToken, 
        setVerifyToken
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
