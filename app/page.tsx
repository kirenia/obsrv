'use client';

import { useState } from 'react';

export default function Home() {

  // take the location
  const [location, setLocation] = useState('');

  // store coordinates
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number} | null>(null);

  // take location string and convert to lat/lon
  const handleLocationSubmit = async () => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const { latitude, longitude } = data.results[0];
      setCoordinates({ lat: latitude, lon: longitude });
      console.log(`Coordinates: Latitude ${latitude}, Longitude ${longitude}`);
    } else {
      console.error('Location not found');
    }
  }

  return (
<div className="flex justify-center items-center h-screen flex-col">
  <main>
    <h1>enter your location to see what's visible tonight</h1>
    <input 
      type="text" 
      placeholder="city, country, zip, etc." 
      className="border border-gray-300 rounded px-2 py-1 mr-2"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      />

    <button 
      className="bg-purple-900 px-3 py-1 rounded hover:bg-purple-600" 
      onClick={handleLocationSubmit}>
        submit
      </button>
  </main>
</div>
  );
}
