import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons broken by bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const locations = [
  { city: 'Nashik',       country: 'India 🇮🇳',         type: 'Headquarters',  lat: 19.9975,  lng: 73.7898  },
  { city: 'Mumbai',       country: 'India 🇮🇳',         type: 'Sales Office',  lat: 19.0760,  lng: 72.8777  },
  { city: 'Tashkent',    country: 'Uzbekistan 🇺🇿',     type: 'Export Market', lat: 41.2995,  lng: 69.2401  },
  { city: 'Manila',       country: 'Philippines 🇵🇭',   type: 'Export Market', lat: 14.5995,  lng: 120.9842 },
  { city: 'Dhaka',        country: 'Bangladesh 🇧🇩',    type: 'Export Market', lat: 23.8103,  lng: 90.4125  },
  { city: 'Riyadh',       country: 'Saudi Arabia 🇸🇦',  type: 'Export Market', lat: 24.7136,  lng: 46.6753  },
  { city: 'Colombo',      country: 'Sri Lanka 🇱🇰',     type: 'Export Market', lat: 6.9271,   lng: 79.8612  },
  { city: 'Muscat',       country: 'Oman 🇴🇲',          type: 'Export Market', lat: 23.5880,  lng: 58.3829  },
];

const GlobalPresence: React.FC = () => {
  return (
    <section className="py-32 bg-[var(--industrial-bg-primary)] border-t border-[var(--industrial-border)] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            style={{ color: 'var(--industrial-text-primary)' }}
          >
            Our <span className="text-[var(--industrial-accent)]">Global</span> Reach
          </motion.h2>
          <p className="text-[var(--industrial-text-secondary)] text-lg">
            Exporting precision valves from Nashik to 6 countries worldwide.
          </p>
        </div>

        {/* Map */}
        <div className="w-full h-[500px] rounded-sm overflow-hidden border border-[var(--industrial-border)]">
          <MapContainer
            center={[20, 30]}
            zoom={2}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {locations.map((loc) => (
              <Marker key={loc.city} position={[loc.lat, loc.lng]} icon={redIcon}>
                <Popup>
                  <div style={{ minWidth: 160 }}>
                    <strong style={{ fontSize: 14 }}>{loc.type} — {loc.city}</strong><br />
                    <span style={{ color: '#888', fontSize: 12 }}>{loc.country}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Country pills */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {locations.map((loc) => (
            <div
              key={loc.city}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--industrial-border)] rounded-sm text-sm text-[var(--industrial-text-secondary)] hover:border-[var(--industrial-accent)] hover:text-white transition-colors"
            >
              <span>{loc.country}</span>
              {loc.type === 'Headquarters' && (
                <span className="text-[10px] text-[var(--industrial-accent)] font-mono border border-[var(--industrial-accent)] px-1">HQ</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GlobalPresence;
