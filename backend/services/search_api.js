import axios, { formToJSON } from "axios";
import { githubConfig } from "../config/github.js";




export async function  searchByRepos(params, githubAxios){

    try {
        const response = await githubAxios.get(`/search/repositories`, 
        {
            params:{
                q: params.q, 
                sort: params.sort,
                page: params.page,
                order: params.order,
                per_page: 9
            },
        },
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
                description,
                topics,
                language
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
                description,
                topics,
                language
            } 
        });

        return {total_count: response.data.total_count, items:items};
    } catch (error) {
        console.log(error);
    }
}

export async function searchByUser(params, githubAxios) {
    try {
        const response = await githubAxios.get('/search/users', 
            {params:{
                q: params.q, 
                sort: params.sort,
                page: params.page,
                order: params.order,
                per_page: 9
            }}
        );
        return response;
    } catch (error) {
        console.log(error);
    }

}

export async function getUserAllRepos(user, githubAxios){
    try {
        const response = await githubAxios.get(`/users/${user}/repos`);
        const response_starred_repo = await githubAxios.get(`/users/${user}/starred`);

        const repos = await Promise.all( response.data.map(async (repo, index) =>{
            let isStarred = response_starred_repo.data.some(starItem => starItem.id === repo.id) ? "true" : "false";
            const languages = await githubAxios.get(repo.languages_url);
           

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



