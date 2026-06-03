const getCoordinates = async (req, res) => {
    try {
        // Navigator is a browser-side API. Return default system/city center coordinates on backend.
        res.json({
            success: true,
            data: { latitude: 22.7972, longitude: 85.3442 } // Ranchi center coordinates
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Error fetching location coordinates"
        });
    }
}


export { getCoordinates}