import { createContext, useState, useEffect } from "react";
import { BACKEND_URL } from "../constant";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [user, setUser] = useState(
    localStorage.getItem("userMetadata")
      ? JSON.parse(localStorage.getItem("userMetadata"))
      : null
  );
  
  const [coords, setCoords] = useState({ latitude: 22.7972, longitude: 85.3442 }); // Ranchi as default fallback
  const [locationName, setLocationName] = useState(" Ranchi, Jharkhand");
  const [searchResults, setSearchResults] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [docList, setDocList] = useState([]);

  // Auto-detect user coordinates on load
  const detectUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCoords({ latitude: lat, longitude: lon });
          
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await res.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              " Ranchi";
            setLocationName(city);
          } catch (e) {
            console.log("Error reverse geocoding");
          }
        },
        (error) => {
          console.log("Location permission denied, using Ranchi as default fallback");
        }
      );
    }
  };

  useEffect(() => {
    detectUserLocation();
  }, []);

  // Trigger search when coordinates, query or type changes
  const performSearch = async (query = searchQuery, type = searchType) => {
    setLoading(true);
    try {
      const url = `${BACKEND_URL}/api/service/search?lat=${coords.latitude}&lon=${coords.longitude}&query=${query}&type=${type}`;
      const res = await fetch(url);
      const resData = await res.json();
      if (resData.success) {
        setSearchResults(resData.data);
      }
    } catch (error) {
      console.log("Error in search:", error);
    } finally {
      setLoading(false);
    }
  };

  // Re-run search if user location coordinates or search type change
  useEffect(() => {
    performSearch(searchQuery, searchType);
  }, [coords, searchType]);

  // Handle Login
  const login = async (email, password) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userMetadata", JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Server connection failed" };
    }
  };

  // Handle Register
  const signup = async (name, email, password, contact) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, contact }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userMetadata", JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Server connection failed" };
    }
  };

  // Handle Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userMetadata");
  };

  // Fetch Booking History
  const fetchBookings = async () => {
    if (!user) return;
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/request/user-list?userId=${user.id}`
      );
      const resData = await res.json();
      if (resData.success) {
        setUserBookings(resData.data);
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  //fetch doctor-list
  const fetchDoctors = async() => {
    if(!user) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/service/list-doc`);
      const resData = await res.json();
      if(resData.success){
        setDocList(resData.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Trigger bookings load when user logs in
  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchDoctors();
    } else {
      setUserBookings([]);
    }
  }, [user]);

  // Submit Booking Request

  const createBooking = async (hospitalId, serviceType, details) => {
    if (!user) {
      return { success: false, message: "Please login to book appointments!" };
    }
    try {
  const res = await fetch(`${BACKEND_URL}/api/request/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hospitalId,
      userId: user.id,
      userName: user.name,
      userContact: user.contact,
      serviceType,
      details,
    }),
  });

  const data = await res.json();


  return {
    success: data.success,
    message: data.message,
  };
} catch (error) {
  console.error("Booking Error:", error);
  return {
    success: false,
    message: error.message,
  };
}
  };

  const contextValue = {
    token,
    user,
    coords,
    locationName,
    searchResults,
    userBookings,
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
    loading,
    detectUserLocation,
    performSearch,
    login,
    signup,
    logout,
    fetchBookings,
    createBooking,
    docList,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;