import React from 'react';
import "./Styles.scss"


const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()

return (
    <footer>
      <div className='footer'>
      {year} All right reserved  
      </div>
    
    </footer>
  )
}

export default Footer
