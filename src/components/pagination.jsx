import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pages = generatePageNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-12 mb-8">
      <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-white/20">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex items-center space-x-1 mx-2">
          {pages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <div key={`ellipsis-${index}`} className="flex items-center justify-center w-10 h-10">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 text-sm font-medium rounded-xl transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100'
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;