import requestModel from "../Models/requestModel.js";

const listRequests = async (req, res) => {
  try {
    const requests = await requestModel
      .find({ hospitalId: req.body.hospitalId })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.json({ success: false, message: "Error fetching requests" });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await requestModel.findByIdAndUpdate(id, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: "Error updating status" });
  }
};

const deleteRequest = async (req, res) => {
  try {
    await requestModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Request Deleted" });
  } catch (error) {
    res.json({ success: false, message: "Error deleting request" });
  }
};

const createRequest = async (req, res) => {
  try {
    const { hospitalId, userName, userContact, serviceType, details, userId } =
      req.body;
    const newRequest = new requestModel({
      hospitalId,
      userId: userId || "guest",
      userName,
      userContact,
      serviceType,
      details,
      status: "Pending",
    });
    await newRequest.save();
    res.json({ success: true, message: "Appointment Booked Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Booking failed" });
  }
};

const listUserRequests = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    const requests = await requestModel
      .find({ userId })
      .populate("hospitalId")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.json({ success: false, message: "Error fetching user bookings" });
  }
};

const listDoctorPatients = async (req, res) => {
    try {
        const doctorId = req.query.doctorId;

        const requests = await requestModel
            .find({ hospitalId: doctorId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: requests
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error fetching appointments"
        });
    }
};


export {
  listRequests,
  updateRequestStatus,
  deleteRequest,
  createRequest,
  listUserRequests,
  listDoctorPatients,
};
