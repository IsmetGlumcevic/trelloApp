import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { checkUser } = useContext(AuthContext);
  const [view, setView] = useState('')
  const [loader, setLoader] = useState(true)
  const [login, setLogin] = useState(false)

  async function getToken() {
    try {
      const fetchBoard = await fetch(`https://amplified-fossil-stew.glitch.me/login`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      const loginView = await fetchBoard.url;
      await setView(loginView);
      setLoader(false);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  const handleWebViewNavigationStateChange = async (newNavState) => {
    const { url } = newNavState;
    if (!url) return;
    if (url.includes('https://amplified-fossil-stew.glitch.me/callback')) {
      try {
        const split1 = url.split('&')[0];
        const oauth_token = split1.split('?oauth_token=')[1];
        const verify_token = url.split('&oauth_verifier=')[1];
        await AsyncStorage.setItem('@token_Key', oauth_token)
        await AsyncStorage.setItem('@verify_token_Key', verify_token)
      } catch (e) {
        console.log(e)
      }
      checkUser()
    }
  }

  return (
    <>
      {login ? (
        <>
          {loader ? (
            <ActivityIndicator />
          ) : (
            <WebView
              source={{ uri: view }}
              onNavigationStateChange={handleWebViewNavigationStateChange}
            />
          )}
        </>
      ) : (
        <TouchableOpacity
          style={{ width: '80%', height: 40, margin: 30, borderRadius: 20, backgroundColor: '#0279c0', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setLogin(true)}>
          <Text style={{ color: 'white', textTransform: 'uppercase' }}>Login</Text>
        </TouchableOpacity>
      )}
    </>
  );
}