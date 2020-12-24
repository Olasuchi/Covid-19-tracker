import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from "./Map";
import './App.css';
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph"; 
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide'); //to set default frist option to worldwide
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTablesData] = useState([]);
 /**  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 }); /* the long and lat of the center of the world so when the app loadsit gos to center  */
  /** const [mapZoom, setMapZoom] = useState(3);   to zoom to the center*/


    useEffect(() => {
      fetch ("https://disease.sh/v3/covid-19/all")
      .then (response => response.json())
      .then (data => {
        setCountryInfo(data);
      });
    }, []);

                // STATE [] = dis is how to write a variable in react <<<<<<
                // https://disease.sh/v3/covid-19/countries
                //USEEFFECT= Use to pull data from api. runs a piece of code based on given condition

    useEffect(() => {
                //note when u live [] blank the code inside here will run only once whn d components loads ie if u av data in the countries varaible when there is changes in the data it wil only run once 
               // we need to run a piece of code -> async -> sends a request to server and wait for it and fo somtin wit d info. how to use is below 

      const getCountriesData= async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then ((data) => {
          const countries = data.map ((country) => (
            {
              name: country.country, //Unites States, United Kingdom
              value: country.countryInfo.iso2 // UK, USA, FRA
          }));

          const sortedData = sortData(data);
          setTablesData(sortedData);
          setMapCountries(data); // all info from the countries on the map 
          setCountries(countries);

        });
      };

      getCountriesData();
    }, []);

    const onCountryChange = async (event) => {
      const countryCode = event.target.value; 
      setCountry(countryCode); 
      
                // to set the country which is selected on dispaly in the menu

      const url = 
        countryCode === "worldwide" 
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${countryCode}`;    //this two above will iterate if the countrycode is worldwide pick first one and if otherwise the next one

           await fetch(url)
           .then (response => response.json())
           .then(data => {
              setCountry(countryCode); 
              
                        // setcointry brings the response for the country code then the nxt line stores it 

                        //storing all data from the contry response
              setCountryInfo(data); //this will store d contry info into a variable

              setMapCenter ([data.countryInfo.lat, data.countryInfo,long]); // this allow the focus to be on the country selected in dropdown list e.g select usa and it will zoom to USA 
              setMapZoom(4);
           });
    };

      console.log("COUNTRY INFO >>>", countryInfo); 

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1> COVID-19 TRACKER</h1>
            <FormControl className="app_dropdown">
               <Select variant="outlined" onChange={onCountryChange} value={country}>
                    <MenuItem value="worldwide">Worldwide</MenuItem>

                        {/*Loop through all the countries and how a drop downlist of the options */}

                        {countries.map((country ) => (
                      <MenuItem value={country.value}>{country.name}</MenuItem>
                     ))}               
                </Select>

            </FormControl>

        </div>
      

      

          <div className="app_stats">
            <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
            <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
            <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
          </div>

                          
          <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}          
          zoom={mapZoom}
        />

                  
      </div>
      
  <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
            <Table countries={tableData}></Table>
          <h3>Worldwide new cases</h3>
                          <LineGraph />
            
        </CardContent>
      </Card>
  </div>
  );
}

export default App;
