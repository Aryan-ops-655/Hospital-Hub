import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../constant";
import { toast } from "react-toastify";

export const AdminContext = createContext(null);

const AdminContextProvider = (props) => {
  const token = localStorage.getItem("token");
  const doc = JSON.parse(localStorage.getItem("doctor") || "{}");

  const [items_list, setitem_list] = useState([]);
  const [wbno, setwbno] = useState(0);
  const [plno, setplno] = useState(0);
  const [cyno, setcyno] = useState(0);
  const [pno, setpno] = useState(0);
  const [form, setForm] = useState({});
  const [isDoc, setIsDoc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [doctor, setDoctor] = useState({
    // Basic Information
    fullName: "",
    profilePhoto: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",

    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },

    // Professional Information
    specialization: "",
    superSpecialization: "",

    qualifications: [
      {
        degree: "",
        institute: "",
        year: "",
      },
    ],

    yearsOfExperience: 0,

    medicalRegistrationNumber: "",
    registrationCouncil: "",
    licenseValidity: "",

    languagesKnown: [],

    biography: "",

    // Hospital Associations
    hospitals: [
      {
        hospitalId: "",
        hospitalName: "",
        department: "",
        designation: "",
        joiningDate: "",
        activeStatus: true,
      },
    ],

    // Availability
    consultationType: "Physical",

    availability: [
      {
        day: "",
        startTime: "",
        endTime: "",
      },
    ],

    emergencyDuty: false,

    appointmentRequired: true,

    averageConsultationDuration: 15,

    // Emergency Skills
    emergencyCapabilities: {
      traumaCare: false,
      criticalCare: false,
      strokeManagement: false,
      cardiacEmergency: false,
      ventilatorManagement: false,
    },

    // Verification
    isVerified: false,
    verificationDate: "",

    profileStatus: "Pending",

    // Metrics
    totalPatientsTreated: 0,
    averageRating: 0,
    totalReviews: 0,

    // Account
    accountStatus: "Active",

    lastLogin: "",
  });

  //fetch appointments
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/request/appointment-list`,
        { params: { doctorId: doc.id }, headers: { token } },
      );
      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching appointments");
    }
  };

  //fetch doctor
  const fetchDoctor = async () => {
    try {
      // YOUR FETCH API HERE
      const response = await axios.get(
        `${BACKEND_URL}/api/service/fetch-doc`,
        { params: { id: doc.id } },
        { headers: { token } },
      );
      setDoctor(response.data.data);
    } catch (error) {
      console.error("Failed to fetch doctor profile", error);
    } finally {
      setLoading(false);
    }
  };


  const deleteBlood = async (id) => {
    const response = await axios.post(`${BACKEND_URL}/api/bBank/remove`, {
      id: id,
    });
    if (response.data.success) {
      fetch_list();
      fetch_totalUnits();
      toast.success("Deleted...");
    } else {
      toast.error("Error..!");
    }
  };

  const fetch_list = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/bBank/blood`);
    if (response.data.success) {
      setitem_list(response.data.data);
    } else {
      alert(error);
    }
  };

  const fetch_totalUnits = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/bBank/totalUnits`);
    if (response.data.success) {
      for (let i in response.data.data[0]) {
        if (i === "Whole Blood") {
          setwbno(response.data.data[0][i]);
        } else if (i === "Plasma") {
          setplno(response.data.data[0][i]);
        } else if (i === "Platelets") {
          setpno(response.data.data[0][i]);
        } else if (i === "Cryoprecipitate") {
          setcyno(response.data.data[0][i]);
        }
      }
    } else {
      alert(error);
    }
  };

  const fetchUpdateForm = async (id) => {
    const response = await axios.post(`${BACKEND_URL}/api/bBank/find`, {
      id: id,
    });
    if (response.data.success) {
      setForm({
        id: response.data.data._id,
        component: response.data.data.component,
        group: response.data.data.blood_group,
        units: response.data.data.units,
        collected: new Date(response.data.data.donated_date)
          .toISOString()
          .split("T")[0],
        expiry: new Date(response.data.data.expiry_date)
          .toISOString()
          .split("T")[0],
        status: response.data.data.stock_status,
      });
    } else {
      alert(error);
    }
  };

  //updater function
  const updater = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/bBank/findandupdate`,
      form,
    );
    if (response.data.success) {
      fetch_list();
      fetch_totalUnits();
      toast.success("Updated...");
    } else {
      toast.error("Error..!");
    }
  };

  useEffect(() => {
    if (doc?.id) {
      fetchRequests();
      fetchDoctor();
    }
  }, []);

  const contextValue = {
    deleteBlood,
    fetch_list,
    setitem_list,
    fetch_totalUnits,
    setForm,
    fetchUpdateForm,
    updater,
    form,
    items_list,
    wbno,
    pno,
    cyno,
    plno,
    isDoc,
    setIsDoc,
    loading,
    setLoading,
    doctor,
    setDoctor,
    fetchDoctor,
    requests,
    fetchRequests,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
