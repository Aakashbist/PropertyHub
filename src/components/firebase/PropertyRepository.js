import { Component } from 'react';
import Firebase from '../../config/Firebase';

export function getProperties(userId) {

    let dbPropertyRef = Firebase.database().ref('property/' + userId);

    let listofProperties = new Promise((resolve, reject) => {
        dbPropertyRef.once('value', dataSnapshot => {
            let data = dataSnapshot.val();
            let result = Object.keys(data).map((key) => {
                data[key].id = key;
                return data[key];
            });
            resolve(result)
        }, (error) => {
            reject(error)
        });
    })
    return listofProperties;

}



