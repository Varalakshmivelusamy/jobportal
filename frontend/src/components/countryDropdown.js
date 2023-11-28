import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'; // Import Material-UI components

const apiKey = 'V1pwU0twNTJwSng2M0g5UUwyYTNpY0Jrb2Jkamo5cm1DbkgxeDNxRg==';
const countryApiUrl = 'https://api.countrystatecity.in/v1/countries';

const LocationSelector = (Props) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch the list of countries
    axios.get(countryApiUrl, { headers: { 'X-CSCAPI-KEY': apiKey } })
      .then(response => response.data)
      .then(data => setCountries(data));
  }, []);

  useEffect(() => {
    // Fetch the list of states when a country is selected

    if (selectedCountry) {
      axios.get(`${countryApiUrl}/${selectedCountry}/states`, { headers: { 'X-CSCAPI-KEY': apiKey } })
        .then(response => response.data)
        .then(data => setStates(data));
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch the list of cities when a state is selected
    if (selectedState) {
      axios.get(`${countryApiUrl}/${selectedCountry}/states/${selectedState}/cities`, { headers: { 'X-CSCAPI-KEY': apiKey } })
        .then(response => response.data)
        .then(data => setCities(data));
    }
  }, [selectedState]);

  const handleCountryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCountry(selectedValue);
    setSelectedState(''); // Reset selected state when the country changes
    setSelectedCity(''); // Reset selected city when the country changes
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(''); // Reset selected city when the state changes
  };

  const handleCityChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCity(selectedValue);
  };

  // Create formatted location strings
  const formattedCountry = countries.find((country) => country.iso2 === selectedCountry)?.name;
  const formattedState = states.find((state) => state.iso2 === selectedState)?.name;
  const formattedCity = selectedCity;

  // Pass the formatted location strings to the parent component
  Props.country(formattedCountry);
  Props.state(formattedState);
  Props.city(formattedCity);

  return (
    <div >
      
      <InputLabel id="country-label" sx={{marginLeft:"50%",marginTop:"-73px", }}>Select a Country</InputLabel>
      <FormControl variant="outlined" style={{ width: '40%', marginLeft: '50%',  }}>
        {/* <InputLabel id="country-label">Select a Country</InputLabel> */}
        <Select
          labelId="country-label"
          id="country-select"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <MenuItem value="">
            <em>Select a Country</em>
          </MenuItem>
          {countries.map(country => (
            <MenuItem key={country.id} value={country.iso2}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <InputLabel id="state-label" sx={{marginLeft: '1%',marginTop:1}}>Select a State</InputLabel>
      <FormControl variant="outlined" style={{ width: '40%', marginLeft: '1%' }}>
        
        <Select
          labelId="state-label"
          id="state-select"
          value={selectedState}
          onChange={handleStateChange}
        >
          <MenuItem value="">
            <em>Select a State</em>
          </MenuItem>
          {states.map(state => (
            <MenuItem key={state.id} value={state.iso2}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <InputLabel id="city-label" sx={{marginLeft:"50%",marginTop:"-80px",}}>Select a City</InputLabel>
      <FormControl variant="outlined" style={{  width: '40%', marginLeft: '50%'}}>
        
        <Select
          labelId="city-label"
          id="city-select"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <MenuItem value="">
            <em>Select a City</em>
          </MenuItem>
          {cities.map(city => (
            <MenuItem key={city.id} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default LocationSelector;





