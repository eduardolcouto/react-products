import React, { Component } from 'react'


class Category extends Component{
    
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
        const {category, products} = this.props
        
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