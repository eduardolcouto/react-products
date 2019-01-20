import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProductNew extends Component{

    constructor(props){
        super(props)

        this.state = {
            'redirect': false
        }
    }

    saveNewProduct = () =>{

        const product = {
            'name': this.refs.product.value,
            'category': this.refs.category.value
        }

        if(product.category !== 'default'){
            this.props.saveNewProduct(product)
                .then((res) => this.setState({'redirect':'category/'+product.category}))
        }
        
    }

    render(){
        const { categories } = this.props

        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }

        return(
            <div>
                <h1 className='display-4'>New Product</h1>
                <select className='custom-select custom-select-sm' ref='category'>

                    <option value="default">Choose a category</option>

                    {categories.map( (category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <input className='form-control mt-3' type='text' ref='product' placeholder='Enter new product'/> 
                <br />
                <button className='btn btn-primary' onClick={this.saveNewProduct}>Save New Product</button>
            </div>
        )
    }
}

export default ProductNew