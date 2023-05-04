// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageData, updatedMatchData, isClick} = props
  const {language, id} = languageData

  const selectedName = isClick
    ? 'language-button add-button'
    : 'language-button'

  const selectData = () => {
    updatedMatchData(id)
  }

  return (
    <li className="list-button-container">
      <button type="button" className={selectedName} onClick={selectData}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
