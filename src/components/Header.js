import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title,onAdd, showAdd}) => {
    const onClick = (e) => {
        console.log(e)
    }
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color={showAdd ? 'red' : 'green'}
      text={showAdd ? 'Close' : 'ADD'} 
      onClick={onAdd}/>
    </header>
  )
}
Header.defaultProps = {
    title:'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

/*const headingStyle = {
    color: 'white',
    backgroundColor:'black'
}*/

export default Header

