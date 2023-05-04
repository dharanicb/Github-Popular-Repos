// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {popularRepos} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = popularRepos
  return (
    <li className="list-repo-container">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="name">{name}</h1>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars"
        />
        <p className="count">{issuesCount} issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
