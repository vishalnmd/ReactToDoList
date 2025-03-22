import axios from "axios";
import PropTypes from "prop-types";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Signup ({onHit}){

    const formRef = useRef();
    const navigate = useNavigate();        

    const onSignupSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const jsonData = Object.fromEntries(formData.entries());
        console.log(jsonData);        

        try{
            // const response = await axios.post("http://192.168.29.107:8080/signin",jsonData);
            const response = await axios.post("https://todolist-backend-tes5.onrender.com/signin",jsonData);
            toast.success(response.data);
        
            await setTimeout(() => {
                navigate("/login");        
            }, 2500);   
        }catch (error){
            console.log(error)
            toast.error("Email or Password is invalid!");
        }                     
    }

    return(
        <>  
            <ToastContainer position="top-right" reverseOrder={false} />
             <div className="min-w-screen h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white text-black p-12 rounded shadow-2xl md:w-1/3 sm:w-5/6">
                    <h2 className="text-3xl font-bold mb-10 text-gray-800">Sign-up</h2>
                    <form onSubmit={onSignupSubmit} ref={formRef}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" name="name" required placeholder="Full name" className="block w-full p-3 rounded bg-gray-200" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email-signup" name="email" required placeholder="Email" className="block w-full p-3 rounded bg-gray-200 "/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password-signup" name="password" required placeholder="Password" className="block w-full p-3 rounded bg-gray-200" />
                        </div>
                        <button type="submit" className="w-full bg-gray-800 text-white p-3 mb-3 rounded">Sign up</button>
                    </form>

                    <span>Already have a account? <span className="text-blue-400"><Link to="/login" onClick={onHit}>login</Link></span></span>

                </div>
            </div>
        </>
    )
}

Signup.propTypes = {
    onHit: PropTypes.func, // Expecting a function, optional prop
};