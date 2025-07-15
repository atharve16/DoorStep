import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  X,
  SlidersHorizontal,
  DollarSign,
  CheckCircle,
} from "lucide-react";

const filtersSidebar = ({ isOpen, setIsOpen, filters, setFilters }) => {
  const popularCities = [
    "Atlanta",
    "Miami",
    "Orlando",
    "Tampa",
    "Jacksonville",
  ];
  const statusOptions = ["Available", "Under Construction", "Sold"];
  const builderOptions = [
    "Pulte Homes",
    "David Weekley Homes",
    "Toll Brothers",
    "Lennar",
    "KB Home",
  ];

  const handleStatusChange = (status, checked) => {
    if (checked) {
      setFilters({ ...filters, status: [...filters.status, status] });
    } else {
      setFilters({
        ...filters,
        status: filters.status.filter((s) => s !== status),
      });
    }
  };

  const handleCityChange = (city, checked) => {
    if (checked) {
      setFilters({ ...filters, city: [...filters.city, city] });
    } else {
      setFilters({ ...filters, city: filters.city.filter((c) => c !== city) });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      beds: "",
      baths: "",
      priceRange: "",
      sqft: "",
      yearBuilt: "",
      status: [],
      city: [],
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-96 bg-white/95 backdrop-blur-lg shadow-2xl transform transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-800 to-purple-700 rounded-xl flex items-center justify-center">
                  <SlidersHorizontal className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Advanced Filters
                  </h2>
                  <p className="text-sm text-gray-600">Refine your search</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200/50">
                <div className="text-2xl font-bold text-blue-700">1,234</div>
                <div className="text-sm text-blue-600">Total Homes</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border border-green-200/50">
                <div className="text-2xl font-bold text-green-700">567</div>
                <div className="text-sm text-green-600">Available</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200/50">
                <div className="text-2xl font-bold text-purple-700">89</div>
                <div className="text-sm text-purple-600">New Today</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                Price Range
              </h3>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              >
                <option value="">Any Price</option>
                <option value="0-500000">Under $500K</option>
                <option value="500000-1000000">$500K - $1M</option>
                <option value="1000000-1500000">$1M - $1.5M</option>
                <option value="1500000-2000000">$1.5M - $2M</option>
                <option value="2000000+">$2M+</option>
              </select>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                Popular Cities
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {popularCities.map((city) => (
                  <label
                    key={city}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      checked={filters.city.includes(city)}
                      onChange={(e) => handleCityChange(city, e.target.checked)}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {city}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Bed className="h-5 w-5 text-purple-600 mr-2" />
                  Bedrooms
                </h3>
                <select
                  value={filters.beds}
                  onChange={(e) =>
                    setFilters({ ...filters, beds: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Bath className="h-5 w-5 text-blue-600 mr-2" />
                  Bathrooms
                </h3>
                <select
                  value={filters.baths}
                  onChange={(e) =>
                    setFilters({ ...filters, baths: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Square className="h-5 w-5 text-orange-600 mr-2" />
                Minimum Square Feet
              </h3>
              <input
                type="number"
                value={filters.sqft}
                onChange={(e) =>
                  setFilters({ ...filters, sqft: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                placeholder="e.g. 2000"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 text-green-600 mr-2" />
                Year Built (Minimum)
              </h3>
              <input
                type="number"
                value={filters.yearBuilt}
                onChange={(e) =>
                  setFilters({ ...filters, yearBuilt: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                placeholder="e.g. 2020"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Availability Status
              </h3>
              <div className="space-y-2">
                {statusOptions.map((status) => (
                  <label
                    key={status}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      checked={filters.status.includes(status)}
                      onChange={(e) =>
                        handleStatusChange(status, e.target.checked)
                      }
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-gradient-to-r from-blue-800 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default filtersSidebar;
