import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Navbar (){

    const onLogoutClick = async()=>{
        const response = await axios.post("https://todolist-backend-tes5.onrender.com/logoutUser",{},{withCredentials:true});
        console.log(response.data);
        toast.success(response.data);
        window.location.href = "/login";
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                reverseOrder={false}
                autoClose={1000}
            />

            <div className="min-w-screen">                
                    
                        <div className="flex justify-between h-14 w-screen bg-[#709775] text-white font-semibold">
                            <h2 className="text-white hover:bg-[#a4c3b2] p-4 text-xl">ToDoList </h2>
                            <button 
                                className="bg-[#709775] hover:bg-[#8fb996] p-3 mr-5"
                                onClick={()=>{onLogoutClick()}}
                            >Logout</button>
                        </div>                    
            </div>
        </>
    )
}

export default Navbar;