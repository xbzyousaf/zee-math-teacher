import React from 'react'

const AboutBox = (props) => {
  const { about } = props.tutor

  return (

    <div className="box about bd-grey" >
      <h3>About the tutor</h3>
      {/*<pre className="grey">{about}</pre>*/}
      <pre className="grey" style={{whiteSpace:'break-spaces'}} dangerouslySetInnerHTML={{ __html: about }} />
    </div>
  )
}

export default AboutBox
