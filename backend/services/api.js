import axios, { formToJSON } from "axios";
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

export async function getUserAllRepos(user){
    try {
        const response = await gitAuth.get(`/users/${user}/repos`);
        const response_starred_repo = await gitAuth.get(`/users/${user}/starred`);

        const repos = await Promise.all( response.data.map(async (repo, index) =>{
            let isStarred = response_starred_repo.data.some(starItem => starItem.id === repo.id) ? "true" : "false";
            const languages = await gitAuth.get(repo.languages_url);
           

            const item = {
                id: repo.id,
                name: repo.name,
                full_name: repo.full_name,
                html_url: repo.html_url,
                description: repo.description,
                created_at: repo.created_at,
                updated_at: repo.updated_at,
                git_url: repo.git_url,
                ssh_url: repo.ssh_url,
                stargazers_count: repo.stargazers_count,
                languages: languages.data,
                isStarred: isStarred
            };

            return item;
        }));

        return repos;
       
    } catch (error) {
        console.log(error);
    }
}



