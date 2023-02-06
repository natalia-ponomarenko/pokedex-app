import { typeUrl, URL_ALL } from './constants'

export const request = (url, options = {}) => fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Pokemons weren\'t loaded')
    }

    return response.json()
  })

export const getAllPokemons = () => request(URL_ALL).then(data => data)
export const getTypes = () => request(typeUrl).then(data => data.results)
