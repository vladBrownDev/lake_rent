// src/services/placeService.js
import axios from "axios";

/**
 * Fetch prices from the API based on time and rental type.
 *
 * @param {string} time - The time in the format "DD.MM.YYYY".
 * @param {boolean} isDayRent - Whether the rent is for the daytime.
 * @returns {Promise<object>} - Returns a promise with the fetched data.
 */
export const fetchPlacesData = async (time, isDayRent) => {
	try {
		const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_HOST + "/api/places/getPlaces", {
			params: {
				time,
				isDayRent
			},
			headers: {
				"ngrok-skip-browser-warning": "69420",
			}
		});
		return res.data; // Return the prices for the caller to handle
	} catch (err) {
		console.error("Error fetching places:", err);
		throw err; // Allow the caller to handle the error
	}
};