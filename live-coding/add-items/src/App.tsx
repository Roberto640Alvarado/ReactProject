import { useState } from 'react'
import './App.css'

const INITIAL_ITEMS = [
  {
    id: crypto.randomUUID(),
    text: 'Libro 1'
  },
  {
    id: crypto.randomUUID(),
    text: 'Libro 2'
  },
  {
    id: crypto.randomUUID(),
    text: 'Libro 3'
  }
]

function App() {

  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {elements} = event.currentTarget;
    const input = elements.namedItem('item');
    const isInput = input instanceof HTMLInputElement;

    if(!isInput || input === null) return; 

    const newItem = {
      id: crypto.randomUUID(),
      text: input.value
    }

    input.value = '';

    setItems(prevItems => {
      return [...prevItems, newItem]
    })
  }

  const deleteHandle = (id: string) => {
    return () => {
      setItems(prevItems => {
        return prevItems.filter(item => item.id !== id)
      })
    }
  }

  return (
    <main>
      <aside>
        <h1>Prueba Técnica</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Elemento a introducir:
            <input 
            name="item"
            type="text"
            required
            placeholder='Libros'/>
          </label>
          <button type="submit">Añadir</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>
        <ul>
          {
            items.length === 0 ? ( 
            <li>No hay elementos</li> ) : ( 
            items.map(item =>  {
              return (
                <li key = {item.id}>
                  {item.text}
                  <button onClick={deleteHandle(item.id)}>
                    Eliminar
                  </button>
                </li>
              )

            }))
          }
          
        </ul>

      </section>
      
    </main>
  )
}

export default App
