const typeUrl = 'https://pokeapi.co/api/v2/type/'
const URL_ALL = 'https://pokeapi.co/api/v2/pokemon/?limit=1118'

export const request = (url, options = {}) => fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Pokemons weren\'t loaded')
    }

    return response.json()
  })

export const getAllPokemons = () => request(URL_ALL).then(data => data)
export const getTypes = () => request(typeUrl).then(data => data.results)
