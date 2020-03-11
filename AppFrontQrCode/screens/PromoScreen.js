import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Title, List, Divider } from 'react-native-paper';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default class PromoScreen extends React.Component {
    state = {
      promos: []
    }

   constructor(props){
    super(props);
  }
  
  async componentDidMount() {
    const token = await AsyncStorage.getItem('jwt');
          // .then((res) => { return res})
          // .catch((err) => { return err });

      console.log(token);
      const headers = {
          'Authorization': 'Bearer ' + token
      };
      axios({
          method: 'GET',
          url: 'http://localhost:6507/api/promos',
          headers: headers
      })
      .then(res => {
        this.setState({promos: res.data});
        console.log(this.state.promos);
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (
    
      <View style={{flex:1}}>
        <ScrollView>
          <View style={styles.listItems}>
            <Title>Toutes les promotions</Title>

          
            { this.state.promos.map(promo => (
              <List.Item title={promo.name} description={promo.text} />
            )) }
          </View>

        </ScrollView>
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
    },
    listItems: {
      alignItems: 'center',
      justifyContent: 'center'
    }
});
