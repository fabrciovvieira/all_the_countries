import { useEffect, useState } from 'react';

export const useBorder = (name) => {
  const [borderCountries, setBorderCountries] = useState([])

  useEffect(() => {
    const fetchBorderCountries = async () => {
      const baseURL = "https://restcountries.com/v3.1/name/";
      const finalURL = baseURL + name;
      const data = await fetch(finalURL);
      const objectData = await data.json();

      if (objectData.length > 0 && objectData[0].borders) {
        const borders = objectData[0].borders.map(border => border);
        setBorderCountries(borders);
      }
    };

    fetchBorderCountries();
  }, [name]); 

  return borderCountries;
};

export const useFindName = (lista) => {
    const [nomePaises, setNomepaises] = useState([]);
    useEffect(() => {
        const fetchListCountries = async () => {
            const baseURL = "https://restcountries.com/v2/";
            const alphaCodes = "alpha?codes=";
            const finalURL = baseURL + alphaCodes + lista.join(",");
            const data = await fetch(finalURL);
            const objectData = await data.json();
            const BorderCountries = objectData.map((e) => e);
            setNomepaises(BorderCountries)
        }

        fetchListCountries()
    }, [lista])

    return nomePaises;

}