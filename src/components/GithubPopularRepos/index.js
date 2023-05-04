import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    reposData: [],
    activeId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {activeId} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchingData = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        avatarUrl: eachRepo.avatar_url,
        starsCount: eachRepo.stars_count,
      }))

      this.setState({
        reposData: fetchingData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderRepositoryItem = () => {
    const {reposData} = this.state

    return (
      <div className="popular-repos">
        <ul className="popular-repos-data">
          {reposData.map(eachItem => (
            <RepositoryItem popularRepos={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  updatedMatchData = activeId => {
    this.setState({activeId}, this.getData)
  }

  renderLanguageFilterItem = () => {
    const {activeId} = this.state
    return (
      <ul className="language-data">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            languageData={eachItem}
            key={eachItem.id}
            updatedMatchData={this.updatedMatchData}
            isClick={activeId === eachItem.id}
          />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => (
    <div className="popular-repos">
      <h1 className="heading">Popular</h1>
      {this.renderLanguageFilterItem()}
      {this.renderRepositoryItem()}
    </div>
  )

  renderFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
      className="register-prime-image"
    />
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default GithubPopularRepos
