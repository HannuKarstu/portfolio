//FRONTEND

import axios from 'axios'
const baseUrl = '/api/persons'
//const baseUrl = 'https://safe-hamlet-02496.herokuapp.com/api/persons'
//const baseUrl = 'http://localhost:3001/persons'

// Koko listan haku
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
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