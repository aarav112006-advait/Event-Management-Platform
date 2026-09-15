// Google Maps Loader and Simulation Fallback Service
let googleMapsPromise = null;

export const loadGoogleMaps = (apiKey) => {
  if (window.google && window.google.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    // Return null to activate simulator mode
    return Promise.resolve(null);
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.onload = () => resolve(window.google.maps);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
      } else {
        resolve(null);
      }
    };

    script.onerror = (err) => {
      console.warn('Google Maps script failed to load. Falling back to simulator canvas.', err);
      resolve(null);
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
};

export const geocodeAddress = async (address) => {
  if (window.google && window.google.maps && window.google.maps.Geocoder) {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const loc = results[0].geometry.location;
          resolve({
            lat: loc.lat(),
            lng: loc.lng(),
            formattedAddress: results[0].formatted_address
          });
        } else {
          resolve(null);
        }
      });
    });
  }
  return null;
};
