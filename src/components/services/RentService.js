import { Firebase, getServerTimestamp } from '../../config/Firebase';

const RentCollection = "rentHistory"
export function createRentHistory(propertyKey, tenantId, leasedStartDate) {
    return new Promise((resolve, reject) => {
        const reference = Firebase.database().ref().child(`${RentCollection}/${propertyKey}/`);
        let data = {
            tenantId: tenantId,
            rentDueDate: leasedStartDate,
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
            resolve(data);
        }, error => reject(error));
    });
}

export function payRent(propertyKey, tenantId, rentDueDate, amount) {
    return new Promise((resolve, reject) => {
        const reference = Firebase.database().ref().child(`${RentCollection}/${propertyKey}/`);
        let data = {
            tenantId: tenantId,
            rentDueDate: leasedStartDate,
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