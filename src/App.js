import React, { Component } from 'react'
import{
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import About from './About'
import Home from './Home'
import Products from './Products'

class App extends Component {
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
                <li className='nav-item'>
                  <Link to='/products' className='nav-link'>Products</Link>
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
          <Route path='/products' component={Products} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App
