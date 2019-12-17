class Property {
    constructor(address, unitNumber, numberOfBedrooms, numberOfBathrooms, rent, bond, imageUrl, lat, lng) {

        this.address = address;
        this.unitNumber = unitNumber;
        this.numberOfBedrooms = numberOfBedrooms;
        this.numberOfBathrooms = numberOfBathrooms;
        this.rent = rent;
        this.bond = bond;
        this.imageUrl = imageUrl;
        this.lat = lat;
        this.lng = lng;
    }
}
class Coordinates {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;

    }
}
export { Property, Coordinates };
