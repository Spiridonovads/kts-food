import * as React from 'react';
import { useState } from 'react';
import ArrowLeftSideIcon from 'components/Icon/ArrowIcons/ArrowLeftSideIcon';
import ArrowRightSideIcon from 'components/Icon/ArrowIcons/ArrowRightSideIcon';
import style from './style.module.scss';

export type PaginatorProps = {
  totalItems: number;
  itemsOnPage: number;
  onChange: (pageNumber: number) => void;
};

const Paginator: React.FC<PaginatorProps> = ({ totalItems, itemsOnPage, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsOnPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? style.active : ''}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>,
      );
    }

    return pageNumbers;
  };

  return (
    <nav className={style.nav}>
      <div className={style.paginator}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ArrowLeftSideIcon color={currentPage > 1 ? 'primary' : 'secondary'} />
        </button>
        <ul className={style.paginator}>{renderPageNumbers()}</ul>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <ArrowRightSideIcon color={currentPage < totalPages ? 'primary' : 'secondary'} />
        </button>
      </div>
    </nav>
  );
};

export default Paginator;
