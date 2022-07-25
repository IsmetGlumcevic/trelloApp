import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { checkUser } = useContext(AuthContext);
  const [view, setView] = useState('')
  const [loader, setLoader] = useState(true)
  const [login, setLogin] = useState(false)
  const [tokenValue, setTokenValue] = useState('')
  const [verify, setVerify] = useState(false)

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

    if (url.includes('https://trello.com/1/token/approve')) {
      setVerify(true)
    }
    // if (url.includes('https://amplified-fossil-stew.glitch.me/callback')) {
    //   try {
    //     const split1 = url.split('&')[0];
    //     const oauth_token = split1.split('?oauth_token=')[1];
    //     const verify_token = url.split('&oauth_verifier=')[1];
    //     await AsyncStorage.setItem('@token_Key', oauth_token)
    //     await AsyncStorage.setItem('@verify_token_Key', verify_token)
    //   } catch (e) {
    //     console.log(e)
    //   }
    //   checkUser()
    // }
  }

  const saveToken = async () => {
    await AsyncStorage.setItem('@token_Key', tokenValue);
    checkUser();
  }

  return (
    <>
      {login ? (
        <>
          {loader ? (
            <ActivityIndicator />
          ) : (
            <>
              <WebView
                source={{ uri: 'https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=RNTrelloApp&key=ef636ab61049066639b7a247d4c9f008' }}
                onNavigationStateChange={handleWebViewNavigationStateChange}
              />
              {verify && (
                <View style={{ marginBottom: 200 }}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setTokenValue}
                    value={tokenValue}
                    placeholder="Kopiraj token ovdje"
                  />
                  <TouchableOpacity style={styles.itemAdd} onPress={() => saveToken()}>
                    <Text style={styles.title}>Snimi token</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
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

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginLeft: 16,
    lineHeight: 20
  },
  itemAdd: {
    backgroundColor: '#ddd',
    marginVertical: 8,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    alignSelf: 'flex-end'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#eee'
  },
});