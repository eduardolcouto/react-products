import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3001/'
})

const apis = {
    loadCategories: () => api.get('categories'),
    loadCategory: (id) => api.get('categories/'+id),
    deleteCategory: (id) => api.delete('categories/'+id),
    saveCategory: (category) => api.post('categories', category),
    loadProductsByCategory: (categoryId) => api.get(`http://localhost:3001/products?category=${categoryId}`)
}

export default apis