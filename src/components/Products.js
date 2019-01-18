import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom' 

import ProductsHome from './ProductsHome'
import Category from './Category'
import ProductNew from './ProductNew'

class Products extends Component{

    constructor(props){
        super(props)

        this.state = {
            categoryEditing:''
        }
    }
    
    componentDidMount(){
       this.props.loadCategories()
    }

    editCategory = (category) =>{
        this.setState({
            categoryEditing: category.id
        })
    }

    handleEditCategoryKeyUp = (key) =>{
        if(key.keyCode === 13){
    
            const category =   {
                'id': this.state.categoryEditing,
                'name':this.refs['cat-'+this.state.categoryEditing].value
            }
            
            this.props.editCategory(category)

            this.setState({
                categoryEditing: ''
            })
            
        }
      }
      
      cancelEdit = () =>{
        this.setState({
            categoryEditing: ''
        })
      }
    renderCategory = (category) =>{
        return (
            <li key={category.id} className='list-group-item d-flex justify-content-between align-items-center' >
                { this.state.categoryEditing === category.id &&
                    <div>
                        <div className="input-group">
                            <input type='text' className='form-control' ref={'cat-'+category.id} defaultValue={category.name} onKeyUp={this.handleEditCategoryKeyUp} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.cancelEdit}>X</button>
                            </div>
                        </div>
                    </div>
                }

                { this.state.categoryEditing !== category.id &&
                    <div>
                        <Link to={`/products/category/${category.id}`}
                            className='btn'>
                            {category.name}
                        </Link>
                        |
                        <button className='btn' onClick={() => this.props.deleteCategory(category)}><i className="fas fa-trash-alt text-danger"></i></button>
                        <button className='btn' onClick={() => this.editCategory(category)}><i className="fas fa-edit text-warning"></i></button>
                    </div>
                }
            </li>
        )
    }

    handleKeyUp = (key) =>{
        if(key.keyCode === 13){
    
            const category =   {
                'name':this.refs.category.value
            }
            
            this.props.saveCategory(category)

            this.refs.category.value = ''
            
        }
      }

    render(){
        const { match } = this.props
        const { categories } = this.props
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
                        <Route exact path={match.url+'/category/:catId'} render={(props) => {
                            return (
                                <Category {...props} 
                                      listProductByCategory={this.props.listProductByCategory}
                                      getCategory={this.props.getCategory}
                                      products={this.props.products}
                                      category={this.props.category} />
                            )
                        }} />
                        <Route exact path={match.url+'/new'} render={(props) => {
                            return (
                                <ProductNew {...props} 
                                            categories={categories}
                                            saveNewProduct={this.props.saveNewProduct}
                                />
                            )
                        }}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Products