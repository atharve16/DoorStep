import { useState } from "react";
import {
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Camera,
  ArrowRight,
  Building,
  TreePine,
  Ruler,
  DollarSign,
} from "lucide-react";

const PropertyCard = ({ property }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
  };

  const handleViewDetails = () => {
    console.log("View details for:", property.id);
  };

  const handleContact = (type) => {
    if (type === 'phone') {
      window.open(`tel:${property.phone || '555-0123'}`);
    } else if (type === 'email') {
      window.open(`mailto:${property.email || 'info@example.com'}`);
    }
  };

  return (
    <div 
      className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Image Section with Enhanced Overlay */}
      <div className="relative overflow-hidden h-72">
        {/* Image */}
        <div className="relative h-full">
          <img
            src={property.images || "https://via.placeholder.com/400x300/e2e8f0/64748b?text=Property+Image"}
            alt={property.planName}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
          )}
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              {property.status || "Available"}
            </span>
            {property.featured && (
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Featured
              </span>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleFavorite}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 ${
              isFavorited 
                ? "bg-red-500/90 text-white shadow-lg scale-110" 
                : "bg-white/80 text-gray-700 hover:bg-red-500/90 hover:text-white shadow-lg"
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleShare}
            className="p-3 rounded-full bg-white/80 backdrop-blur-md text-gray-700 hover:bg-blue-500/90 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Photo Count */}
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
            <Camera className="h-4 w-4 mr-1" />
            <span>{property.photoCount || 12}</span>
          </div>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-600 mr-1" />
              <span className="text-2xl font-bold text-gray-900">
                {property.price || "$0"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title and Builder */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {property.planName || "Beautiful Home"}
          </h3>
          <div className="flex items-center text-gray-600">
            <Building className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{property.builder || "Builder Name"}</span>
          </div>
        </div>

        {/* Location with Enhanced Design */}
        <div className="flex items-start space-x-2">
          <MapPin className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p className="font-medium">{property.community || "Community Name"}</p>
            <p>{property.city || "City"}, {property.state || "State"} {property.zipCode || "00000"}</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 bg-blue-50 rounded-xl p-3">
            <Bed className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{property.beds || 0}</p>
              <p className="text-xs text-gray-600">Bedrooms</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-purple-50 rounded-xl p-3">
            <Bath className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{property.baths || 0}</p>
              <p className="text-xs text-gray-600">Bathrooms</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-green-50 rounded-xl p-3">
            <Square className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{property.sqft || 0}</p>
              <p className="text-xs text-gray-600">Sq Ft</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-amber-50 rounded-xl p-3">
            <Calendar className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{property.yearBuilt || "2024"}</p>
              <p className="text-xs text-gray-600">Built</p>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <TreePine className="h-4 w-4 mr-1 text-green-600" />
              <span>{property.lotSize || "0.25 acres"}</span>
            </div>
            <div className="flex items-center">
              <Ruler className="h-4 w-4 mr-1 text-blue-600" />
              <span>{property.stories || 2} stories</span>
            </div>
          </div>
          <div className="flex items-center text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">+5.2% value</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <button 
            onClick={handleViewDetails}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center group"
          >
            View Details
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleContact('phone');
            }}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            <Phone className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleContact('email');
            }}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5 group"
          >
            <Mail className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;