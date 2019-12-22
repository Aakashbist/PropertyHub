import Firebase from '../../config/Firebase';
import { flatMap, filter } from 'lodash';

export function getPropertiesBySearch(searchTerm) {
    return new Promise((resolve, reject) => {
        Firebase.database().ref('property').once(
            'value',
            snapshot => {
                var data = snapshot.val();
                var properties = flatMap(data, (ownerList, ownerId) => {
                    return flatMap(ownerList, (property, propertyId) => {
                        property.id = propertyId;
                        return property;
                    });
                });

                if (searchTerm) {
                    var matching = filter(properties, (property) => {
                        return property.address.toLowerCase().includes(searchTerm.toLowerCase());
                    });
                    console.log('--->>', matching);
                    resolve(matching);
                } else {
                    console.log('--->', properties);
                    resolve(properties);
                }
            },
            error => reject(error));
    });
}

export default { getPropertiesBySearch };