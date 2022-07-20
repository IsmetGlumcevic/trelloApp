import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Login() {
  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

  return <WebView
   source={{ uri: 'https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key=ef636ab61049066639b7a247d4c9f008' }} 
   injectedJavaScript={runFirst}
    onMessage={(event)=> console.log( "On Message", event.nativeEvent.data )}
   />;
}