
import "../styles/root.css";
import  Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { authMiddleware } from "../routeMiddleware/authMiddleware.js";
import { AuthUserContext } from "../context/authUserContext.js";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";
import { Outlet, useLoaderData} from "react-router";
import { userContext } from "../context/userContext.js";

const queryClient = new QueryClient();

export const clientMiddleware = [authMiddleware];

export async function clientLoader({context}){
    const user  =  context.get(userContext);
    return {user};
}

export default function layout(){
    const {user} = useLoaderData();
    return(
        <div id="root">
            <QueryClientProvider client={queryClient}>
                    <SkeletonTheme baseColor="#202020" highlightColor="#444" >
                        <AuthUserContext.Provider value={user}>
                            <Outlet />
                        </AuthUserContext.Provider>
                    </SkeletonTheme>
            </QueryClientProvider>
        </div>
    )
}
