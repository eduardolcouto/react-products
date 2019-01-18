import React, { Component } from 'react'

class ProductNew extends Component{

    saveNewProduct = () =>{
        const product = {
            'name': this.props.ref.product,
            'category': this.props.ref.category
        }

        this.props.saveNewProduct(product)
    }

    render(){
        const { categories } = this.props
        return(
            <div>
                <h1 className='display-4'>New Product</h1>
                <select className='custom-select custom-select-sm' ref='category'>
                    <option selected>Choose a category</option>
                    {categories.map( (category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <input className='form-control mt-3' type='text' ref='product' placeholder='Enter new product'/> 
                <br />
                <button className='btn btn-primary'>Save New Product</button>
            </div>
        )
    }
}

export default ProductNew