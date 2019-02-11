import React, { Component } from 'react'
import{
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import About from './components/About'
import Home from './components/Home'
import Products from './components/Products'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
        categories: [],
        products:[],
        category:[]
    }
  }

  getCategory = (catId) =>{
    const {categoryApi} = this.props
    categoryApi.get(catId)
    .then(res=>{
        this.setState({
            category: res.data
        })
    })
  }
  loadCategories = () =>{
      const {categoryApi} = this.props
      categoryApi.list()
      .then(res=>{
          this.setState({
              categories: res.data
          })
      })
  }

    deleteCategory = (category) =>{
      const {categoryApi} = this.props

      categoryApi.remove(category.id)
      .then(res=>{
          this.loadCategories()
      })
    }

    saveCategory = (category) => {
      const {categoryApi} = this.props

      categoryApi.save(category)
            .then(res=>{
                this.loadCategories()
            })
    }

    editCategory = (category) =>{
      const {categoryApi} = this.props
      categoryApi.edit(category, category.id)
                 .then(res=>{
                    this.loadCategories()
                  })
    }

    saveNewProduct = (product) => {
      const {productApi} = this.props
      return productApi.save(product)
    }

    listProductByCategory = (catId) =>{
      const {productApi} = this.props
      
      productApi.listByCategory(catId)
            .then(res=>{
              this.setState({
                products: res.data
              })
            })
    }

    deleteProduct = (productId) =>{
      const {productApi} = this.props

      return productApi.remove(productId)
     
    }

    editProduct = (product) =>{
      const {productApi} = this.props
      return productApi.edit(product, product.id)

    }
      
    render() {
      return (
        <Router>
        <div>
          <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
            <div className='container'>
              
              <a href='/' className='navbar-brand'>Product Manager</a>
              
                <ul className='navbar-nav mr-auto'>
                  <li className='nav-item active'>
                    <Link to='/' className='nav-link active'>Home</Link>
                  </li>
                  <li className='nav-item dropdown'>
                    <a className='nav-link dropdown-toggle' 
                       href="#a"
                                         id="dropdownProduct"
                                          role="button"
                                          data-toggle="dropdown" 
                                          aria-haspopup="true" 
                                          aria-expanded="false"
                                         >Products</a>
                    <div className="dropdown-menu" aria-labelledby="dropdownProduct">
                      <Link to={'/products'} className="dropdown-item">Show Products</Link>
                      <Link to={'/products/new'} className="dropdown-item">Add new Product</Link>
                    </div>
                  </li>
                  <li className='nav-item'>
                    <Link to='/about' className='nav-link'>About</Link>
                  </li>
                </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route path='/products' 
                render={(props)=>{
                  return <Products {...props} 
                                categories={this.state.categories}
                                products={this.state.products}
                                category={this.state.category}
                                loadCategories={this.loadCategories}
                                deleteCategory={this.deleteCategory}
                                saveCategory={this.saveCategory}
                                editCategory={this.editCategory}
                                saveNewProduct={this.saveNewProduct}
                                listProductByCategory={this.listProductByCategory}
                                getCategory={this.getCategory}
                                deleteProduct={this.deleteProduct}
                                editProduct={this.editProduct}


                  />
                }}
            />
          </div>
        </div>
        </Router>
      );
  }
}

export default App
