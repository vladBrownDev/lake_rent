export const updatePlacesData = async (places, prices) => {
	try {
		const placesData = {places, prices};

		const response = await fetch(
			process.env.NEXT_PUBLIC_BACKEND_HOST + "/api/places/updatePlaces", // Adjust to your API endpoint
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(placesData)
			}
		);
		const data = await response.json();

		console.log("Update response:", data);
	} catch (error) {
		console.error("Error updating places:", error);
	}

};