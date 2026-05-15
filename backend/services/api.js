import axios from "axios";
import 'dotenv/config.js';

const BASE_URL = "https://api.github.com/search";

const USER_NAME = process.env.USERNAME;
const KEY = process.env.TOKEN;


const githubApi = axios.create({
    baseURL: BASE_URL,
    auth: {
        username: USER_NAME ,
        password: KEY
    }
})

export async function  searchByRepos(params){

    try {
        const response = await githubApi.get(`/repositories`, 
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
        const response = await githubApi.get('/users', 
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


export async function getUsers ({param}) {
    
}