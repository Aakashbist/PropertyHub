import { Firebase, getServerTimestamp } from '../../config/Firebase';

const RentCollection = "RentHistory"
export function createRentHistory(propertyKey, tenantId, leasedStartDate) {

    return new Promise((resolve, reject) => {
        const dbRef = Firebase.database().ref().child(`${RentCollection}/${propertyKey}/`);
        let data = {
            tenantId: tenantId,
            rentDueDate: leasedStartDate,
            createdAt: getServerTimestamp()
        };
        dbRef.push(data, (error) => {
            console.log(error, "push");
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
        let propertyApplyRef = Firebase.database().ref().child(`${RentCollection}/${propertyKey}`).limitToLast(1);
        propertyApplyRef.once("value", snapShot => {
            const data = snapShot.val();
            resolve(data);
            console.log(data, "server");
        }, error => reject(error));
    });
}

export function payRent(propertyKey, tenantId, rentDueDate, amount) {
    return new Promise((resolve, reject) => {
        const dbRef = Firebase.database().ref().child(`${RentCollection}/${propertyKey}/`);
        let data = {
            tenantId: tenantId,
            rentDueDate: leasedStartDate,
            rentAmount: amount,
            title: "rent collected",
            createdAt: getServerTimestamp()
        };
        dbRef.push(data, (error) => {
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