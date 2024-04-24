import { useState, useEffect } from "react";
import apiFlags from '../axios/config'

export const useFetch = (url, content) => {
    const [data, setData] = useState(null);
    const [region, setRegion] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiFlags.get(content);
                const sortedDataStart = res.data.slice(0, 100).sort((a, b) => {

                    const nameA = a.name.common.toUpperCase();
                    const nameB = b.name.common.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  });
                const sortedDataMiddle = res.data.slice(100, 200).sort((a, b) => {
                    const nameA = a.name.common.toUpperCase();
                    const nameB = b.name.common.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  });
                const sortedDataEnd = res.data.slice(200).sort((a, b) => {
                    const nameA = a.name.common.toUpperCase();
                    const nameB = b.name.common.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });

                const allSortedData = sortedDataStart.concat(sortedDataMiddle, sortedDataEnd);
                setData(allSortedData);

                const uniqueRegions = allSortedData.reduce((acc, country) => {
                  if (!acc.includes(country.region)) {
                    acc.push(country.region);
                  }
                  return acc;
                }, []);
                setRegion(uniqueRegions);

            } catch (error) {
                console.log(`Mensagem de erro: ${error}`);
            }
        };

        fetchData();
    }, [url]);

    return {
        data, region
    };
};
