//App.js
import React from 'react'
import { AppRegistry } from 'react-native';
import AppContainer from './navigation/index';
import { Provider as PaperProvider } from 'react-native-paper';

export default class App extends React.Component {

  render() {
    return (
      <PaperProvider>
          <AppContainer />
      </PaperProvider>
      
    );
  }
}