import { useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          );
          const data = await res.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state ||
            "Unknown Location";

          setLocation(city);
        } catch {
          setError("Failed to get location");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Permission denied");
        setLoading(false);
      }
    );
  };

  return { location, coords, loading, error, getLocation };
};
