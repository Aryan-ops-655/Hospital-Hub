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
user_icon
}


export const bookings_list =[
    {
        _id: "1" ,
        paitent_name:"Aryan kumar",
        booking_type:"Appointment" ,
        hospital_name: "RIIMS",
        date:"FEB 15,2026",
        status:"Pending",
        category:"bed",
        image: bed
    },
    {
        _id: "2" ,
        paitent_name:"Alok kumar",
        booking_type:"Appointment" ,
        hospital_name: "AIIMS",
        date:"FEB 15,2026",
        status:"Approved",
        category:"blood",
        image: blood_drop
    },
    {
        _id: "3" ,
        paitent_name:"Rahul kumar",
        booking_type:"Appointment" ,
        hospital_name: "Sadar Hospital",
        date:"FEB 15,2026",
        status:"Canceled",
        category:"doctor",
        image: doctor
    },
    {
        _id: "4" ,
        paitent_name:"Alkit kumar",
        booking_type:"Appointment" ,
        hospital_name: "Dwarika Hospital",
        date:"FEB 15,2026",
        status:"Pending",
        category:"oxygen",
        image: oxygen
    }

]

export const blood_groups =[
    {
        _id:"1",
        group:"A+",
        category:"A+"
    },
    {
        _id:"2",
        group:"A-",
        category:"A-"
    },
    {
        _id:"3",
        group:"B+",
        category:"B+"
    },
    {
        _id:"4",
        group:"B+",
        category:"B+"
    },
    {
        _id:"5",
        group:"AB+",
        category:"AB+"
    },
    {
        _id:"6",
        group:"AB-",
        category:"AB-"
    },
    {
        _id:"7",
        group:"O+",
        category:"O+"
    },
    {
        _id:"8",
        group:"O-",
        category:"O-"
    }
]


export const hospital_list = [
    {
        _id:"1",
        image:hospital_building,
        name:"RIMS",
        location:"Ranchi Jharkhand",
        blood: {
            ap:10,
            an:12,
            bp:13,
            bn:0,
            abp:6,
            abn:3,
            op:1,
            on:0
        },
        bed:2,
        oxygen:7
    },
    {
        _id:"2",
        image:hospital_building,
        name:"Sadar",
        location:"Ranchi Jharkhand",
        blood: {
            ap:10,
            an:12,
            bp:13,
            bn:0,
            abp:6,
            abn:3,
            op:1,
            on:0
        },
        bed:7,
        oxygen:0
    },
    {
        _id:"3",
        image:hospital_building,
        name:"APOLLO",
        location:"Ranchi Jharkhand",
        blood: {
            ap:10,
            an:12,
            bp:13,
            bn:0,
            abp:6,
            abn:3,
            op:1,
            on:0
        },
        bed:18,
        oxygen:9
    },
    {
        _id:"4",
        image:hospital_building,
        name:"AIMS",
        location:"Ranchi Jharkhand",
        blood: {
            ap:10,
            an:12,
            bp:13,
            bn:0,
            abp:6,
            abn:3,
            op:1,
            on:0
        },
        bed:25,
        oxygen:19
    },
    {
        _id:"5",
        image:hospital_building,
        name:"Dwarika",
        location:"Ranchi Jharkhand",
        blood: {
            ap:10,
            an:12,
            bp:13,
            bn:0,
            abp:6,
            abn:3,
            op:1,
            on:0
        },
        bed:8,
        oxygen:8
    }
]