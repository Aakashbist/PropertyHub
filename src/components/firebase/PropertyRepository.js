import { Component } from 'react';
import Firebase from '../../config/Firebase';

export function getProperties(userId) {
    const tasks = [];
    let dbPropertyRef = Firebase.database().ref('property/' + userId);
    return dbPropertyRef.once('value', dataSnapshot => {
        dataSnapshot.forEach(data => {
            let result = data.val();
            result["key"] = data.key;
            tasks.push(result);
        })

    });

}



