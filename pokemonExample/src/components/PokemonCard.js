import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor() {
    super()
    this.state = {
      cardFace: true
    }
  }

  toggleClick = () => {
    this.setState({
      cardFace: !this.state.cardFace
    })
  }

  render() {
    let { sprites, name, stats } = this.props.pokemon
    let { front, back } = sprites
    let { cardFace } = this.state

    return (
      <Card onClick={this.toggleClick}>
        <div>
          <div className="image">
            <img alt="oh no!" src={cardFace ? front : back}/>
          </div>
          <div className="content">
            <div className="header">{name.toUpperCase()}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {stats.find(statObject => statObject.name === "hp").value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard