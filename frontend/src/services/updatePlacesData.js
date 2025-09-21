import axios from "axios";

export const updatePlacesData = async (places, prices) => {
	try {
		const placesData = {places, prices};

		const response = await axios.post(
			process.env.NEXT_PUBLIC_BACKEND_HOST + "/api/places/updatePlaces", // Adjust to your API endpoint
			placesData,
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		console.log("Update response:", response.data);
	} catch (error) {
		console.error("Error updating places:", error);
	}

};