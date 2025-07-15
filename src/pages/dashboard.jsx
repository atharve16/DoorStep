import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, List, Grid, Filter, Eye, EyeOff } from "lucide-react";
import MapView from "./MapView";
import PropertyCard from "./propertyCard";
import FiltersSearchBar from "../components/filtersSearch";
import FiltersSidebar from "../components/filtersSidebar";
import ChatbotWidget from "../components/chatbot";
import Pagination from "../components/pagination";
import { useAuth } from "../context/authContext";

const dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-low");
  const [filters, setFilters] = useState({
    beds: "",
    baths: "",
    priceRange: "",
    sqft: "",
    yearBuilt: "",
    status: [],
    city: [],
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMapVisible, setIsMapVisible] = useState(true);
  const itemsPerPage = 6;

  const { properties, loading, error } = useAuth();

  const getPrice = (priceStr) => Number(priceStr.replace(/[^0-9.-]+/g, ""));

  const filteredData = useMemo(() => {
    return properties
      .filter((home) => {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
          home.city.toLowerCase().includes(lowerSearch) ||
          home.community.toLowerCase().includes(lowerSearch) ||
          home.builder.toLowerCase().includes(lowerSearch);

        const matchBeds = filters.beds ? home.beds >= Number(filters.beds) : true;
        const matchBaths = filters.baths
          ? home.baths >= Number(filters.baths)
          : true;
        const matchSqft = filters.sqft ? home.sqft >= Number(filters.sqft) : true;
        const matchYearBuilt = filters.yearBuilt
          ? home.yearBuilt >= Number(filters.yearBuilt)
          : true;

        const matchPriceRange = (() => {
          if (!filters.priceRange) return true;
          const [min, max] = filters.priceRange.includes("+")
            ? [
                Number(
                  filters.priceRange.replace("+", "").replace(/[^0-9]/g, "")
                ),
                Infinity,
              ]
            : filters.priceRange.split("-").map((p) => Number(p));
          const homePrice = getPrice(home.price);
          return homePrice >= min && homePrice <= max;
        })();

        const matchStatus =
          filters.status.length === 0 ||
          filters.status.includes(home.status || "Available");

        const matchCity =
          filters.city.length === 0 || filters.city.includes(home.city);

        return (
          matchesSearch &&
          matchBeds &&
          matchBaths &&
          matchSqft &&
          matchYearBuilt &&
          matchPriceRange &&
          matchStatus &&
          matchCity
        );
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return getPrice(a.price) - getPrice(b.price);
        if (sortBy === "price-high") return getPrice(b.price) - getPrice(a.price);
        if (sortBy === "sqft-low") return a.sqft - b.sqft;
        if (sortBy === "sqft-high") return b.sqft - a.sqft;
        if (sortBy === "beds") return b.beds - a.beds;
        if (sortBy === "baths") return b.baths - a.baths;
        return 0;
      });
  }, [properties, searchTerm, sortBy, filters]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <FiltersSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filters={filters}
        setFilters={setFilters}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          <div className="w-full flex">
            <div className="relative">
              <FiltersSidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                filters={filters}
                setFilters={setFilters}
              />
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Enhanced Results Header */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        New Homes
                      </h1>
                      <p className="text-gray-600 mt-1">
                        {filteredData.length} properties found
                        {currentPage > 1 && (
                          <span className="ml-2 text-sm">
                            (Page {currentPage} of {totalPages})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Map Toggle */}
                    <button
                      onClick={() => setIsMapVisible(!isMapVisible)}
                      className={`p-3 rounded-xl transition-all duration-200 ${
                        isMapVisible
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-white/80 text-gray-600 hover:bg-blue-50"
                      }`}
                      title={isMapVisible ? "Hide Map" : "Show Map"}
                    >
                      {isMapVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>

                    {/* View Mode Toggle */}
                    <div className="flex bg-white/80 rounded-xl p-1 shadow-sm">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          viewMode === "grid"
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        title="Grid View"
                      >
                        <Grid className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          viewMode === "list"
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        title="List View"
                      >
                        <List className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Layout */}
              <div className={`flex ${!isMapVisible ? 'justify-center' : ''}`}>
                {/* Map Section */}
                {isMapVisible && (
                  <div className="w-1/2 pr-4">
                    <div className="sticky top-4">
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-white/20">
                        <MapView properties={filteredData} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Properties Section */}
                <div className={`${isMapVisible ? 'w-1/2' : 'w-full max-w-6xl'}`}>
                  {currentItems.length > 0 ? (
                    <div
                      className={`grid gap-6 ${
                        viewMode === "grid"
                          ? isMapVisible
                            ? "grid-cols-1 xl:grid-cols-2"
                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                          : "grid-cols-1"
                      }`}
                    >
                      {currentItems.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="text-gray-400 text-8xl mb-4">🏠</div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No properties found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search criteria or filters
                      </p>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatbotWidget />
    </div>
  );
};

export default dashboard;