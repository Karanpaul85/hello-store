import { useEffect, useState } from "react";

const Weather = () => {
  const defaultLocation = {
    countryCode: "",
    countryName: "",
    stateName: "",
    cityName: "",
  };
  const [location, setUserLocation] = useState(defaultLocation);
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);

  const getCountries = (e) => {
    const inputValue = e.target.value;
    setUserLocation((prevLocation) => ({
      ...prevLocation,
      countryName: inputValue,
    }));

    const filerData = countries.filter((item) => {
      return item.name.toLowerCase().includes(inputValue);
    });
    setFilterCountries(filerData);
  };

  const getCountriesList = async () => {
    const res = await fetch("/assets/countryData/countries.json");
    const data = await res.json();
    setCountries(data);
  };

  useEffect(() => {
    getCountriesList();
  }, []);

  const setConturyAndGetStates = async (name) => {
    setUserLocation((prevLocation) => ({
      ...prevLocation,
      countryName: name,
    }));
    setFilterCountries([]);

    const getStates = await fetch(
      `/assets/countryData/countries/${name
        .toLowerCase()
        .replace(/ /g, "-")}.json`
    );
    const stateData = await getStates.json();
    console.log(stateData, "stateData");
  };

  const filterList = (list) => {
    return (
      <ul>
        {list.map((item) => {
          return (
            <li
              key={item.code}
              onClick={() => {
                setConturyAndGetStates(item.name);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <>
      <form>
        <input
          type="text"
          name="country"
          value={location.countryName}
          onChange={getCountries}
        />
      </form>
      {filterCountries.length > 0 && filterList(filterCountries)}
    </>
  );
};
export default Weather;
