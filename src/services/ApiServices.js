import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3001/'
})
export const ApiServices = {
    get(endpoint){
        return api.get(endpoint)
    },
    post(endpoint,data){
        return api.post(endpoint,data)
    },
    update(endpoint,data,id){
        return api.put(`${endpoint}/${id}`,data)
    },
    delete(endpoint, id){
        return api.delete(`${endpoint}/${id}`)
    }
}