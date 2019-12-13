const API_KEY = "AIzaSyC8cfuosSdIXS9JrI5PWrtMYmCVFCGwwnM "


export async function getGooglePlaceAutocomplete(destination) {
    const autoCompleteApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key= ${API_KEY}&input=${destination}&radius=2000`;
    try {
        const result = await fetch(autoCompleteApiUrl);
        const json = await result.json();
        return json;
    }
    catch (error) {

    };
}

export async function getGooglePlaceDetails(address) {
    const placeDetailApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&place_id=${address}&fields=geometry`

    try {
        const result = await fetch(placeDetailApiUrl);
        const json = await result.json();
        return json;
    }
    catch (error) {

    };
}

