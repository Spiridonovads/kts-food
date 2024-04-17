import React, { useState } from 'react';
import style from './style.module.scss';
import { ArrowLeftSideIcon } from 'components/Icon/ArrowIcons/ArrowLeftSideIcon';
import { ArrowRightSideIcon } from 'components/Icon/ArrowIcons/ArrowRightSideIcon';

export type PaginatorProps = {
  totalItems: number;
  itemsOnPage: number;
  onChange: (pageNumber: number) => void;
};

export const Paginator: React.FC<PaginatorProps> = ({ totalItems, itemsOnPage, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rightActive, setRightActive] = useState(true);
  const [leftActive, setLeftActive] = useState(false);
  const totalPages = Math.ceil(totalItems / itemsOnPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onChange(pageNumber);
  };
  const handlePageChangeForward = () => {
    setCurrentPage(currentPage + 1);
    onChange(currentPage + 1);
  };
  const handlePageChangeBack = () => {
    setCurrentPage(currentPage - 1);
    onChange(currentPage - 1);
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
        <button onClick={handlePageChangeBack} disabled={currentPage === 1}>
          <ArrowLeftSideIcon color={currentPage > 1 ? 'primary' : 'secondary'} />
        </button>
        <ul className={style.paginator}>{renderPageNumbers()}</ul>
        <button onClick={handlePageChangeForward} disabled={currentPage === totalPages}>
          <ArrowRightSideIcon color={currentPage < totalPages ? 'primary' : 'secondary'} />
        </button>
      </div>
    </nav>
  );
};
