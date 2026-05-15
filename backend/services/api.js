import axios from "axios";
import { config } from "dotenv";
import 'dotenv/config.js';


const BASE_URL = "https://api.github.com";



const USER_NAME = process.env.USERNAME;
const KEY = process.env.TOKEN;


const gitAuth = axios.create({
    baseURL: BASE_URL
});


gitAuth.interceptors.request.use((config)=>{
    config.auth = {
        username: USER_NAME,
        password: KEY
    };
    return config;
});




export async function  searchByRepos(params){

    try {
        const response = await gitAuth.get(`/search/repositories`, 
        {
            params:{
                q: params.q, 
                sort: params.sort,
                page: params.page,
                order: params.order,
                per_page: params.per_page
            }
        }
        );

        const items = response.data.items.map(item =>{
            const {
                id, 
                name, 
                owner:{
                    login, 
                    avatar_url, 
                    html_url:owner_url, 
                    repos_url, 
                    starred_url, 
                    type
                },
                html_url,
                languages_url,
                stargazers_count,
                created_at,
                updated_at,
            } = item;

            return  {
                id, 
                name, 
                owner:{
                    login, 
                    avatar_url, 
                    html_url:owner_url, 
                    repos_url, 
                    starred_url, 
                    type
                },
                html_url,
                languages_url,
                stargazers_count,
                created_at,
                updated_at,
            } 
        });

        return items;
    } catch (error) {
        console.log(error);
    }
}

export async function searchByUser(params) {
    try {
        const response = await gitAuth.get('/users', 
            {params:{
                q: params.q, 
                sort: params.sort,
                page: params.page,
                order: params.order,
                per_page: params.per_page
            }}
        );
        return response;
    } catch (error) {
        console.log(error);
    }

}

export async function getUserRepos(params){
    try {
        const response = await searchApi
    } catch (error) {
        console.log(error);
    }
}



