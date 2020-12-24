import { Circle, Popup } from "react-leaflet";


export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
};

//draw circles on the map with ineteractive tootip
export const showDataOnMap = (data, casesType = 'cases') => {
    const 
    
};