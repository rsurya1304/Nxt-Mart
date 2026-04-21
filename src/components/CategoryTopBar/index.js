import {Component} from 'react'
import {GiFruitBowl, GiSodaCan, GiCakeSlice, GiCoffeeCup} from 'react-icons/gi'
import {FaBaby, FaLeaf, FaSoap, FaShoppingBag} from 'react-icons/fa'
import {MdKitchen, MdCleaningServices} from 'react-icons/md'
import {CiShoppingCart} from 'react-icons/ci'

import './index.css'

class CategoryTopBar extends Component {
  getIcon = name => {
    const value = name.toLowerCase()

    if (value.includes('fruit') || value.includes('vegetable'))
      return <GiFruitBowl />
    if (value.includes('beverage') || value.includes('drink'))
      return <GiSodaCan />
    if (value.includes('bakery') || value.includes('cake'))
      return <GiCakeSlice />
    if (value.includes('coffee') || value.includes('tea'))
      return <GiCoffeeCup />
    if (value.includes('baby')) return <FaBaby />
    if (value.includes('clean')) return <MdCleaningServices />
    if (value.includes('beauty') || value.includes('hygiene')) return <FaSoap />
    if (value.includes('kitchen')) return <MdKitchen />
    if (value.includes('grocery') || value.includes('food')) return <FaLeaf />
    if (value.includes('snack') || value.includes('chocolate'))
      return <FaShoppingBag />

    return <CiShoppingCart />
  }

  render() {
    const {categories, categoryId, onChangeCategoryId} = this.props

    return (
      <div className="topbar">
        <ul className="topbar-list">
          <li
            className={`topbar-item ${
              categoryId === 'all' ? 'active-top' : ''
            }`}
          >
            <button
              type="button"
              className="topbar-btn"
              onClick={() => onChangeCategoryId('all')}
            >
              <span className="icon">
                <CiShoppingCart />
              </span>
              <p className="label">All</p>
            </button>
          </li>

          {categories.map(item => {
            const isActive = categoryId === item.name

            return (
              <li
                key={item.name}
                className={`topbar-item ${isActive ? 'active-top' : ''}`}
              >
                <button
                  type="button"
                  className="topbar-btn"
                  onClick={() => onChangeCategoryId(item.name)}
                >
                  <span className="icon">{this.getIcon(item.name)}</span>
                  <p className="label">{item.name}</p>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default CategoryTopBar
