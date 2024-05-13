import React from "react";

const SimpleBox = (props) => {
  const box = props.box
  return (<div className="simple-box blue">
    <div>{box?.icon}</div>
    <div className="count">{box?.count}</div>
    <div className="box-name">{box?.name}</div>
    <div className="desc">{box?.description}</div>
  </div>)
}

export default SimpleBox