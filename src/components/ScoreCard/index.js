import './index.css'

const ScoreCard = props => {
  const {score, playAgain} = props
  const resetGame = () => {
    playAgain()
  }

  return (
    <div className="score-card-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        alt="trophy"
        height="200px"
        width="200px"
      />
      <p>Your Score</p>
      <p>{score}</p>
      <button type="button" onClick={resetGame}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
          height="20px"
          width="20px"
          alt="reset"
        />
        Play Again
      </button>
    </div>
  )
}

export default ScoreCard
