import { Axis3DIcon } from "lucide-react";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

function Home(){

    const navigate = useNavigate();

    const verify = async()=>{
        try {
            const verify = await axios.get("http://localhost:3000/gitcollect/auth/verify", {
            withCredentials: true
            });

            if(verify.data.isLogged){
                console.log("naay token??");
                return;
            }

        } catch (error) {
            console.log(error);
            navigate('/login');
        }
        
    };

    useEffect(()=>{
      verify();
    }, []);
    return(
        <>
            <h1>YOUR LOGGED IN!</h1>
        </>
    );
}


export default Home;