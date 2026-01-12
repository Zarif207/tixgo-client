import React, { useRef, useState, useEffect } from "react";
import Globe from "react-globe.gl";
import { Plane, Train, Ship, Bus, Globe2, Navigation } from "lucide-react";

const Map = () => {
  const globeRef = useRef();
  const [selectedType, setSelectedType] = useState("all");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Worldwide transportation hubs
  const transportHubs = [
    // Airports
    { name: "JFK International Airport", city: "New York", country: "USA", lat: 40.6413, lng: -73.7781, type: "plane", connections: 350 },
    { name: "Heathrow Airport", city: "London", country: "UK", lat: 51.4700, lng: -0.4543, type: "plane", connections: 220 },
    { name: "Dubai International", city: "Dubai", country: "UAE", lat: 25.2532, lng: 55.3657, type: "plane", connections: 280 },
    { name: "Tokyo Haneda", city: "Tokyo", country: "Japan", lat: 35.5494, lng: 139.7798, type: "plane", connections: 310 },
    { name: "LAX", city: "Los Angeles", country: "USA", lat: 33.9416, lng: -118.4085, type: "plane", connections: 290 },
    { name: "Charles de Gaulle", city: "Paris", country: "France", lat: 49.0097, lng: 2.5479, type: "plane", connections: 270 },
    { name: "Singapore Changi", city: "Singapore", country: "Singapore", lat: 1.3644, lng: 103.9915, type: "plane", connections: 320 },
    { name: "Sydney Airport", city: "Sydney", country: "Australia", lat: -33.9399, lng: 151.1753, type: "plane", connections: 200 },
    { name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", lat: 50.0379, lng: 8.5622, type: "plane", connections: 260 },
    {name: "Hazrat Shahjalal International Airport",city: "Dhaka",country: "Bangladesh",lat: 23.8433,lng: 90.3978,type: "plane",connections: 120
},
    
    // Train Stations
    { name: "Grand Central Terminal", city: "New York", country: "USA", lat: 40.7527, lng: -73.9772, type: "train", connections: 180 },
    { name: "Tokyo Station", city: "Tokyo", country: "Japan", lat: 35.6812, lng: 139.7671, type: "train", connections: 250 },
    { name: "Gare du Nord", city: "Paris", country: "France", lat: 48.8809, lng: 2.3553, type: "train", connections: 220 },
    { name: "Berlin Hauptbahnhof", city: "Berlin", country: "Germany", lat: 52.5250, lng: 13.3694, type: "train", connections: 150 },
    { name: "Mumbai Central", city: "Mumbai", country: "India", lat: 18.9681, lng: 72.8199, type: "train", connections: 190 },
    { name: "Beijing Railway Station", city: "Beijing", country: "China", lat: 39.9042, lng: 116.4074, type: "train", connections: 210 },
    { name: "Zurich HB", city: "Zurich", country: "Switzerland", lat: 47.3779, lng: 8.5403, type: "train", connections: 160 },
    { name: "St Pancras International", city: "London", country: "UK", lat: 51.5308, lng: -0.1260, type: "train", connections: 175 },
    
    // Seaports/Launch
    { name: "Port of Singapore", city: "Singapore", country: "Singapore", lat: 1.2644, lng: 103.8220, type: "launch", connections: 180 },
    { name: "Port of Shanghai", city: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737, type: "launch", connections: 220 },
    { name: "Port of Rotterdam", city: "Rotterdam", country: "Netherlands", lat: 51.9225, lng: 4.4792, type: "launch", connections: 170 },
    { name: "Port of Hong Kong", city: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694, type: "launch", connections: 200 },
    { name: "Port of Los Angeles", city: "Los Angeles", country: "USA", lat: 33.7405, lng: -118.2720, type: "launch", connections: 150 },
    { name: "Port of Dhaka", city: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125, type: "launch", connections: 90 },
    { name: "Port of Hamburg", city: "Hamburg", country: "Germany", lat: 53.5395, lng: 9.9925, type: "launch", connections: 165 },
    
    // Bus Terminals
    { name: "Port Authority", city: "New York", country: "USA", lat: 40.7570, lng: -73.9900, type: "bus", connections: 120 },
    { name: "Victoria Coach Station", city: "London", country: "UK", lat: 51.4950, lng: -0.1464, type: "bus", connections: 100 },
    { name: "Tietê Bus Terminal", city: "São Paulo", country: "Brazil", lat: -23.5150, lng: -46.6260, type: "bus", connections: 140 },
    { name: "Kampung Rambutan", city: "Jakarta", country: "Indonesia", lat: -6.3053, lng: 106.8695, type: "bus", connections: 110 },
    { name: "Central Bus Station", city: "Tel Aviv", country: "Israel", lat: 32.0564, lng: 34.7801, type: "bus", connections: 85 },
    { name: "Mexico City TAPO", city: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332, type: "bus", connections: 130 },
    { name: "Dhaka Bus Terminal", city: "Dhaka", country: "Bangladesh", lat: 23.7925, lng: 90.4078, type: "bus", connections: 95 },
  ];

  const typeColors = {
    plane: "#3b82f6",
    train: "#10b981",
    launch: "#8b5cf6",
    bus: "#f59e0b"
  };

  const typeIcons = {
    plane: Plane,
    train: Train,
    launch: Ship,
    bus: Bus
  };

  const filteredLocations = selectedType === "all" 
    ? transportHubs 
    : transportHubs.filter(loc => loc.type === selectedType);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.controls().enableZoom = true;
      globeRef.current.pointOfView({ altitude: isMobile ? 3 : 2.5 });
    }
  }, [isMobile]);

  const handlePointHover = (point) => {
    setHoveredPoint(point);
    if (point) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  };

  const getIconLabel = (type) => {
    const Icon = typeIcons[type];
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="${typeColors[type]}" xmlns="http://www.w3.org/2000/svg">
      ${type === 'plane' ? '<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>' : ''}
      ${type === 'train' ? '<path d="M4 15.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V5c0-3.5-3.58-4-8-4s-8 .5-8 4v10.5zm8 1.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7H6V5h12v5z"/>' : ''}
      ${type === 'launch' ? '<path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>' : ''}
      ${type === 'bus' ? '<path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>' : ''}
    </svg>`;
  };

  return (
    <div className="w-full h-screen relative bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="absolute top-3 sm:top-6 md:top-8 left-3 sm:left-6 md:left-8 z-20 max-w-[calc(100%-120px)] sm:max-w-none">
        <div className="backdrop-blur-xl bg-slate-900/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700/50 shadow-2xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Global Transport Network
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm hidden sm:block">
            Explore {filteredLocations.length} transportation hubs worldwide
          </p>
        </div>
      </div>

      {/* Filter Buttons - Desktop */}
      <div className="hidden md:flex absolute top-8 right-8 z-20 gap-3">
        {[
          { type: "all", label: "All Hubs", Icon: Globe2 },
          { type: "plane", label: "Airports", Icon: Plane },
          { type: "train", label: "Railways", Icon: Train },
          { type: "launch", label: "Seaports", Icon: Ship },
          { type: "bus", label: "Bus Stations", Icon: Bus }
        ].map((filter) => {
          const Icon = filter.Icon;
          return (
            <button
              key={filter.type}
              onClick={() => setSelectedType(filter.type)}
              className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-xl border ${
                selectedType === filter.type
                  ? 'bg-[#5e5cf9] text-white border-[#5e5cf9] shadow-lg shadow-blue-500/50 scale-105'
                  : 'bg-slate-900/60 text-slate-300 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600 hover:scale-105'
              }`}
            >
              <Icon className="w-4 h-4 inline mr-2" />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter Buttons - Mobile (Bottom) */}
      <div className="md:hidden absolute bottom-3 left-3 right-3 z-20">
        <div className="backdrop-blur-xl bg-slate-900/90 rounded-xl p-2 border border-slate-700/50 shadow-2xl">
          <div className="grid grid-cols-5 gap-2">
            {[
              { type: "all", label: "All", Icon: Globe2 },
              { type: "plane", label: "Air", Icon: Plane },
              { type: "train", label: "Rail", Icon: Train },
              { type: "launch", label: "Sea", Icon: Ship },
              { type: "bus", label: "Bus", Icon: Bus }
            ].map((filter) => {
              const Icon = filter.Icon;
              return (
                <button
                  key={filter.type}
                  onClick={() => setSelectedType(filter.type)}
                  className={`p-2 rounded-lg font-medium transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                    selectedType === filter.type
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-800/60 text-slate-300 active:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend - Desktop only */}
      <div className="hidden lg:block absolute bottom-40 right-8 z-20 backdrop-blur-xl bg-slate-900/60 rounded-2xl p-5 border border-slate-700/50 shadow-2xl">
        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Transport Types</h4>
        <div className="space-y-3">
          {Object.entries(typeColors).map(([type, color]) => {
            const Icon = typeIcons[type];
            return (
              <div key={type} className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
                <Icon className="w-4 h-4" style={{ color }} />
                <span className="text-slate-300 text-sm font-medium capitalize">{type}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Globe */}
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

        width={typeof window !== 'undefined' ? window.innerWidth : 1920}
        height={typeof window !== 'undefined' ? window.innerHeight : 1080}

        pointsData={filteredLocations}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d) => typeColors[d.type]}
        pointAltitude={0.02}
        pointRadius={(d) => hoveredPoint === d ? 0.5 : 0.35}
        pointLabel={(d) => `
          <div style="
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%);
            color: #fff;
            padding: 12px;
            border-radius: 12px;
            font-family: system-ui, -apple-system, sans-serif;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(148, 163, 184, 0.2);
            min-width: 200px;
            max-width: 280px;
            backdrop-filter: blur(10px);
          ">
            <div style="margin-bottom: 8px;">${getIconLabel(d.type)}</div>
            <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px; color: #f1f5f9;">${d.name}</div>
            <div style="font-size: 12px; color: #94a3b8; margin-bottom: 10px;">${d.city}, ${d.country}</div>
            <div style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: rgba(30, 41, 59, 0.8);
              padding: 6px 10px;
              border-radius: 6px;
              border: 1px solid rgba(148, 163, 184, 0.15);
            ">
              <span style="font-size: 11px; color: #cbd5e1; font-weight: 500;">Connections</span>
              <span style="font-size: 16px; font-weight: bold; color: ${typeColors[d.type]};">${d.connections}</span>
            </div>
          </div>
        `}

        onPointHover={handlePointHover}
        onPointClick={(point) => {
          if (globeRef.current && point) {
            globeRef.current.pointOfView(
              { lat: point.lat, lng: point.lng, altitude: isMobile ? 2 : 1.5 },
              1500
            );
          }
        }}

        ringsData={filteredLocations}
        ringLat="lat"
        ringLng="lng"
        ringColor={(d) => (t) => `${typeColors[d.type]}${Math.floor((1 - t) * 255).toString(16).padStart(2, '0')}`}
        ringMaxRadius={isMobile ? 3 : 4}
        ringPropagationSpeed={2.5}
        ringRepeatPeriod={2000}
        ringAltitude={0.01}

        hexPolygonsData={[]}
        
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.2}

        enablePointerInteraction={true}
        animateIn={true}
      />
    </div>
  );
};

export default Map;