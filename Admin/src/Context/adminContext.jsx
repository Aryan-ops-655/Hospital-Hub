import axios from "axios";
import { createContext, useState } from "react";
import { BACKEND_URL } from "../../constant";
import { toast } from "react-toastify";

export const AdminContext = createContext(null)

const AdminContextProvider = (props) => {

    const [items_list, setitem_list] = useState([]);
    const [wbno, setwbno] = useState(0)
    const [plno, setplno] = useState(0)
    const [cyno, setcyno] = useState(0)
    const [pno, setpno] = useState(0)
    const [form, setForm] = useState({})

    const deleteBlood = async (id) => {
        const response = await axios.post(`${BACKEND_URL}/api/bBank/remove`, { "id": id })
        if (response.data.success) {
            fetch_list();
            fetch_totalUnits();
            toast.success("Deleted...")
        } else {
            toast.error("Error..!")
        }
    }

    const fetch_list = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/bBank/blood`);
        if (response.data.success) {
            setitem_list(response.data.data)
        } else {
            alert(error);
        }
    };

    const fetch_totalUnits = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/bBank/totalUnits`);
        if (response.data.success) {
            for (let i in response.data.data[0]) {
                if (i === "Whole Blood") {
                    setwbno(response.data.data[0][i])
                } else if (i === "Plasma") {
                    setplno(response.data.data[0][i])
                } else if (i === "Platelets") {
                    setpno(response.data.data[0][i])
                } else if (i === "Cryoprecipitate") {
                    setcyno(response.data.data[0][i])
                }
            }
        } else {
            alert(error);
        }
    };

    const fetchUpdateForm = async (id) => {
        const response = await axios.post(`${BACKEND_URL}/api/bBank/find`, { "id": id });
        if (response.data.success) {
            setForm({
                "id":response.data.data._id,
                "component": response.data.data.component,
                "group": response.data.data.blood_group,
                "units": response.data.data.units,
                "collected":new Date(response.data.data.donated_date).toISOString().split('T')[0],
                "expiry":new Date(response.data.data.expiry_date).toISOString().split('T')[0],
                "status": response.data.data.stock_status
            })
        } else {
            alert(error);
        }
    }


    //updater function 
    const updater = async () => {
        const response = await axios.post(`${BACKEND_URL}/api/bBank/findandupdate`,form);
        if (response.data.success) {
            fetch_list();
            fetch_totalUnits();
            toast.success("Updated...")
        } else {
            toast.error("Error..!")
        }
    }




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
        plno

    }

    return (
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider