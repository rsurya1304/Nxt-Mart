import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import Content from '../Content'
import CategorySidebar from '../CategorySidebar'
import CategoryTopBar from '../CategoryTopBar'

import './index.css'

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.INITIAL,
    productsData: [],
    categoryId: 'all',
  }

  contentRef = null

  componentDidMount() {
    this.getProducts()
  }

  onChangeCategoryId = id => {
    this.setState({categoryId: id}, () => {
      if (!this.contentRef) return

      if (id === 'all') {
        this.contentRef.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
        return
      }

      const formattedId = id.toLowerCase().replace(/ /g, '-')
      const element = document.getElementById(formattedId)

      if (element) {
        const containerRect = this.contentRef.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()

        const scrollTop =
          this.contentRef.scrollTop + (elementRect.top - containerRect.top)

        this.contentRef.scrollTo({
          top: scrollTop - 10,
          behavior: 'smooth',
        })
      }
    })
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.LOADING})

    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch(
      'https://apis2.ccbp.in/nxt-mart/category-list-details',
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    )

    if (response.ok) {
      const data = await response.json()

      this.setState({
        productsData: data.categories,
        apiStatus: apiStatusConstants.SUCCESS,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.FAILURE,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1718269991/nxtMart/eutnohgrrguctkbjqecr.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble. Please try again</p>
      <button type="button" className="retry-btn" onClick={this.getProducts}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {productsData, categoryId} = this.state

    return (
      <div className="home-layout">
        <CategorySidebar
          categories={productsData}
          categoryId={categoryId}
          onChangeCategoryId={this.onChangeCategoryId}
        />

        <div
          className="products-section"
          ref={ref => {
            this.contentRef = ref
          }}
        >
          <CategoryTopBar
            categories={productsData}
            categoryId={categoryId}
            onChangeCategoryId={this.onChangeCategoryId}
          />

          <Content productDetails={productsData} />
        </div>
      </div>
    )
  }

  renderUI = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.LOADING:
        return this.renderLoader()
      case apiStatusConstants.SUCCESS:
        return this.renderSuccess()
      case apiStatusConstants.FAILURE:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderUI()}
        <Footer />
      </div>
    )
  }
}

export default Home
