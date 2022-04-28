import React from 'react'

export const СartInfo = ({ title, img, descr }) => {
  return (
    <div>
      <h2>{title}</h2>
      <img className='cartNull' src={img} alt="Кот с пустой миской" />
      <p>{descr}</p>
    </div>
  )
}
