import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const sortByPopular = ['Popular','Price: low to high','Price: high to low','Top rated first'];

function PlacesSort({currentSort, changeSort}) {
  const [isOpenList, setOpenList] = useState(false);
  const closeMenu = () => {
    document.removeEventListener('click', closeMenu);
    setOpenList(false);
  };

  useEffect(() => {
    if (isOpenList) {
      document.addEventListener('click', closeMenu);
      return () => {
        document.removeEventListener('click', closeMenu);
      };
    }
  });

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOpenList(!isOpenList)}>
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom  ${isOpenList ? 'places__options--opened' : ''}`}>
        {sortByPopular.map((sort) =>
          (
            <li className={`places__option ${sort === currentSort ? 'places__option--active' : ''}`} key={sort} tabIndex={0}
              onClick={() => {
                setOpenList(false);
                changeSort(sort);
              }}
            >
              {sort}
            </li>
          ))}
      </ul>
    </form>
  );
}

PlacesSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentSort: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  changeSort: (sortType) => dispatch(ActionCreator.sortChange(sortType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesSort);
