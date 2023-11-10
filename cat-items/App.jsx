import React, { useEffect, useState } from 'react';

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT = `https://cataas.com/cat/says/${text}`;

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App (){
    const [fact, setFact] = useState();
    const [imageUrl, setImageUrl] = useState()



    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(response => response.json())
        .then(dat =>  {
            const { fact } = dat;
            setFact(fact);

            if(!fact) return;

            //Obtener la primera palabra
            const firstWord = fact.split(' ')[0];
            //Obtener las primeras 3 palabras
            //const ThreeWord = fact.split(' ',3);

            fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red`)
            .then(res => res.json())
            .then(response => {
          const { url} = response
           setImageUrl(url)
           console.log(response)
           console.log(url)
           
        })
      })
             
    }, [])
    return(
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt='cat'/>}
        </main>
    )
}