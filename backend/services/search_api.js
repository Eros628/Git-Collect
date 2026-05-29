import axios, { create, formToJSON } from "axios";
import { githubConfig } from "../config/github.js";
import {DateTime} from 'luxon';

function getUpdatedDate(date){
    const today = DateTime.now();
    const end = DateTime.fromISO(date);
    
    const diff =  today.diff(end, ['years', 'months', 'days', 'hours', 'minutes']).toObject();

    return diff;
}


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

        const colorList = await axios.get("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");


        const items = response.data.items.map(item =>{
            const updatedDate = getUpdatedDate(item.updated_at);
            const data = {
                id: item.id,
                name: item.name,
                owner: {
                    login: item.owner.login,
                    avatar_url: item.owner.avatar_url,
                    html_url: item.owner.html_url,
                    repos_url: item.owner.repos_url,
                    starred_url: item.owner.starred_url,
                    type: item.owner.type
                },
                stargazers_count: item.stargazers_count ??0,
                html_url: item.html_url,
                languages_url: item.languages_url,
                created_at: item.created_at,
                updated_at: updatedDate,
                description: item.description || "No description provided.",
                topics: item.topics,
                language: item.language || "Unknown",
                colorLanguage: item.language ? colorList.data[item.language].color : "gray"
            }
            
            return data;
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



