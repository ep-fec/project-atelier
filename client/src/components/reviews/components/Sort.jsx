import React, { useState } from 'react';

const Sort = ({sort, setSort, reviewsAmount}) => {

  const displayText = {
    newest: 'most recent',
    relevant: 'relevance',
    helpful: 'helpfulness'
  }

  const [display, setDisplay] = useState({ 'display': 'none' });
  const [showSort, setShowSort] = useState(false);

  const openDropdown = () => {
    setDisplay({'display': 'block'});
    setShowSort(true);
    addListener();
  }

  const addListener = () => {
    document.addEventListener('mouseup', function () {
      setShowSort(false);
      setDisplay({ 'display': 'none' })
    }, { once: true });
  }

  const handleSortChange = (newSort) => {
    setShowSort(false);
    setSort(newSort);
  };

  return (
    <div className="reviews sort-options-container">

      <span className="reviews sort-options">{reviewsAmount} reviews, sorted by </span>

      <div className="reviews sort-dropdown" onClick={() => openDropdown()}>
        <span className="reviews current-sort">{displayText[sort]}</span>
        <span className="sort-arrow"> ▾ </span>

        {showSort ?
        <div className="sort-dropdown-content" style={display}>
          {sort === 'newest' ? null :
              <><span className="sort-menu-option" onMouseDown={() => handleSortChange('newest')}>Newest</span>
              <hr className="sort-options-divider"/></>}
          {sort === 'relevant' ? null :
              <><span className="sort-menu-option" onMouseDown={() => handleSortChange('relevant')}>Relevant</span>
              <hr className="sort-options-divider" /></>}
          {sort === 'helpful' ? null :
              <span className="sort-menu-option" onMouseDown={() => handleSortChange('helpful')}>Helpful</span>}
        </div>
        : null}

      </div>

    </div>
  )
}

export default Sort;