import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class Category extends Component{

    constructor(props){
        super(props)

        this.state = {
            productEditing: {},
            redirect: false
        }

    }    
    loadData = (id) => {
        this.props.listProductByCategory(id)
        this.props.getCategory(id)

    /*    const [courses, categories] =  await Promise.all([
            CourseService.list(),
            CategoryService.list()
          ])
      
          this.setState({
            courses,
            categories
          })*/
    }

    componentDidMount(){
        
        this.loadData(this.props.match.params.catId)
    }
    
    componentDidUpdate(prevProps){
        const {catId} = this.props.match.params
        
        if(prevProps.match.params.catId !== catId){
            this.setState({
                'redirect': false
            })
          this.loadData(catId)
        }        
    }

    deleteProduct = (product) => {
        this.props.deleteProduct(product.id)
                    .then((res) => {
                        this.loadData(product.category)
                    })       
    }

    editProduct = (product) =>{

        this.setState({
            productEditing: product
        })
        
    }

    cancelEdit = () =>{
        this.setState({
            productEditing: {}
        })
    }

    saveProduct = (prodId)=>{
        const product = {
            'id': prodId,
            'name': this.refs['prodName-'+prodId].value,
            'description': this.refs['prodDescription-'+prodId].value,
            'category': this.refs['prodCategory-'+prodId].value
        }

        this.props.editProduct(product)
                  .then( (res) => {
                      this.setState({
                        productEditing: {}
                      })

                      this.setState({
                          'redirect': `/products/category/${product.category}`
                      })
                  })
       
    }

    renderProduct = (product) => {
        
        return(

            <div key={product.id}>
                { this.state.productEditing.id === product.id &&
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title" >Editing {product.name}</h5>
                            <div>
                                <input id="name" className="form-control mb-2" defaultValue={product.name} ref={'prodName-'+product.id} />
                                <textarea id="description" rows="8" className="form-control mb-2" defaultValue={product.description} ref={'prodDescription-'+product.id} />
                                <select defaultValue={product.category} className="form-control" ref={'prodCategory-'+product.id}>
                                    {this.props.categories.map((category) => <option key={category.id} value={category.id}> {category.name} </option>)}                                  )}
                                </select>
                            </div> 
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-success" type="button" onClick={()=>this.saveProduct(product.id)}>Save</button>
                            <button className="btn btn-default" type="button" onClick={this.cancelEdit} >Cancel</button>
                        </div>
                    </div>
                }
                { this.state.productEditing.id !== product.id &&
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title" >{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-warning mr-2" onClick={() => this.editProduct(product)} type="button">
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => this.deleteProduct(product)} type="button">
                                Remove
                            </button>
                        </div>
                    </div>
                }

            </div>
            
        )
    }

    render(){
        const {category, products} = this.props       
        
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }

        return(
            <div>
                <h3>{category.name} </h3>
                    <div className="card-columns">
                        {products.map(this.renderProduct)}
                    </div>
            </div>

        )
    }
}

export default Category