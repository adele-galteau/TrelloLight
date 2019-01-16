import React from 'react'
import Card from './card'
import { v4 as uuid4 } from 'uuid'

class List extends React.Component {
  constructor(props) {
    super(props)

    this.list = this.props.list
  }

  render() {
    return (
      <div className="p-1 mr-2 mb-3" style={{display:"inline-block", width: "272px", background: "#dfe3e6", borderRadius: "3px"}}>
        <h2 className="m-0" style={{color: "#17394d", fontWeight: "700", fontSize: "14px", padding: "10px 8px 10px 14px"}}>{this.list.title}</h2>

        {
          this.list.cards.map(card => (
            <Card key={uuid4()} card={card}/>
          ))
        }

      </div>
    )
  }
}

export default List
