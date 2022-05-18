import * as SQLite  from 'expo-sqlite';


const database = SQLite.openDatabase('items.db');

export function Init()
{
    // Declare Tables model

    const prom = new Promise((resolve,reject)=>{


        database.transaction((tx=>{
            // create one time table
            tx.executeSql('CREATE TABLE IF NOT EXISTS Items(ID INTEGER PRIMARY KEY NOT NULL, Name TEXT NOT NULL, Price INTEGER NOT NULL)'
            ,[],()=>{
    
                console.log('Success from create table Items');
                resolve();
    
            },(_,error)=>{
                console.log('Error from create table Items');
                console.log(error);
                reject();
            });
        }));

        // success => resolve
        // fail => reject
    });
    
    return prom;
}

      
export function AddNewItem(name,price)
{ 
    
    const promise = new Promise((resolve,reject)=>{
        database.transaction((conn)=>{
            conn.executeSql('INSERT INTO Items(Name,Price) VALUES(?,?)',[name,price],(_,result)=>{
                console.log('Result from insert');
                console.log(result);
                resolve(result);
    
            },(_,error)=>{
                console.log('Error InsertItem');
                console.log(error);
                reject(error);
            });
        })
    

    });

    return promise;
   
}


export function SelectAll()
{
    const promise = new Promise((resolve,reject)=>{

        database.transaction((conn)=>{
            conn.executeSql('select * from Items',[],(_,result)=>{
                    resolve(result);
            },(_,error)=>{

                reject(error);
            })
        });

    });


    return promise;
   
}