import useStore from "@/store";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const center = { lat: -6.1751063879579, lng: 106.8272115579869 };

const apiKey = process.env.GOOGLE_KEY
function Maps() {
    const route = useRouter();
    const originRef = useRef(null);
    const destinationRef = useRef(null);
    const selectRef = useRef(null);

    const [Confirmation, setConfirm] = useStore((state) => [
        state.confirmation,
        state.updateConfirmation,
    ]);

    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [originMarker, setOriginMarker] = useState(null);
    const [destinationMarker, setDestinationMarker] = useState(null);

    const calculateCenter = (origin, destination) => {
        const lat1 = parseFloat(origin.lat());
        const lng1 = parseFloat(origin.lng());
        const lat2 = parseFloat(destination.lat());
        const lng2 = parseFloat(destination.lng());

        const centerLat = (lat1 + lat2) / 2;
        const centerLng = (lng1 + lng2) / 2;

        return { lat: centerLat, lng: centerLng };
    };

    const initializeMapAndAutocomplete = () => {
        try {
            const map = new window.google.maps.Map(
                document.getElementById("map"),
                {
                    center: center,
                    zoom: 12,
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                }
            );

            setMap(map);

            // Set up autocomplete for origin and destination inputs
            setupAutocomplete(originRef);
            setupAutocomplete(destinationRef);
        } catch (error) {
            console.error("Error initializing Google Maps:", error);
        }
    };

    const setupAutocomplete = (inputRef) => {
        if (window.google && window.google.maps && inputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                inputRef.current
            );

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (!place.geometry || !place.geometry.location) {
                    return;
                }

                // Handle the selected place here
                // console.log("Selected Place:", place);
            });
        }
    };

    const back = () => {
        route.push('/')
    }

    useEffect(() => {
        if (!localStorage.name) {
            route.push('/login')
        }
        const loadScript = () => {
            try {
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyARLC2bb49XHxsU_Z7lSJS50FPOeP79dGU&libraries=places&callback=initMap`;
                script.async = true;
                script.defer = true;
                window.initMap = initializeMapAndAutocomplete;
                document.head.appendChild(script);
            } catch (error) {
                console.error("Error loading Google Maps API:", error);
            }
        };

        if (document.readyState === "complete") {
            loadScript();
        } else {
            window.addEventListener("load", loadScript);
        }
    }, []);

    const calculateRoute = async () => {
        if (!originRef.current.value || !destinationRef.current.value) {
            return;
        }

        const directionsService = new window.google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: window.google.maps.TravelMode.DRIVING,
        });

        // Hapus marker sebelumnya jika ada
        if (originMarker) {
            originMarker.setMap(null);
        }
        if (destinationMarker) {
            destinationMarker.setMap(null);
        }

        const originLatLng = new window.google.maps.LatLng(results.routes[0].legs[0].start_location.lat(), results.routes[0].legs[0].start_location.lng());
        const destinationLatLng = new window.google.maps.LatLng(results.routes[0].legs[0].end_location.lat(), results.routes[0].legs[0].end_location.lng());

        const newOriginMarker = new window.google.maps.Marker({
            position: originLatLng,
            map: map,
            title: "Origin",
        });

        const newDestinationMarker = new window.google.maps.Marker({
            position: destinationLatLng,
            map: map,
            title: "Destination",
        });

        setOriginMarker(newOriginMarker);
        setDestinationMarker(newDestinationMarker);

        const centerLatLng = calculateCenter(originLatLng, destinationLatLng);

        map.setCenter(centerLatLng);
        map.setZoom(10);

        setConfirm({
            type: selectRef.current.value,
            address: results.request.origin.query,
            destination: results.request.destination.query,
            duration: results.routes[0].legs[0].duration.text
        })

        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    };

    const confirm = () => {
        route.push("/confirmation");
    };

    return (
        <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    padding: "16px",
                    backgroundColor: "white",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                }}
            >
                <div style={{ display: "grid", gap: "10px" }}>
                    <input
                        type="text"
                        placeholder="Address"
                        ref={originRef}
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid",
                            fontSize: "16px",
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Destination"
                        ref={destinationRef}
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid ",
                            fontSize: "16px",
                        }}
                    />
                    <select
                        ref={selectRef}
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid",
                            fontSize: "16px",
                        }}
                    >
                        <option value="Bluebird">Bluebird</option>
                        <option value="Bluebird Van">Bluebird Van</option>
                        <option value="Bluebird Fixed Price">Bluebird Fixed Price</option>
                    </select>
                    <button
                        onClick={calculateRoute}
                        style={{
                            backgroundColor: "#ff6347",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "4px",
                            fontSize: "16px",
                            cursor: "pointer",
                            border: "none",
                        }}
                    >
                        Check Estimation
                    </button>
                    <button
                        onClick={confirm}
                        style={{
                            backgroundColor: "#229ED9",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "4px",
                            fontSize: "16px",
                            cursor: "pointer",
                            border: "none",
                        }}
                    >
                        Order Bluebird
                    </button>
                    <button onClick={back} style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "4px",
                        fontSize: "16px",
                        cursor: "pointer",
                        border: "none",
                    }}>Back</button>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "16px",
                        fontSize: "18px",
                    }}
                >

                    <div style={{ flex: 1 }}>Distance: {distance}</div>
                    <div style={{ flex: 1 }}>Estimation: {duration}</div>
                </div>
            </div>
            <div
                id="map"
                style={{
                    position: "flex",
                    height: "100vh",
                    width: "100%",
                    alignItems: "center",
                    justifyItems: "center",
                }}
            ></div>
        </div>
    );
}

export default Maps;
