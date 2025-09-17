// src/services/placeService.js
import axios from "axios";

/**
 * Fetch prices from the API based on time and rental type.
 *
 * @param {string} time - The time in the format "DD.MM.YYYY".
 * @param {boolean} isDayRent - Whether the rent is for the daytime.
 * @returns {Promise<object>} - Returns a promise with the fetched data.
 */
export const fetchPlacesDate = async (time, isDayRent) => {
	try {
		const res = await axios.get("http://localhost:4000/api/places/getPlaces", {
			params: {
				time,
				isDayRent
			}
		});
		return res.data; // Return the prices for the caller to handle
	} catch (err) {
		console.error("Error fetching places:", err);
		throw err; // Allow the caller to handle the error
	}
};