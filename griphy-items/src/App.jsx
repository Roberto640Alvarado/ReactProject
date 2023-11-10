import { useEffect, useState } from 'react';
import './App.css';

const BASE_URL_CAT = "https://catfact.ninja/fact";
const GIPHY_API_KEY = "vF8hKAxNqJETT4yHjmFzsE2OdxEME9Nc";

function App() {
  const [cat, setCat] = useState(""); //Gato random
  const [giphy, setGiphy] = useState(""); //Gift

  const giphy_endpoint = (threeWords) => {
    fetch(`https://api.giphy.com/v1/gifs/search?q=${threeWords}&api_key=${GIPHY_API_KEY}`)
      .then(res => res.json())
      .then(response => setGiphy(response.data[0].images.original.url))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    fetch(BASE_URL_CAT)
      .then(res => res.json())
      .then(data => {
        setCat(data.fact);

        // Obtener las primeras 3 palabras
        const threeWords = data.fact.split(" ").slice(0, 3).join(" ");

        // Pasarle a la segunda petición las 3 palabras
        giphy_endpoint(threeWords);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='container'>
      <img src={giphy} alt="Gif" style={{width:"200px", height: "200px"}}/>
      <p>{cat}</p>
      
    </div>
  )
}

export default App;

