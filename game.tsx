import React, { useState } from "react";

export default function App(props) {
    const allCountries = Object.entries(props.data).map(country => {
        return {
            id: Math.floor(Math.random() * 999),
            country: country[0],
            capital: country[1],
            isClicked: false,
            hide: false,
            wrong: false
        }
    });

    const allCapitals = allCountries.map(country => {
        return {
            id: country.id,
            capital: country.capital,
            isClicked: false,
            hide: false,
            wrong: false
        }
    });

    const [countries, setStateCountries] = useState(allCountries.sort(() => Math.random() - Math.random()));
    const [capitals, setStateCapitals] = useState(allCapitals.sort(() => Math.random() - Math.random()));
    const [itIsOver, setItIsOver] = useState(false);
    
    function handleClickCountry(id) {
        setStateCountries(countries.map(country => {
            if(country.id === id && country.isClicked === false) {
                return { ...country, isClicked: true }
            }else if(country.id !== id && country.wrong){
                setStateCapitals(capitals.map(capital => { 
                    return {...capital, wrong: false }
                }));
                return { ...country, wrong: false, isClicked: false }
            }else{
                setStateCapitals(capitals.map(capital => { 
                    return {...capital, wrong: false }
                }));
                return { ...country, isClicked: false };
            }
        }));
    }
    
    function handleClickCapitals(id){
        setStateCapitals(capitals.map(capital => capital.id === id ? { ...capital, isClicked: true } : capital));

        setStateCountries(countries.map(country => {
            if(country.id === id && country.isClicked){
                setStateCapitals(capitals.map(capital => capital.id === id ? { ...capital, hide: true } : capital));
                return { ...country, hide: true, isClicked: false }
            }else if(country.id !== id && country.isClicked){
                setStateCapitals(capitals.map(capital => capital.id === id ? { ...capital, wrong: true } : capital));
                return { ...country, wrong: true, isClicked : false }
            }else{
                return { ...country, isClicked: false, wrong: false }
            }
        }));

        const countViewCapitals = capitals.filter(capital => {
            return capital.hide === false;
        });

        countViewCapitals.length === 1 && setItIsOver(true);
    }

    return (
        <div>
            {countries.map((country, index) => {
                return (
                    <>
                        <button
                            onClick={() => handleClickCountry(country.id)}
                            style={{marginRight: '5px', backgroundColor: (country.isClicked ? '#0000ff': (country.wrong ? 'red' : '')), display: country.hide ? 'none' : ''}}>
                                {country.country}
                        </button>

                        <button
                            onClick={() => handleClickCapitals(capitals[index].id)}
                            style={{marginRight: '5px', backgroundColor: capitals[index].isClicked ? '#0000ff': (capitals[index].wrong ? 'red' : ''), display: capitals[index].hide ? 'none' : ''}}>
                                {capitals[index].capital}
                        </button>
                    </>
                )
            })}

            <h2 style={{ display: itIsOver ? 'block' : 'none' }}>Congratulations</h2>
        </div>
    )
}