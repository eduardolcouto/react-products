import React, { Component } from 'react'
import Api from './Api'

class Category extends Component{
    
    constructor(props){
        super(props)

        this.loadData = this.loadData.bind(this)

        this.state={
            category:{},
            products:[]
        }
    }

    loadData(id){

        Api.loadCategory(id)
            .then(res => {
                this.setState({
                    category: res.data
                })
            })
        
        Api.loadProductsByCategory(id)
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
    }

  //  componentWillReceiveProps(newProps){
   //    this.loadData(newProps.match.params.catId)
   // }   
    
    componentDidMount(){
        this.loadData(this.props.match.params.catId)
    }
    
    componentDidUpdate(prevProps){
        const {catId} = this.props.match.params
        
        if(prevProps.match.params.catId !== catId){
          this.loadData(catId)
        }        
    }

    renderProduct(product){
        return(
            <li key={product.id}>
                {product.name}
            </li>
        )
    }

    render(){
        const {category, products} = this.state
        return(
            <div>
                <h3>{category.name} </h3>
                    <ul>
                    {products.map(this.renderProduct)}
                    </ul>
            </div>

        )
    }
}

export default Category