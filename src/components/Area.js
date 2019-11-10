import React from 'react'
import '../index.css'
import AreaCarousel from './AreaCarousel'
import AreaDropdown from './AreaDropdown'
import AreaPeople from './AreaPeople'

const Area = () => {
    return (
      <div className="container area">
        <AreaCarousel />
        <AreaDropdown />
        <AreaPeople />
      </div>
        
    )
  }
            

export default Area;
