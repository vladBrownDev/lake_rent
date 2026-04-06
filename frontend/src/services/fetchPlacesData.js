// src/services/placeService.js

/**
 * Fetch prices from the API based on time and rental type.
 *
 * @param {string} time - The time in the format "DD.MM.YYYY".
 * @param {boolean} isDayRent - Whether the rent is for the daytime.
 * @returns {Promise<object>} - Returns a promise with the fetched data.
 */
export const fetchPlacesData = async (time, isDayRent) => {
	try {
		const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
		if (!host) {
			throw new Error("NEXT_PUBLIC_BACKEND_HOST is not defined in environment variables");
		}
		const params = new URLSearchParams({ time, isDayRent });
		const url = `${host}/api/places/getPlaces?${params.toString()}`;
		console.log("Fetching places from:", url);

		const res = await fetch(url, {
		        method: "GET",
		        cache: 'no-cache',
		        headers: {
		                "Accept": "application/json"
		        }
		});

		if (!res.ok) {
		        const errorText = await res.text();
		        throw new Error(`HTTP Error: ${res.status} - ${errorText}`);
		}		const data = await res.json();
		return data; // Return the prices for the caller to handle
	} catch (err) {
		console.error("Error fetching places:", err);
		throw err; // Allow the caller to handle the error
	}
};