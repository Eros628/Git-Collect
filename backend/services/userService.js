import { response } from "express";


export async function getUser(user, githubAxios){
    try {
        const response = await githubAxios.get(`/users/${user}`);
        return response.data;

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
