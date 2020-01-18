import { UrlTile } from "react-native-maps";

export function getNameInitials(name) {
    const names = name.split(' ');
    const initials = names.map(namePart => namePart.charAt(0).toUpperCase())
    if (initials.length > 1) {
        return `${initials[0]}${initials[initials.length - 1]}`;
    } else {
        return initials[0];
    }
}



