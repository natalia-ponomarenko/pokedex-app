const typeUrl = 'https://pokeapi.co/api/v2/type/'

export const request = (url, options = {}) => fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Pokemons weren\'t loaded')
    }

    return response.json()
  })

export async function getAllPokemon (url) {
  return new Promise(function (resolve, reject) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(new Error(error))
      })
  })
}

export async function getPokemon (url) {
  return new Promise(function (resolve, reject) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(new Error(error))
      })
  })
}

export const getTypes = () => request(typeUrl).then(data => data.results)
