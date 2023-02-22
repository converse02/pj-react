import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';

import { setPageCount } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';

function Pagination() {
  const currentPage = useSelector(({ filter }) => filter.pageCount);
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setPageCount(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
