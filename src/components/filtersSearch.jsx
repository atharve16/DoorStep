import {
  Search,
  SlidersHorizontal,
  ArrowUpDown
} from "lucide-react";

const filtersSearch = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  filters,
  setFilters,
  setIsSidebarOpen,
  resultsCount
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by city, community, builder, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <kbd className="hidden sm:inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded border">⌘K</kbd>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-wrap items-center gap-3">
              {/* Quick Filter Pills */}
              <div className="flex items-center space-x-2">
                <select
                  value={filters.beds}
                  onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="">Any Beds</option>
                  <option value="1">1+ Beds</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
                <select
                  value={filters.baths}
                  onChange={(e) => setFilters({ ...filters, baths: e.target.value })}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="">Any Baths</option>
                  <option value="1">1+ Baths</option>
                  <option value="2">2+ Baths</option>
                  <option value="3">3+ Baths</option>
                  <option value="4">4+ Baths</option>
                </select>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="">Any Price</option>
                  <option value="0-500000">Under $500K</option>
                  <option value="500000-1000000">$500K - $1M</option>
                  <option value="1000000-1500000">$1M - $1.5M</option>
                  <option value="1500000-2000000">$1.5M - $2M</option>
                  <option value="2000000+">$2M+</option>
                </select>
              </div>

              {/* Advanced Filters Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-800 to-purple-700 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Advanced Filters</span>
              </button>
            </div>

            {/* Sort and Results Count */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{resultsCount}</span> homes found
              </div>
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="sqft-low">Size: Small to Large</option>
                  <option value="sqft-high">Size: Large to Small</option>
                  <option value="beds">Most Bedrooms</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default filtersSearch;