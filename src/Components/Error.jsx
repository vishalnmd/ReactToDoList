
import { Link } from "react-router-dom"

export default function Error(){

    return (
        <>  
            <div className="h-screen w-screen bg-gray-100 flex flex-col">
                <div className="bg-white mt-16 text-black justify-items-center">
                    <h2 className="text-2xl">Wrong destination reached</h2>
                    <h3>Click to <span><Link to="/login">login</Link></span></h3>
                </div>
            </div>
        </>
    )
}