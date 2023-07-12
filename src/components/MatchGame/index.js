import {Component} from 'react'
import './index.css'
import ScoreCard from '../ScoreCard'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {imagesList} = this.props

    this.state = {
      timer: 60,
      score: 0,
      activeImageUrl: imagesList[0].imageUrl,
      category: 'FRUIT',
      isState: false,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      const {timer} = this.state
      if (timer !== 0) {
        this.setState(prevState => ({timer: prevState.timer - 1}))
      } else {
        clearInterval(this.timerId)
        this.setState({isState: true})
      }
    }, 1000)
  }

  playAgain = () => {
    const {imagesList} = this.props
    console.log('Play again called')
    this.setState({
      isState: false,
      score: 0,
      timer: 60,
      activeImageUrl: imagesList[0].imageUrl,
      category: 'FRUIT',
    })
  }

  // timerChange = () => {

  clickThumbnailImage = thumbnail => {
    const {imagesList} = this.props
    const {activeImageUrl} = this.state
    const filter = imagesList.find(each => each.imageUrl === activeImageUrl)
    const isTrue = filter.thumbnailUrl === thumbnail
    // const filterList = imagesList.filter(each => each.category === category)
    const randomIndex = Math.floor(Math.random() * imagesList.length)
    const newImageUrl = imagesList[randomIndex].imageUrl
    if (isTrue) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        activeImageUrl: newImageUrl,
      }))
    } else {
      this.setState({isState: true})
    }
  }

  navbar = () => {
    const {timer, score} = this.state
    return (
      <div className="navbar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
          className="website-logo"
        />

        <ul className="score-container">
          <li>
            <p>
              Score: <span>{score}</span>
            </p>
          </li>
          <li>
            <div className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-img"
              />

              <p>{timer} sec</p>
            </div>
          </li>
        </ul>
      </div>
    )
  }

  renderTabList = () => {
    const {tabsList} = this.props
    const {category} = this.state

    return (
      <ul className="tab-list-container">
        {tabsList.map(eachTab => (
          <li key={eachTab.tabId}>
            <button
              type="button"
              className={`tab-item ${
                category === eachTab.tabId ? 'highlighted-text' : ''
              }`}
              onClick={() => this.setState({category: eachTab.tabId})}
            >
              {eachTab.displayText}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  renderThumbnailList = () => {
    const {imagesList} = this.props
    const {category} = this.state
    const filterList = imagesList.filter(
      eachImage => eachImage.category === category,
    )

    return (
      <ul>
        {filterList.map(eachImage => (
          <li key={eachImage.id}>
            <button
              type="button"
              onClick={this.clickThumbnailImage.bind(
                this,
                eachImage.thumbnailUrl,
              )}
            >
              <img
                alt="thumbnail"
                src={eachImage.thumbnailUrl}
                className="thumbnail-image"
              />
            </button>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {activeImageUrl, isState, score} = this.state
    return (
      <div className="app-container">
        {this.navbar()}

        {!isState ? (
          <div>
            <img
              src={activeImageUrl}
              alt="match"
              height="300px"
              width="300px"
            />
            {this.renderTabList()}
            {this.renderThumbnailList()}
          </div>
        ) : (
          <ScoreCard score={score} playAgain={this.playAgain} />
        )}
      </div>
    )
  }
}

export default MatchGame
