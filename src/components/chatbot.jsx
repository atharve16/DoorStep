import { useState } from "react";
import { MessageCircle, X, ChevronLeft } from "lucide-react";

const FlowChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm your real estate assistant. Let me help you find your perfect property!",
    },
  ]);
  const [currentFlow, setCurrentFlow] = useState("initial");
  const [history, setHistory] = useState([]);

  const flowData = {
    initial: {
      questions: [
        { id: "buy", text: "I want to buy a property" },
        { id: "rent", text: "I want to rent a property" },
        { id: "sell", text: "I want to sell my property" },
        { id: "info", text: "General information" },
      ],
    },
    buy: {
      response:
        "Great! Let's find your dream home. What type of property interests you?",
      questions: [
        { id: "buy_house", text: "Single-family house" },
        { id: "buy_condo", text: "Condo/Apartment" },
        { id: "buy_land", text: "Land/Plot" },
        { id: "buy_commercial", text: "Commercial property" },
      ],
    },
    rent: {
      response:
        "Perfect! I'll help you find a rental. What are you looking for?",
      questions: [
        { id: "rent_apartment", text: "Apartment" },
        { id: "rent_house", text: "House" },
        { id: "rent_studio", text: "Studio" },
        { id: "rent_shared", text: "Shared accommodation" },
      ],
    },
    sell: {
      response: "I can help you sell! Let me understand your property better.",
      questions: [
        { id: "sell_valuation", text: "Get property valuation" },
        { id: "sell_listing", text: "List my property" },
        { id: "sell_tips", text: "Selling tips & advice" },
        { id: "sell_agent", text: "Connect with an agent" },
      ],
    },
    info: {
      response: "What information would you like to know about real estate?",
      questions: [
        { id: "info_market", text: "Market trends" },
        { id: "info_financing", text: "Financing options" },
        { id: "info_legal", text: "Legal requirements" },
        { id: "info_investment", text: "Investment advice" },
      ],
    },
    buy_house: {
      response:
        "Excellent choice! Single-family homes offer privacy and space. What's your priority?",
      questions: [
        { id: "buy_house_budget", text: "Budget-friendly options" },
        { id: "buy_house_luxury", text: "Luxury properties" },
        { id: "buy_house_location", text: "Specific locations" },
        { id: "buy_house_new", text: "Newly constructed" },
      ],
    },
    buy_condo: {
      response:
        "Condos are great for low-maintenance living! What matters most to you?",
      questions: [
        { id: "buy_condo_amenities", text: "Building amenities" },
        { id: "buy_condo_downtown", text: "Downtown locations" },
        { id: "buy_condo_view", text: "Premium views" },
        { id: "buy_condo_investment", text: "Investment potential" },
      ],
    },
    buy_land: {
      response:
        "Land investment is smart! Looking to build or invest long-term?",
      questions: [
        { id: "buy_land_residential", text: "Residential development" },
        { id: "buy_land_agricultural", text: "Agricultural land" },
        { id: "buy_land_commercial", text: "Commercial development" },
        { id: "buy_land_investment", text: "Investment holding" },
      ],
    },
    buy_commercial: {
      response:
        "Commercial properties can be lucrative! What type interests you most?",
      questions: [
        { id: "buy_comm_office", text: "Office spaces" },
        { id: "buy_comm_retail", text: "Retail stores" },
        { id: "buy_comm_warehouse", text: "Warehouse/Industrial" },
        { id: "buy_comm_mixed", text: "Mixed-use buildings" },
      ],
    },
    rent_apartment: {
      response:
        "Apartments are popular! We have many options available. Bedroom preference?",
      questions: [
        { id: "rent_apt_studio", text: "Studio" },
        { id: "rent_apt_1br", text: "1 Bedroom" },
        { id: "rent_apt_2br", text: "2 Bedrooms" },
        { id: "rent_apt_3br", text: "3+ Bedrooms" },
      ],
    },
    rent_house: {
      response: "Houses offer more space and privacy! What size works for you?",
      questions: [
        { id: "rent_house_small", text: "2 bedrooms" },
        { id: "rent_house_medium", text: "3 bedrooms" },
        { id: "rent_house_large", text: "4+ bedrooms" },
        { id: "rent_house_furnished", text: "Furnished options" },
      ],
    },
    rent_studio: {
      response:
        "Studios are perfect for singles or couples! Budget and location priorities?",
      questions: [
        { id: "rent_studio_budget", text: "Budget-friendly" },
        { id: "rent_studio_downtown", text: "Downtown/City center" },
        { id: "rent_studio_modern", text: "Modern/Renovated" },
        { id: "rent_studio_utilities", text: "Utilities included" },
      ],
    },
    rent_shared: {
      response:
        "Shared living is cost-effective! What arrangement suits you best?",
      questions: [
        { id: "rent_shared_room", text: "Private room" },
        { id: "rent_shared_coliving", text: "Co-living spaces" },
        { id: "rent_shared_students", text: "Student housing" },
        { id: "rent_shared_short", text: "Short-term stays" },
      ],
    },
    sell_valuation: {
      response:
        "Free valuation available! We'll assess your property's current market value accurately.",
      questions: [
        { id: "back", text: "← Back to selling options" },
        { id: "initial", text: "Start over" },
      ],
    },
    sell_listing: {
      response:
        "Let's list your property! We'll create an attractive listing to reach buyers.",
      questions: [
        { id: "back", text: "← Back to selling options" },
        { id: "initial", text: "Start over" },
      ],
    },
    sell_tips: {
      response:
        "Staging, pricing right, and quality photos increase sale chances by 50%!",
      questions: [
        { id: "back", text: "← Back to selling options" },
        { id: "initial", text: "Start over" },
      ],
    },
    sell_agent: {
      response:
        "Our experienced agents will guide you through the entire selling process successfully.",
      questions: [
        { id: "back", text: "← Back to selling options" },
        { id: "initial", text: "Start over" },
      ],
    },
    info_market: {
      response:
        "Current market shows 5% growth. Buyer demand high in suburbs, stable downtown.",
      questions: [
        { id: "back", text: "← Back to information" },
        { id: "initial", text: "Start over" },
      ],
    },
    info_financing: {
      response:
        "Options include mortgages, FHA loans, VA loans. Rates currently 6-7% average.",
      questions: [
        { id: "back", text: "← Back to information" },
        { id: "initial", text: "Start over" },
      ],
    },
    info_legal: {
      response:
        "You'll need: contracts, inspections, title search, insurance, and proper documentation.",
      questions: [
        { id: "back", text: "← Back to information" },
        { id: "initial", text: "Start over" },
      ],
    },
    info_investment: {
      response:
        "Best ROI: rental properties, fix-and-flip, REITs. Diversification recommended for stability.",
      questions: [
        { id: "back", text: "← Back to information" },
        { id: "initial", text: "Start over" },
      ],
    },
  };

  const terminalNodes = [
    "buy_house_budget",
    "buy_house_luxury",
    "buy_house_location",
    "buy_house_new",
    "buy_condo_amenities",
    "buy_condo_downtown",
    "buy_condo_view",
    "buy_condo_investment",
    "buy_land_residential",
    "buy_land_agricultural",
    "buy_land_commercial",
    "buy_land_investment",
    "buy_comm_office",
    "buy_comm_retail",
    "buy_comm_warehouse",
    "buy_comm_mixed",
    "rent_apt_studio",
    "rent_apt_1br",
    "rent_apt_2br",
    "rent_apt_3br",
    "rent_house_small",
    "rent_house_medium",
    "rent_house_large",
    "rent_house_furnished",
    "rent_studio_budget",
    "rent_studio_downtown",
    "rent_studio_modern",
    "rent_studio_utilities",
    "rent_shared_room",
    "rent_shared_coliving",
    "rent_shared_students",
    "rent_shared_short",
  ];

  const terminalResponses = {
    buy_house_budget:
      "Found 47 affordable homes! Prices from $180K-$350K with great neighborhoods nearby.",
    buy_house_luxury:
      "12 luxury estates available! Premium features, $800K+ with pools and smart homes.",
    buy_house_location:
      "Choose your area! We cover downtown, suburbs, waterfront, and mountain view locations.",
    buy_house_new:
      "23 new constructions ready! Modern designs, warranties included, move-in ready soon.",
    buy_condo_amenities:
      "Condos with gym, pool, concierge available! Starting $250K in prime buildings.",
    buy_condo_downtown:
      "Downtown condos from $220K! Walking distance to shops, transit, and entertainment.",
    buy_condo_view:
      "Stunning view units available! City skyline, ocean, or mountain views from $300K.",
    buy_condo_investment:
      "High ROI condos identified! Rental demand strong, appreciation projected at 8%.",
    buy_land_residential:
      "Residential plots from 0.25-2 acres! Zoned ready, utilities nearby, $50K-$200K.",
    buy_land_agricultural:
      "Agricultural land 5-50 acres available! Fertile soil, water access, great investment.",
    buy_land_commercial:
      "Prime commercial lots! High traffic areas, zoning approved, excellent business potential.",
    buy_land_investment:
      "Long-term land investments! Appreciation areas identified, development potential high.",
    buy_comm_office:
      "Office spaces 1,000-10,000 sq ft! Modern buildings, parking, competitive lease rates.",
    buy_comm_retail:
      "Retail locations with foot traffic! Visibility, parking, sizes vary, great opportunities.",
    buy_comm_warehouse:
      "Warehouses available! Loading docks, high ceilings, security, near major highways.",
    buy_comm_mixed:
      "Mixed-use properties found! Ground retail, upper residential, diversified income streams.",
    rent_apt_studio:
      "Studios from $900/month! Modern, utilities optional, great locations throughout the city.",
    rent_apt_1br:
      "1-bedroom apartments $1,200-$1,800! Various neighborhoods, amenities included in many.",
    rent_apt_2br:
      "2-bedroom units $1,600-$2,400! Family-friendly areas, parking available, pet-friendly options.",
    rent_apt_3br:
      "3+ bedroom apartments $2,200+! Spacious, near schools, perfect for families.",
    rent_house_small:
      "2-bedroom houses $1,500-$2,000/month! Yards, quiet streets, near parks and schools.",
    rent_house_medium:
      "3-bedroom homes $2,000-$2,800! Family neighborhoods, garages, excellent school districts.",
    rent_house_large:
      "4+ bedroom houses from $2,800! Large yards, multiple baths, great spaces.",
    rent_house_furnished:
      "Furnished houses available! Fully equipped, short/long term, $2,200+ per month.",
    rent_studio_budget:
      "Budget studios under $1,000! Clean, safe areas, public transit accessible nearby.",
    rent_studio_downtown:
      "Downtown studios $1,200-$1,600! Walk to work, nightlife, restaurants, trendy neighborhoods.",
    rent_studio_modern:
      "Modern renovated studios! New appliances, flooring, fixtures, $1,100-$1,500 monthly.",
    rent_studio_utilities:
      "All-inclusive studios found! Water, electric, internet included, hassle-free $1,300-$1,700.",
    rent_shared_room:
      "Private rooms $600-$900! Shared kitchen/bath, utilities split, friendly housemates.",
    rent_shared_coliving:
      "Co-living spaces with community! Events, networking, furnished, $800-$1,200 monthly.",
    rent_shared_students:
      "Student housing near campus! Study areas, furnished, utilities included, $650-$950.",
    rent_shared_short:
      "Short-term rooms available! Flexible leases, 1-6 months, furnished options.",
  };

  const handleQuestionClick = (questionId, questionText) => {
    setMessages((prev) => [...prev, { type: "user", text: questionText }]);

    if (questionId === "back") {
      if (history.length > 0) {
        const previousFlow = history[history.length - 1];
        setHistory((prev) => prev.slice(0, -1));
        setCurrentFlow(previousFlow);

        if (flowData[previousFlow]?.response) {
          setMessages((prev) => [
            ...prev,
            { type: "bot", text: flowData[previousFlow].response },
          ]);
        }
      }
      return;
    }

    if (questionId === "initial") {
      setHistory([]);
      setCurrentFlow("initial");
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Let's start fresh! How can I help you today?" },
      ]);
      return;
    }

    setHistory((prev) => [...prev, currentFlow]);

    if (terminalNodes.includes(questionId)) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: terminalResponses[questionId] },
      ]);
      setCurrentFlow(questionId);
      return;
    }

    const nextFlow = flowData[questionId];
    if (nextFlow) {
      if (nextFlow.response) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: nextFlow.response },
        ]);
      }
      setCurrentFlow(questionId);
    }
  };

  const getCurrentQuestions = () => {
    if (terminalNodes.includes(currentFlow)) {
      return [
        { id: "back", text: "← Go back" },
        { id: "initial", text: "Start new search" },
      ];
    }
    return flowData[currentFlow]?.questions || [];
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-96 h-[500px] mb-4 flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <h3 className="font-semibold">Real Estate Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-800 rounded p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${
                    msg.type === "bot"
                      ? "bg-white border border-gray-200"
                      : "bg-blue-600 text-white ml-8"
                  } p-3 rounded-lg shadow-sm`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="space-y-2">
              {getCurrentQuestions().map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionClick(q.id, q.text)}
                  className="w-full text-left px-4 py-2.5 bg-gray-100 hover:bg-blue-50 border border-gray-300 hover:border-blue-400 rounded-lg text-sm transition-all duration-200 hover:shadow-md"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FlowChatbot;
