import { ApiServices } from './ApiServices'

const endpoint='categories'

export const CategoryServices = {
    list(){
        return ApiServices.get(endpoint)
    },

    get(categoryId){
        return ApiServices.get(`${endpoint}/${categoryId}`)
    },

    save(data){
        return ApiServices.post(endpoint, data);
    },

    edit(data,id){
        return ApiServices.update(endpoint,data,id)
    },

    remove(id){
        return ApiServices.delete(endpoint, id)
    }
}
