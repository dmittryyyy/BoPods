import React from 'react'

export const СartInfo = ({ title, img, descr }) => {
  return (
    <div>
      <h2>{title}</h2>
      <img className='cartNull' src={img} alt=''/>
      <p>{descr}</p>
    </div>
  )
}
