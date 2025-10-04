//import React from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {PickerItem} from './src/Picker';



export default function App(){
  return(
   
   <View style={myStyle.conteiner}>
      
      <View style={myStyle.areaMoeda}>
          <Text style={myStyle.titulo}>Selecione a moeda</Text>
          <PickerItem/>
      </View>
      
   
    

   </View>

  );
}

const myStyle = StyleSheet.create({
  conteiner:{
    flex: 1,
    paddingTop:40,
    alignItems: 'center',
    backgroundColor: '#101215'
  },
  areaMoeda:{
    backgroundColor: '#f9f9f9',
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8
  },
  titulo:{
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
    paddingLeft: 5,
    paddingTop:5
  }
})