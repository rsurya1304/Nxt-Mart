import {Component} from 'react'
import './index.css'

class CategorySidebar extends Component {
  render() {
    const {categories, categoryId, onChangeCategoryId} = this.props

    return (
      <div className="sidebar">
        <h1 className="sidebar-heading">Categories</h1>

        <ul className="sidebar-list">
          <li
            className={`sidebar-item ${
              categoryId === 'all' ? 'active-item' : ''
            }`}
          >
            <button
              type="button"
              className="sidebar-link"
              onClick={() => onChangeCategoryId('all')}
            >
              All
            </button>
          </li>

          {categories.map(item => {
            const isActive = categoryId === item.name

            return (
              <li
                key={item.name}
                className={`sidebar-item ${isActive ? 'active-item' : ''}`}
              >
                <button
                  type="button"
                  className="sidebar-link"
                  onClick={() => onChangeCategoryId(item.name)}
                >
                  {item.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default CategorySidebar
