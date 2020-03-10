import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Title, List } from 'react-native-paper';
import axios from 'axios';

export default class PromoScreen extends React.Component {
  state = {
    promos: []
  }

  getAllPromos = async () => {
    axions.get('http://localhost:6507/api/promos')
    .then(res => {
      const promos = res.data;
      this.setState({promos});
    })
    .catch(err => {
      console.log(err);
    })
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          { this.state.promos.map(promo => {
            <List.Item
              title={promo.name}
              description={promo.text}
            />
          }) }

      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
