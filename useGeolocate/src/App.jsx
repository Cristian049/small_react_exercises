import { useState } from "react";
import "./App.css";

function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPostition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPostition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, error, position, getPosition };
}

export default function App() {
  const [countClicks, setCountClick] = useState(0);
  const {
    isLoading,
    error,
    position: { lat, lng },
    getPosition,
  } = useGeolocation();

  function handleClick() {
    setCountClick((c) => c + 1);
    getPosition();
  }
  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>
      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!error && !isLoading && lat && lng && (
        <p>
          Your GPS position :
          <a
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
            target="_blank"
            rel="noreferrer"
          >
            {lat}, {lng}
          </a>
        </p>
      )}
      <p>You requested position {countClicks} times</p>
    </div>
  );
}
