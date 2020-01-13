class Property {
    constructor(address, unitNumber, bedroom, bathroom, propertyType, propertyDescription, rent, bond, imageUrl, lat, lng, ownerId) {

        this.address = address;
        this.unitNumber = unitNumber;
        this.bedroom = bedroom;
        this.bathroom = bathroom;
        this.rent = rent;
        this.bond = bond;
        this.imageUrl = imageUrl;
        this.lat = lat;
        this.lng = lng;
        this.propertyType = propertyType;
        this.ownerId = ownerId;
        this.propertyDescription = propertyDescription;

    }
}
class Coordinates {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;

    }
}
export { Property, Coordinates };
