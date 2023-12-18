import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
export const formatSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')
export const formatPrice = number => Number(number?.toFixed(1)).toLocaleString()
export const renderStar = (number) => {
    const stars = []
    for(let i=0;i<+number;i++){
        stars.push(<FaStar color="yellow" key={i}/>)
    }
    for(let i=5;i>+number;i--){
        stars.push(<FaRegStar color="yellow" key={i}/>)
    }
    return stars
}
export const ValidateEmail = (mail) => { 
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return false
    }else{
        return true
    }
}