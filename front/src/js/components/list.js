import React from 'react'

class List extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="p-1 mr-2" style={{display:"inline-block", width: "272px", background: "#dfe3e6", borderRadius: "3px"}}>
        <p className="ml-2" style={{color: "#17394d", fontWeight: "700"}}>List</p>
      </div>
    )
  }
}

export default List
