class Property {
    constructor(address, unitNumber, bedroom, bathroom, propertyType, rent, bond, imageUrl, lat, lng) {

        this.address = address;
        this.unitNumber = unitNumber;
        this.bedroom = bedroom;
        this.bathroom = bathroom;
        this.rent = rent;
        this.bond = bond;
        this.imageUrl = imageUrl;
        this.lat = lat;
        this.lng = lng;
        this.propertyType = propertyType
    }
}
class Coordinates {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;

    }
}
export { Property, Coordinates };
