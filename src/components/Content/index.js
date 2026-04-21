import Product from '../Product'
import './index.css'

const Content = props => {
  const {productDetails} = props

  const formatId = name => name.toLowerCase().replace(/ /g, '-')

  return (
    <ul className="content-container">
      {productDetails.map(category => (
        <li
          key={category.name}
          id={formatId(category.name)}
          className="category-section"
        >
          <h1 className="category-title">{category.name} &gt;</h1>

          <ul className="products-list">
            {category.products.map(product => (
              <Product key={product.id} details={product} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default Content
