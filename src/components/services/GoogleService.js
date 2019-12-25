import APIKeys from "../../resources/mapApiKey";
import parseMapApiError from "../errorParser/MapApiErrorParser";

export async function getGooglePlaceAutocomplete(destination) {
    const autoCompleteApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key= ${APIKeys.GOOGLE_MAP_API_KEY}&input=${destination}&radius=2000`;
    try {
        const result = await fetch(autoCompleteApiUrl);
        const json = await result.json();
        return json;
    }
    catch (error) {
    };
}

export async function getGooglePlaceDetails(address) {
    const placeDetailApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${APIKeys.GOOGLE_MAP_API_KEY}&place_id=${address}&fields=geometry,address_components`
    try {
        const result = await fetch(placeDetailApiUrl);
        const json = await result.json();
        return json;
    }
    catch (error) {
    };
}

