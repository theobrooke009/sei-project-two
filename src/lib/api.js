import axios from 'axios'

const baseUrl = 'https://akabab.github.io/superhero-api/api/all.json'

export function getAllHeros() {
  return axios.get(`${baseUrl}`)
}