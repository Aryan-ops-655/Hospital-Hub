import bedModel from "../Models/bedModel.js";
import ambulanceModel from "../Models/ambulanceModel.js";
import testModel from "../Models/testModel.js";
import { BloodBank } from "../Models/bBankModel.js";
import hospitalModel from "../Models/hospitalModel.js";

// --- BEDS ---
const addBed = async (req, res) => {
    try {
        const newBed = new bedModel({ ...req.body });
        await newBed.save();
        res.json({ success: true, message: "Bed Added" });
    } catch (error) {
        res.json({ success: false, message: "Error adding bed" });
    }
};

const listBeds = async (req, res) => {
    try {
        const beds = await bedModel.find({ hospitalId: req.body.hospitalId });
        res.json({ success: true, data: beds });
    } catch (error) {
        res.json({ success: false, message: "Error fetching beds" });
    }
};

const updateBed = async (req, res) => {
    try {
        await bedModel.findByIdAndUpdate(req.body.id, req.body);
        res.json({ success: true, message: "Bed Updated" });
    } catch (error) {
        res.json({ success: false, message: "Error updating bed" });
    }
};

const removeBed = async (req, res) => {
    try {
        await bedModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Bed Removed" });
    } catch (error) {
        res.json({ success: false, message: "Error removing bed" });
    }
};

// --- AMBULANCES ---
const addAmbulance = async (req, res) => {
    try {
        const newAmbulance = new ambulanceModel({ ...req.body });
        await newAmbulance.save();
        res.json({ success: true, message: "Ambulance Added" });
    } catch (error) {
        res.json({ success: false, message: "Error adding ambulance" });
    }
};

const listAmbulances = async (req, res) => {
    try {
        const ambulances = await ambulanceModel.find({ hospitalId: req.body.hospitalId });
        res.json({ success: true, data: ambulances });
    } catch (error) {
        res.json({ success: false, message: "Error fetching ambulances" });
    }
};

const updateAmbulance = async (req, res) => {
    try {
        await ambulanceModel.findByIdAndUpdate(req.body.id, req.body);
        res.json({ success: true, message: "Ambulance Updated" });
    } catch (error) {
        res.json({ success: false, message: "Error updating ambulance" });
    }
};

const removeAmbulance = async (req, res) => {
    try {
        await ambulanceModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Ambulance Removed" });
    } catch (error) {
        res.json({ success: false, message: "Error removing ambulance" });
    }
};

// --- TESTS ---
const addTest = async (req, res) => {
    try {
        const newTest = new testModel({ ...req.body });
        await newTest.save();
        res.json({ success: true, message: "Test Added" });
    } catch (error) {
        res.json({ success: false, message: "Error adding test" });
    }
};

const listTests = async (req, res) => {
    try {
        const tests = await testModel.find({ hospitalId: req.body.hospitalId });
        res.json({ success: true, data: tests });
    } catch (error) {
        res.json({ success: false, message: "Error fetching tests" });
    }
};

const updateTest = async (req, res) => {
    try {
        await testModel.findByIdAndUpdate(req.body.id, req.body);
        res.json({ success: true, message: "Test Updated" });
    } catch (error) {
        res.json({ success: false, message: "Error updating test" });
    }
};

const removeTest = async (req, res) => {
    try {
        await testModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Test Removed" });
    } catch (error) {
        res.json({ success: false, message: "Error removing test" });
    }
};

// Haversine distance calculator
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // distance in km
};

const searchServices = async (req, res) => {
    try {
        const { lat, lon, query, type } = req.query;
        const userLat = Number(lat) || 0;
        const userLon = Number(lon) || 0;

        let results = [];

        // 1. Fetch beds
        if (!type || type === 'all' || type === 'bed') {
            const beds = await bedModel.find().populate("hospitalId");
            beds.forEach(bed => {
                const hosp = bed.hospitalId;
                if (!hosp) return;
                const matchesQuery = !query || 
                    hosp.name.toLowerCase().includes(query.toLowerCase()) || 
                    hosp.address.toLowerCase().includes(query.toLowerCase()) ||
                    bed.type.toLowerCase().includes(query.toLowerCase());
                if (matchesQuery) {
                    const dist = getDistance(userLat, userLon, hosp.latitude || 0, hosp.longitude || 0);
                    results.push({
                        id: bed._id,
                        serviceType: "Bed",
                        type: bed.type,
                        details: {
                            "Total Beds": bed.totalUnits,
                            "Available": bed.availableUnits,
                            "Price (Per Day)": `₹${bed.price}`
                        },
                        price: bed.price,
                        hospital: {
                            id: hosp._id,
                            name: hosp.name,
                            address: hosp.address,
                            contact: hosp.contact,
                            latitude: hosp.latitude,
                            longitude: hosp.longitude
                        },
                        distance: dist
                    });
                }
            });
        }

        // 2. Fetch Blood
        if (!type || type === 'all' || type === 'blood') {
            const bloods = await BloodBank.find().populate("hospitalId");
            bloods.forEach(blood => {
                const hosp = blood.hospitalId;
                if (!hosp) return;
                const matchesQuery = !query || 
                    hosp.name.toLowerCase().includes(query.toLowerCase()) || 
                    hosp.address.toLowerCase().includes(query.toLowerCase()) ||
                    blood.component.toLowerCase().includes(query.toLowerCase()) ||
                    blood.blood_group.toLowerCase().includes(query.toLowerCase());
                if (matchesQuery) {
                    const dist = getDistance(userLat, userLon, hosp.latitude || 0, hosp.longitude || 0);
                    results.push({
                        id: blood._id,
                        serviceType: "Blood",
                        type: `${blood.component} (${blood.blood_group})`,
                        details: {
                            "Blood Group": blood.blood_group,
                            "Component": blood.component,
                            "Available Units": blood.units,
                            "Stock Status": blood.stock_status
                        },
                        price: 0,
                        hospital: {
                            id: hosp._id,
                            name: hosp.name,
                            address: hosp.address,
                            contact: hosp.contact,
                            latitude: hosp.latitude,
                            longitude: hosp.longitude
                        },
                        distance: dist
                    });
                }
            });
        }

        // 3. Fetch Ambulances
        if (!type || type === 'all' || type === 'ambulance') {
            const ambulances = await ambulanceModel.find().populate("hospitalId");
            ambulances.forEach(amb => {
                const hosp = amb.hospitalId;
                if (!hosp) return;
                const matchesQuery = !query || 
                    hosp.name.toLowerCase().includes(query.toLowerCase()) || 
                    hosp.address.toLowerCase().includes(query.toLowerCase()) ||
                    amb.type.toLowerCase().includes(query.toLowerCase());
                if (matchesQuery) {
                    const dist = getDistance(userLat, userLon, hosp.latitude || 0, hosp.longitude || 0);
                    results.push({
                        id: amb._id,
                        serviceType: "Ambulance",
                        type: amb.type,
                        details: {
                            "Vehicle Number": amb.vehicleNumber,
                            "Contact": amb.contact,
                            "Price (Per KM)": `₹${amb.pricePerKm}`,
                            "Status": amb.status
                        },
                        price: amb.pricePerKm,
                        hospital: {
                            id: hosp._id,
                            name: hosp.name,
                            address: hosp.address,
                            contact: hosp.contact,
                            latitude: hosp.latitude,
                            longitude: hosp.longitude
                        },
                        distance: dist
                    });
                }
            });
        }

        // 4. Fetch Tests
        if (!type || type === 'all' || type === 'test') {
            const tests = await testModel.find().populate("hospitalId");
            tests.forEach(test => {
                const hosp = test.hospitalId;
                if (!hosp) return;
                const matchesQuery = !query || 
                    hosp.name.toLowerCase().includes(query.toLowerCase()) || 
                    hosp.address.toLowerCase().includes(query.toLowerCase()) ||
                    test.name.toLowerCase().includes(query.toLowerCase());
                if (matchesQuery) {
                    const dist = getDistance(userLat, userLon, hosp.latitude || 0, hosp.longitude || 0);
                    results.push({
                        id: test._id,
                        serviceType: "Test",
                        type: test.name,
                        details: {
                            "Description": test.description,
                            "Price": `₹${test.price}`,
                            "Status": test.available ? "Available" : "Unavailable"
                        },
                        price: test.price,
                        hospital: {
                            id: hosp._id,
                            name: hosp.name,
                            address: hosp.address,
                            contact: hosp.contact,
                            latitude: hosp.latitude,
                            longitude: hosp.longitude
                        },
                        distance: dist
                    });
                }
            });
        }

        // Sort by distance in ascending order
        results.sort((a, b) => a.distance - b.distance);

        res.json({ success: true, data: results });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in service search" });
    }
};

export {
    addBed, listBeds, updateBed, removeBed,
    addAmbulance, listAmbulances, updateAmbulance, removeAmbulance,
    addTest, listTests, updateTest, removeTest,
    searchServices
};
