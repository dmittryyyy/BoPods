import { React } from 'react';

export const Search = ( {searchValue, setSearchValue} ) => {

    const onChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
      }

  return (
    <div className="search">
            <img src="/images/search.svg" alt="Поиск" />
          {searchValue && <span className='clearInput' onClick={() => setSearchValue('')}>X</span>}
            <input type="text" 
            placeholder='Поиск...'
            value={searchValue}
            onChange={onChangeSearchValue}/>
          </div>
  )
}
