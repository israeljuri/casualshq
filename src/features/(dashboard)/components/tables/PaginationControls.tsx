// src/features/admin/components/staff/PaginationControls.tsx
import React from 'react';
import { Button } from '@/components/molecules/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or no items
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Determine pages to show (e.g., current page, 2 before, 2 after, first, last)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Max number of page buttons (excluding prev/next)
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1); // Always show first page

      let startPage = Math.max(2, currentPage - halfPagesToShow + (currentPage === totalPages ? -1 : 0) + (currentPage === totalPages-1 ? -1 : 0));
      let endPage = Math.min(totalPages - 1, currentPage + halfPagesToShow - (currentPage === 1 ? -1 : 0) - (currentPage === 2 ? -1 : 0));
      
      if (currentPage - 1 <= halfPagesToShow) {
        endPage = Math.min(totalPages -1, maxPagesToShow-1);
      }
      if (totalPages - currentPage <= halfPagesToShow) {
        startPage = Math.max(2, totalPages - maxPagesToShow + 2);
      }


      if (startPage > 2) {
        pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages); // Always show last page
    }
    return pageNumbers;
  };

  const pageNumbersToDisplay = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-3 px-1 mt-4 border-t border-slate-200">
      <div className="text-sm text-slate-600 mb-2 sm:mb-0">
        Showing <span className="font-medium">{totalItems > 0 ? startItem : 0}</span>
        - <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>
      <nav aria-label="Pagination">
        <ul className="inline-flex items-center justify-between -space-x-px">
          <li>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-l-md h-9 w-9 p-0 border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </li>
          {pageNumbersToDisplay.map((page, index) => (
            <li key={index}>
              {page === '...' ? (
                <span className="px-3 py-1.5 h-9 text-sm text-slate-500 border border-y-slate-300 border-x-0">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? 'primary' : 'secondary'}
                  size="sm"
                  className={`h-9 w-9 p-0 border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed
                    ${currentPage === page ? 'bg-slate-800 text-white hover:bg-slate-700 z-10' : 'hover:bg-slate-100 border-x-0 border-y-slate-300'}
                  `}
                  onClick={() => onPageChange(page as number)}
                  disabled={currentPage === page}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </Button>
              )}
            </li>
          ))}
          <li>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-r-md h-9 w-9 p-0 border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

