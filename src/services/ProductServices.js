import { ApiServices } from './ApiServices'

const endpoint='products'

export const ProductServices = {
    list(){
        return ApiServices.get(endpoint)
    },

    listByCategory(categoryId){
        return ApiServices.get(`${endpoint}?category=${categoryId}`)
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
