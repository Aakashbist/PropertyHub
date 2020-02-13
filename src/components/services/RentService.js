import { Firebase, getServerTimestamp } from '../../config/Firebase';
import moment from 'moment';
import { mapToArray } from '../utils/firebaseArray';

const RentCollection = "rentHistory";

export function createRentHistory(propertyKey, tenantId, rent) {
    return new Promise((resolve, reject) => {
        const reference = Firebase.database().ref().child(`${RentCollection}/${propertyKey}/`);
        let data = {
            tenantId: tenantId,
            rent: rent,
            createdAt: getServerTimestamp()
        };
        reference.push(data, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        }) 
    })
}

export function getRentHistory(propertyKey) {
    return new Promise((resolve, reject) => {
        const reference = Firebase.database().ref().child(`${RentCollection}/${propertyKey}`).limitToLast(4);
        reference.once("value", snapShot => {
            const data = snapShot.val();
            if (data) {
                let result = mapToArray(data);
                const rentHistory = result.map(res => {
                    return {
                        time: moment.unix(res.createdAt / 1000).format("DD MMM hh:mm a"),
                        description: res.rent,
                        title: "Rent paid"
                    }
                });

                resolve(rentHistory);
            } else {
                resolve([])
            }
        }, error => reject(error));
    });
}

export function payRent(propertyKey, tenantId, amount) {
    return new Promise((resolve, reject) => {
        const reference = Firebase.database().ref().child(`${RentCollection}/${propertyKey}/`);
        let data = {
            tenantId: tenantId,
            rentAmount: amount,
            title: "rent collected",
            createdAt: getServerTimestamp()
        };
        reference.push(data, (error) => {
            console.log(error, "push");
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    })
}


// { time: date, description: '250', title: 'Rent Collected' }