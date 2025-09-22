import React, { useEffect , useState } from "react";
import axios from "axios";
import styles from "./Application.module.css";
export default function Application() {


    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");


    useEffect(() => {
        const countries = async () => {
            await axios.get(`https://crio-location-selector.onrender.com/countries`).then((res) => setCountry(res.data)).catch((err) => console.log(err));
        }
        countries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const states = async () => {
                await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`).then((res) => setState(res.data)).catch((err) => console.log(err));
            }
            states();
        }
    }, [selectedCountry]);

    useEffect(() => {
        if(selectedCountry && selectedState){
            const cities = async () => {
                await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`).then((res) => setCity(res.data)).catch((err) => console.log(err));
            }
            cities();
        }   
    }, [selectedCountry, selectedState]);


  return (
    <>
        <h1 className={styles.heading}>Select Location</h1>
        <div className={styles.selector}>
            <div className={styles.dropdown}>
                <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="" disabled>Select Country</option>
                    {country.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <div className={styles.dropdown}>
                <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={!selectedCountry}
                >
                    <option value="" disabled>Select State</option>
                    {state.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <div className={styles.dropdown}>
                <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                >
                    <option value="" disabled>Select City</option>
                    {city.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
            </div> 
        </div>
        <div>
            {selectedCountry && selectedState && selectedCity && (
                <h2 className={styles.selected}>
                    You have selected {selectedCity}, {selectedState}, {selectedCountry}
                </h2>
            )}
        </div>
    </> 

  )
};
