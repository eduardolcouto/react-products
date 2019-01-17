import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom' 

import Api from './Api'

import ProductsHome from './ProductsHome'
import Category from './Category'

class Products extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            categories: []
        }
    }

    loadCategories = () =>{
        Api.loadCategories()
        .then(res=>{
            this.setState({
                categories: res.data
            })
        })
    }

    componentDidMount(){
       this.loadCategories()
    }
    
    renderCategory = (category) =>{
        return (
            <li key={category.id} className='list-group-item d-flex justify-content-between align-items-center' >
                <Link to={`/products/category/${category.id}`}
                      className='btn'>
                    {category.name}
                 </Link>
                |
                <button className='btn' onClick={() => this.deleteCategory(category)}><i className="fas fa-trash-alt text-danger"></i></button>

            </li>
        )
    }

    deleteCategory = (category) =>{
        
        Api.deleteCategory(category.id)
        .then(res=>{
            this.loadCategories()
        })
    }

    handleKeyUp = (key) =>{
        if(key.keyCode === 13){

            const category =   {
                'name':this.refs.category.value
            }

            Api.saveCategory(category)
            .then(res=>{
                this.refs.category.value = ''
                this.loadCategories()
            })
            
        }
    }
    render(){
        const { match } = this.props
        const { categories } = this.state
        return(
            <div>
                <div className='row'>
                    <h1 className='display-4'>Products</h1>
                </div>
                <div className='row'>
                    <div className='col-sm-2'>
                        <h4>Categories</h4>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className=''>
                                    <input type='text' 
                                           className='form-control'
                                           ref='category' 
                                           placeholder='Add New Category'
                                           onKeyUp={this.handleKeyUp}
                                           />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className='list-group  list-group-flush'>
                                    {categories.map(this.renderCategory)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-10'>

                        <Route exact path={match.url} component={ProductsHome} />
                        <Route exact path={match.url+'/category/:catId'} component={Category} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Products