import { useState,useEffect } from 'react';
import './App.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Countries from './component/Countries';
import Search from './component/Search'
function App() {
  const url = "https://restcountries.com/v3.1/all";
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError]=useState(null);
  const [countries,setCountries]=useState([]);
  

  const fetchData = async (url) =>{
    setIsLoading(true);

   try {
    const response = await fetch(url);
    const data = await response.json();
    setCountries(data)
    setIsLoading(false)
    setError(null)
    console.log(countries)

   } catch (error) {
    setIsLoading(false)
    setError(error)
   }
  }

  useEffect (()=>{
    fetchData(url)
    },[])

    const handleRemoveCountry=(name)=>{
      const filter = countries.filter((country)=>country.name.common !== name);
      setCountries(filter)

    }

    const handleSearch=(searchhValue)=>{
      let value=searchhValue.toLowerCase()
      const newCountries = countries.filter((country)=>{
        const countryName = country.name.common.toLowerCase()
        return countryName.startsWith(value)
      })
      setCountries(newCountries)
    }

  return (
    
   <>
  <h1>Country app</h1>
  <Search onSearch={handleSearch}/>
   {isLoading && <h1><AiOutlineLoading3Quarters/></h1>}
   {error && <h2>{error.message}</h2>}
   {countries && <Countries countries={countries} onRemoveCountry={handleRemoveCountry}/> }
   </>
   
  );
}

export default App;
