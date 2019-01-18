module.exports = () => {
    const data = { products: [],
                   categories:[]
                 }

    for (let i = 0; i < 10; i++) {
      data.categories.push({ id: i, name: `category${i}` })
    }


    for (let i = 0; i < 100; i++) {
      data.products.push({ id: i, name: `product${i}`, category: Math.floor(Math.random() * 10) + 1 })
    }
    return data
  }