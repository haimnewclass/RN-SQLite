import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View ,ScrollView ,Button} from 'react-native';
import { Init,AddNewItem,SelectAll} from  './database';


export default function App() {
  const [val,setVal] = useState("***");
  const [listItems,setListItems] = useState([]);

 useEffect(()=>{

  Init().then(()=>{
    console.log('db created well');
  }).catch(()=>{
    console.log('db created fail');
  });
 },[]);


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <Button title="Add New Price" onPress={()=>{
        AddNewItem('Cola', 10).then((result)=>{
          console.log(result);
        }).catch(()=>{})
        }}></Button>


        <Button title="Select All" onPress={()=>{
        SelectAll().then((result)=>{
          console.log(result.rows._array);
          setListItems(result.rows._array);
          // build the listItems
        }).catch(()=>{})
        }}></Button>


      <View><Text>{val}</Text></View>
      <ScrollView>
        {listItems.map((x)=>{
          return(<View><Text>{x.Name}</Text></View>)
        })}
      </ScrollView>
    </View>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
