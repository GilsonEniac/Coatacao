import React from 'react';
import {View, Text,StyleSheet} from 'react-native';



export default function App(){
  return(
    <View style={myStyle.conteiner}>
      <Text>
        Olá
      </Text>
    </View>


  );
}
const myStyle = StyleSheet.create({
  conteiner:{
    flex: 1,
    marginTop: 20,
    backgroundColor: '#817a7aff'
  }
  
})