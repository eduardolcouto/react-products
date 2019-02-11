module.exports = () => {
    const data = { products: [],
                   categories:[]
                 }

    for (let i = 0; i < 10; i++) {
      data.categories.push({ id: i, name: `category${i}` })
    }


    for (let i = 0; i < 100; i++) {
      data.products.push({ id: i, name: `product${i}`, category: Math.floor(Math.random() * 10) + 1 , 'description':'Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam convallis cursus commodo. Sed sed facilisis leo. Morbi efficitur magna nec dapibus varius. Etiam eu dolor vulputate, efficitur ex eget, congue odio. Nunc dapibus accumsan diam id auctor. Fusce eget ipsum a ipsum euismod tempor. Nullam vitae imperdiet ante, quis cursus ligula. Cras malesuada nisi et auctor fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus.'})
    }
    return data
  }