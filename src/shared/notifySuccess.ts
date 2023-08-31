import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export const notifySuccess = (message: string) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true
    })
}