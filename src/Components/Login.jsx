import axios from "axios";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getCookie } from "../Utils/cookieUtils";
axios.defaults.withCredentials = true;

export default function Login({onHit}) {       

    const navigator = useNavigate();    
    
    useEffect( ()=>{
        onHit();
        const cookie = getCookie();        
        cookie.then((value)=>{
            if(value.includes("validated")){
                toast.loading("redirecting to home page");
                setTimeout(() => {
                    navigator("/home");
                    toast.dismiss();
                }, 1500);
            }
        })
    },[])    

    const authenticateUser = async (event) =>{
        event.preventDefault();
        console.log(document.getElementById('email-login').value);
        console.log(document.getElementById('password-login').value);        
        try{
            const response = await axios.post('http://192.168.29.107:8080/loginUser', {
                email: document.getElementById('email-login').value,
                password: document.getElementById('password-login').value
            });            
            console.log("response from console",response);            
            toast(response.data);    
            if(response.data.includes("successfully")){
                
                setTimeout(() => {
                    navigator("/home");
                }, 2500);
            }
        } catch (error) {
            console.error("error response from console",error);
            if( error.response && error.response.status == '404'){
                toast.error("Email or Password is invalid !");
            }else{
                toast.error("Facing internal error !");
            }                   
        }
    }

    // const fetchUsers = async () =>{        
    //     try{
    //         const response = await axios.get('http://192.168.29.107:8080/getusers',
    //         { withCredentials: true })            
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return (
        <>  
             <ToastContainer position="top-right" reverseOrder={false} />
            <div className="min-w-screen h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white text-black p-12 rounded shadow-2xl sm:w-5/6 md:w-1/3 w-5/6 ">
                    <h2 className="text-3xl font-bold mb-10 text-gray-800">Login</h2>
                    <form onSubmit={authenticateUser}>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email-login" name="email-login" placeholder="Email" required className="block w-full p-3 rounded bg-gray-200 mt-1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password-login" name="password" placeholder="Password" required className="block w-full p-3 rounded bg-gray-200 mt-1" />
                        </div>
                        <button type="submit" className="w-full bg-gray-800 text-white p-3 mt-2 mb-2 rounded">Login</button>
                    </form>

                    {/* <button type="button" onClick={fetchUsers} className="w-full bg-gray-800 text-white p-3 mt-1 mb-2 rounded">fetch users</button> */}
                    <span> {"Don't have an account? "} <span className="text-blue-400"><Link to="/signup" onClick={onHit}>Sign up</Link></span></span>
                </div>
            </div>
        </>
    )
}

Login.propTypes = {
    onHit: PropTypes.func, // Expecting a function, optional prop
};