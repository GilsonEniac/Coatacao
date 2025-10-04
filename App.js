import React,{useState,useEffect} from 'react';
import {View, Text,StyleSheet, ActivityIndicator, TextInput,TouchableOpacity,Keyboard} from 'react-native';

import {PickerItem} from './src/Picker';
import {api} from './src/Services/api';



export default function App(){

 const  [moedas, setMoedas] = useState([]);
 const [moedaSelecionada, setMoedaselecionada] = useState(null);
 const [loading, setLoading] = useState(true);

 const [valorMoeda, setValorMoeda] =useState(null);
 const [valorConvertido, setValortConvertido] = useState(0);
 const[inputValor, setInputValor] =useState("");

  useEffect(()=>{

    async function loadMoedas(){
        const carga = await api.get('all');
        //console.log(carga.data)
        
        let arrayMoedas =[];
        Object.keys(carga.data).map((kkey)=>{
          arrayMoedas.push({
            key : kkey, label: kkey, value: kkey,
          })
          
        })


       setMoedas(arrayMoedas)
       setMoedaselecionada(arrayMoedas[0].key)
       setLoading(false)

       console.log(moedas)

    }

  loadMoedas();

  },[])


   async function converter(){
    if(inputValor === 0 || inputValor === "" || moedaSelecionada === null){
      return;
    }

    const response = await api.get(`/all/${moedaSelecionada}-BRL`)

    let resultado =(response.data[moedaSelecionada].ask * parseFloat(inputValor) )
    
    setValortConvertido(`${resultado.toLocaleString("pt-BR",{ style: "currency", currency: "BRL"})}`)
    setValorMoeda(inputValor)
    Keyboard.dismiss();

  }



  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  backgroundColor: '#101215'}}>
        <ActivityIndicator
          color='#FFF'
          size ='large'
        />
      </View>
    )
  }






  return(
   

   <View style={myStyle.conteiner}>
    
      
      <View style={myStyle.areaMoeda}>
          <Text style={myStyle.titulo}>Selecione a moeda</Text>
            <PickerItem
            moedas={moedas}
            moedaSelecionada={moedaSelecionada}
            onChange={(moeda)=> {setMoedaselecionada(moeda)}}
                
            />
      </View>
      <View style={myStyle.areaValor}>
        <Text style={myStyle.txtAreaValor}>Digite o valor para converter (R$)</Text>
        <TextInput
        placeholder='EX: 1.50 '
        style={myStyle.input}
        keyboardType='numeric'
        value={inputValor}
        onChangeText={(valor)=> setInputValor(valor)}
        />
      </View>

      <TouchableOpacity style={myStyle.areaBotao} onPress={converter}>
        <Text style={myStyle.txtBotao}>Converter</Text>
      </TouchableOpacity>
    
    {valorConvertido !== 0 && (
       <View style={myStyle.arearesultado}>
        
        <Text style={myStyle.valorConvertido}>
          {valorMoeda} - {moedaSelecionada}
        </Text>
        
        <Text style={{fontSize: 18,margin: 8, color: '#727070ff',fontStyle: 'italic'}}> 
          corresponde a 
        </Text>
        
        <Text style={myStyle.valorConvertido}> 
          {valorConvertido}
          </Text>
        
      </View>


    )}
     
     
     
     
 
       

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
  },
  areaValor:{
    marginTop: 1,
    backgroundColor: '#f9f9f9',
    width: '90%',
    paddingTop: 8,
    paddingBottom: 8,
   
  },
  txtAreaValor:{
    fontSize: 16,
    textAlign: 'center'
  },
  input:{
    width : '100%',
    padding: 8,
    fontSize: 18,
    color: '#000'
  },
  areaBotao:{
    backgroundColor: '#fb4b57',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  txtBotao:{
    color: 'black',
    fontWeight: 'bold'
    
  },
  arearesultado:{
    marginTop: 30,
    backgroundColor: '#f9f9f9',
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    padding: 25
  },
  valorConvertido:{
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold'
  }
})