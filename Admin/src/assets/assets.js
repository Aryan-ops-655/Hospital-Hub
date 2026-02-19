import ambulance from "./ambulance.png"
import bed from "./bed.png"
import blood_drop from "./blood_drop.png"
import doctor from "./doctor.png"
import oxygen from "./oxygen.png"
import hospital_building from "./hospital-building.png"
import right_arrow from "./right-arrow.png"
import bell_icon from "./bell.png"
import cross_icon from "./cross.png"
import download_icon from "./download.png"
import home_icon from "./home.png"
import location_icon from "./marker.png"
import search_icon from "./search.png"
import user_icon from './user.png'
import platelet from './platelet.png'
import cryo from './cryoprecipitate.png'
import medical from './medical.png'
import plasma from './electric-globe.png'

export const assets = {
ambulance,
bed,
blood_drop,
doctor,
oxygen,
hospital_building,
right_arrow,
bell_icon,
cross_icon,
download_icon,
home_icon,
location_icon,
search_icon,
user_icon,
platelet,
cryo,
medical,
plasma,
}


export const Stock = [
    {
        _id: '1',
        col: "rgb(255, 0, 0)",
        colo: "rgb(239, 145, 145)",
        image: blood_drop,
        name: "RBC Units",
        component: "Packed RBC",
        bloodGroup: "A+",
        units: 15,
        expiry: "25 Feb 2026",
        status: "In Stock"
    },
    {
        _id:'2',
        col: "rgb(159, 144, 3)",
        image: platelet,
        name: "Platelets",
        component: "Platelets",
        bloodGroup: "O+",
        units: 4,
        expiry: "20 Feb 2026",
        status: "Low Stock"
    },
    {
        _id:'3',
        col: "rgb(3, 50, 89)",
        image: plasma,
        name: "Plasma",
        component: "Plasma",
        bloodGroup: "B-",
        units: 8,
        expiry: "10 Dec 2026",
        status: "Safe"
    },
    {
        _id:'4',
        col: "rgb(79, 10, 122)",
        image: cryo,
        name: "Cryo",
        component: "Cryoprecipitate",
        bloodGroup: "AB-",
        units: 2,
        expiry: "15 Feb 2026",
        status: "Expiring Soon"
    }   
]

export const items = [
    {
        _id: '1',
        col: "rgb(255, 0, 0)",
        colo: "rgb(239, 145, 145)",
        image: blood_drop,
        name: "RBC Units",
        component: "Packed RBC",
        bloodGroup: "A+",
        units: 15,
        expiry: "25 Feb 2026",
        status: "In Stock"
    },
    {
        _id:'2',
        col: "rgb(159, 144, 3)",
        image: platelet,
        name: "Platelets",
        component: "Platelets",
        bloodGroup: "O+",
        units: 4,
        expiry: "20 Feb 2026",
        status: "Low Stock"
    },
    {
        _id:'3',
        col: "rgb(3, 50, 89)",
        image: plasma,
        name: "Plasma",
        component: "Plasma",
        bloodGroup: "B-",
        units: 8,
        expiry: "10 Dec 2026",
        status: "Safe"
    },
    {
        _id:'4',
        col: "rgb(79, 10, 122)",
        image: cryo,
        name: "Cryo",
        component: "Cryoprecipitate",
        bloodGroup: "AB-",
        units: 2,
        expiry: "15 Feb 2026",
        status: "Expiring Soon"
    } 
]