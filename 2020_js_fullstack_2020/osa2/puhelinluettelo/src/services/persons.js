import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// Koko listan haku
const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
      id: 10000,
      name: 'This person is not saved to server',
      number: '-'
    }
    return request.then(response => response.data.concat(nonExisting))
  }

// Uusi nimi nameObjectin avulla
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

// Numeron päivitys id:n ja nameObjectin avulla
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// Nimen poisto id:n avulla
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }