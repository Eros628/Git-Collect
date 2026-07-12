import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import axios from 'axios';
import { Search, User } from "lucide-react";
import Footer from '../components/Footer';
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp,CircleArrowDown } from "lucide-react";
import {TypeAnimation} from 'react-type-animation';
import RepoCard from "../components/RepoCard";
import UserCard from '../components/UserCard';
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import LoadingSkeletonCard from "../components/SkeletonCard";
import Skeleton from "react-loading-skeleton";

import  styles from '../styles/home.module.css';
import { AuthUserContext } from "../context/authUserContext";

export default function Home(){
    const navigate = useNavigate();

    const [type, setType] = useState('repository');
    const [isTypeOpen, setTypeOpen]= useState(false);
    const [isSearchInOpen, setSearchInOpen] = useState(false);
    const [isLangOpen, setLangOpen] = useState(false);
    const [isSortOpen, setSortOpen] = useState(false);
    const [keyword, setKeyword]= useState("");
    const [page, setPage] = useState(1);
    const[maxNumDisplay, setMaxNumDisplay] = useState(9);
    const [maxPage, setMaxPage] = useState(0);
    const [finalFilter, setFinalFilter] = useState({});
    const [isFetch, setIsFetch] = useState(false);

    const user = useContext(AuthUserContext);
    

    
    const filters = [{
            type: "repository",
            in: ['name', 'desc', 'readme'],
            sort: ['stars', 'forks', 'updated', 'help-wanted-issues'],
            hasLang: true
        },
        {
            type: "user",
            in: ['login', 'fullname', 'email'],
            sort: ['followers', 'repositories', 'joined'],
            hasLang: false
        },
         {
            type: "org",
            in:['login', 'fullname','email'],
            sort: ['repositories', 'joined'],
            hasLang: false
        },
        {
            type: "topics",
            in: ['Any'],
            sort: ['Best Match'],
            hasLang: false
        }
    ]

    const [selectedFilter, setSelectedFilter] =  useState({
        type: "repository",
        in: "Any",
        lang: "Any",
        sort: "Best Match"
    });


    const lang = ['Javascript','HTML','CSS' , "Python", "Typescript", "Java", "C++", 'C#', 'PHP', 'C', 'Shell', 'Go', 'Rust', 'Ruby', 'Swift', 'Dart', 'R', 'Kotlin']

    const displayText = ['repositories', 'projects', 'libraries', 'tools', 'frameworks'];

    useEffect(()=>{
        setSelectedFilter(prev=>({
            ...prev, 
            in: "Any",
            lang: "Any",
            sort: "Best Match"
        }));

        if(selectedFilter.type != "repository"){
            setLangOpen(false);
        }
    }, [selectedFilter.type]);

    const getResult = async(pageParam)=>{
        let data; 
        console.log(`PAGE PARAM: ${pageParam}`);

        if(finalFilter.type == "repository" || finalFilter.type == "topics"){
            data = await axios.get("http://localhost:3000/gitcollect/api/search/repositories", {withCredentials: true,
                params: {
                    q:  finalFilter.type == "topics" ? `topic:${keyword}`: `${keyword}` +` in:${finalFilter.in} lang:${finalFilter.lang}`,
                    sort: finalFilter.sort,
                    page: pageParam
                }},
                );
        }
        else if(finalFilter.type == "user" || finalFilter.type == "org"){
            
                data = await axios.get("http://localhost:3000/gitcollect/api/search/user", 
                    {withCredentials: true,
                    params: {
                        q: `${keyword} in:${finalFilter.in} type:${finalFilter.type}`,
                        sort: finalFilter.sort,
                        page: pageParam
                    }},
                    );
        }

        setMaxPage(Math.floor((data.data.total_count / 9)));
        return data.data;   
    }

    const getUserMetaData = async(username) =>{
        const userData = await axios.get('http://localhost:3000/gitcollect/user', {withCredentials: true, params:{user: username}});
        return userData.data;
    }   

    const {data, isLoading, isError, isSuccess,fetchStatus,fetchNextPage} = useInfiniteQuery({
        queryKey: ['result', {keyword, ...finalFilter}],
        queryFn: ({pageParam = 1})=> getResult(pageParam),
        enabled: isFetch,
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 10,
        getNextPageParam: (lastPage, allPages)=>{
            return lastPage.items.length == 100 ? allPages.length + 1 : undefined;  
        }
    });
       
    const dataCombinedPages = data?.pages.flatMap((page)=> page.items) || [];

    const userResult = useQueries({
        queries: dataCombinedPages.slice(0, maxNumDisplay).map((user)=>({
            queryKey: ['user', user.id],
            queryFn: ()=>getUserMetaData(user.login),
            enabled: !!user.login,
            staleTime: 1000 * 60 * 10
        })),
        combine: (users)=>{
            return{
                data: users.map((user)=>user.data),
                loading: users.some((user)=> user.isLoading),
                fetching: users.some((user)=>user.isFetching),
                error: users.every((user)=> user.isError),
                fetched: users.every((user)=>user.isFetched),
                success: users.every((user)=> user.isSuccess)
            }
        }
    });

    useEffect(()=>{
    
        if(userResult?.data?.length % 100 === 0){
            fetchNextPage();
            return;
        }
    },[page])


    const hasLoadedData  = (finalFilter.type == "user" || finalFilter.type == "org") ? userResult.data?.some((item)=>item !== undefined) : dataCombinedPages.length > 0;

    const showSkeleton = isFetch && !hasLoadedData;
    const showData = isSuccess && hasLoadedData;
    
 
    return(
        <div className={styles['home-page']} style={{gap: isSuccess ? "50px" : "20px"}}>
            <Header user={user}/>
            {!isFetch &&  <div className= {styles['hero-section']}>
                <h1 className={styles['text-hero-section']}>Find <TypeAnimation sequence={[
                    "repositories", 5000, "projects", 5000, "libraries", 5000, "tools", 5000, "frameworks", 5000
                ]} wrapper="span" speed={50} repeat={Infinity}  /> <br/>worth keeping</h1>
            </div>}
           
            <div className= {styles['search-container']}>
                <div className={styles['search-bar-wrapper']}>
                    <div className={styles['search-bar']}>
                        <form onSubmit={(e)=>{
                            e.preventDefault();
                            const inputData = e.target.elements.searchInput.value;
                            if(!inputData){
                                console.log("EMPTY");
                                return;
                            }
                            setKeyword(inputData);
                            setFinalFilter({...selectedFilter});
                            setIsFetch(true);
                            setMaxNumDisplay(9);
                            setPage(1);
                        }}>
                            <label for="search-input"><Search /></label>
                            <input autoComplete="off" name="searchInput"  id="search-input" placeholder="Search repositories, users, orgs, or topics"></input>
                            <button type="submit" className={styles['search-btn']}>
                                Search
                            </button>
                        </form>
                    </div>
                    <div className={styles['filter-container']}>
                        <button onClick={
                            ()=>{
                                setTypeOpen(!isTypeOpen);
                            }
                        } className={styles['type-filter']}>
                        <span>Type:</span>{selectedFilter.type} {isTypeOpen ? <ChevronUp /> : <ChevronDown />}
                         <div className={styles['dropdown-wrapper']} style={{display:  isTypeOpen ? "flex": "none"}}>
                            {filters.map((item, index)=>{
                                return <div onClick={
                                    ()=>{
                                        setSelectedFilter(prev =>({...prev, type: item.type}));
                                    }
                                } className={styles['item-type']} key={index}>{item.type}</div>
                            })}
                        </div>
                        </button>
                        <div className={styles['secondary-filter-wrapper']}>
                            <button onClick={
                                ()=>{
                                   setSearchInOpen(!isSearchInOpen);
                                }
                            } className= {styles['search-in-filter']}>
                                <span>Search In:</span>{selectedFilter.in}{isSearchInOpen ? <ChevronUp/> : <ChevronDown />}
                                <div className={styles['dropdown-wrapper']} style={{display:  isSearchInOpen ? "flex": "none"}}>
                                    {filters.find((i)=> i.type == selectedFilter.type).in.map((item, index)=>{
                                        return <div onClick={
                                            ()=>{
                                                setSelectedFilter(prev =>({...prev, in: item}))
                                            }
                                        } className={styles['item-type']} key={index}>{item}</div>
                                    })}
                                </div>
                            </button>
                            {
                                filters.find((i)=> i.type == selectedFilter.type).hasLang &&   
                                <button onClick={
                                    ()=>{
                                        setLangOpen(!isLangOpen);
                                    }
                                } className={styles['language-filter']}>
                                    <span>Lang: </span>{selectedFilter.lang}                                
                                    {isLangOpen ? <ChevronUp/> : <ChevronDown />}
                                    <div className={styles['dropdown-wrapper']} style={{display:  isLangOpen ? "flex": "none"}}>
                                        {lang.map((item, index)=> {
                                            return <div onClick={
                                                ()=>{
                                                    setSelectedFilter(prev => ({
                                                        ...prev, lang: item
                                                    }));
                                                }
                                            } className={styles['item-type']} key={index}>{item}</div>
                                        })}
                                    </div>
                                </button>
                                
                            }
    
                            <button onClick={
                                ()=>{
                                    setSortOpen(!isSortOpen);
                                }
                            } className={styles['sort-filter']}>
                                <span>Sort:</span> {selectedFilter.sort}{isSortOpen? <ChevronUp/> : <ChevronDown></ChevronDown>}
                                <div className={styles['dropdown-wrapper']} style={{display:  isSortOpen ? "flex": "none"}}>
                                        {filters.find((i)=> i.type == selectedFilter.type).sort.map((item, index)=>{
                                            return <div onClick={
                                                ()=>{
                                                    setSelectedFilter(prev=>({
                                                        ...prev, sort: item
                                                    }));
                                                }
                                            } className={styles['item-type']} key={index}>{item}</div>
                                        })}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
                                        
            {showSkeleton &&
                <div className={styles['result-container']}>
                    <div className={styles['result-text-header']}>
                        <div className={styles["search-result-data"]}>
                                <p><Skeleton width={150}/></p>
                                <p><Skeleton width={150}/></p>
                        </div>
                    </div>
                    {Array(9).fill(0).map((_, index)=>(
                        <LoadingSkeletonCard key={index} type={finalFilter.type}/>
                    ))}
        
                </div>
            
                }
            {
                showData && 
                <div className={styles["result-container"]}>
                    <div className={styles["result-text-header"]}>
                        <div className={styles["search-result-data"]}>
                            <p>Search Results</p>
                            <p>{data.pages[0].total_count} found</p>
                        </div>
                    </div>
                    { (finalFilter.type == "user" || finalFilter.type == "org")? userResult.data.map((item, index)=>{
                        if(!item){
                            return <LoadingSkeletonCard key={index} type={finalFilter.type}/>
                        }
                        else{
                            return <div key={index}> <UserCard data={item}/> </div>
                        }
                    })
                    :
                    
                    dataCombinedPages.slice(0, maxNumDisplay).map((item, index)=>{
                        return <div key={index}><RepoCard  data={item} /> </div>
                    })}

                    {(data.pages[0].total_count > 9 && page <= maxPage) && <div className={styles['load-more-container']}> 
                        <button onClick={
                            ()=>{
                                setPage(prev => prev +1);
                                setMaxNumDisplay(prev => prev + 9);

                            }
                        } className={styles['load-more-btn']}>Load more <CircleArrowDown size={20} /></button>
                    </div>}
                </div>
            }     
            <Footer/>           
        </div>
    );
}
