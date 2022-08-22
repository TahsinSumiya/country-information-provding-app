import { useState,useEffect } from 'react';
import './App.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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

  return (
    
   <>
   <h1>Country app</h1>
   {isLoading && <h1>{AiOutlineLoading3Quarters}</h1>}
   {error && <h2>{error}</h2>}
   </>
   
  );
}

export default App;
