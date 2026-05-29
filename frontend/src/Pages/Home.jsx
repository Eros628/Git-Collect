import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from 'axios';
import { Search } from "lucide-react";
import Footer from '../components/Footer';
import { useNavigate } from "react-router";
import  styles from '../Pages/Home.module.css';
import { ChevronDown, ChevronUp,CircleArrowDown } from "lucide-react";
import {TypeAnimation} from 'react-type-animation';
import RepoCard from "../components/RepoCard";



function Home(){
    const [type, setType] = useState('repository');
    const [isTypeOpen, setTypeOpen]= useState(false);
    const [isSearchInOpen, setSearchInOpen] = useState(false);
    const [isLangOpen, setLangOpen] = useState(false);
    const [isSortOpen, setSortOpen] = useState(false);
    const [user, setUser] = useState({});
    const [hasResult, sethasResult] = useState(false);
    const [result, setResult] = useState({totalcount: "", items:[]});
    const [keyword, setKeyword]= useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [maxPage, setMaxPage] = useState(0);


    const verify = async()=>{
        try {
            const verify = await axios.get("http://localhost:3000/gitcollect/auth/verify", {
            withCredentials: true
            });

            if(verify.data.isLogged){
                const userData = await axios.get("http://localhost:3000/gitcollect/auth/user", {
                    withCredentials: true
                });

                setUser(userData.data);
                console.log(userData.data);
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

    const getResult = async(fromSubmit = false)=>{
        try {
            let data; 
            if(selectedFilter.type == "repository"){
                data = await axios.get("http://localhost:3000/gitcollect/api/search/repositories", {withCredentials: true,
                    params: {
                        q: `${keyword} in:${selectedFilter.in} lang:${selectedFilter.lang}`,
                        sort: selectedFilter.sort,
                        page: page
                    }},
                    );
            }
            else if(selectedFilter.type == "user" || selectedFilter.type == "org"){
                data = await axios.get("http://localhost:3000/gitcollect/api/search/user", 
                    {withCredentials: true,
                    params: {
                        q: `${keyword} in:${selectedFilter.in} type:${selectedFilter.type}`,
                        sort: selectedFilter.sort,
                        page: page
                    }},
                    );
            }

            if(fromSubmit){
                setResult({totalcount:data.data.total_count, items: [...data.data.items]});
            }

            else{
                setResult(prev=>({totalcount:data.data.total_count, items: [...prev.items, ...data.data.items]}));
            }
            setMaxPage(Math.floor((data.data.total_count / 9)));
            sethasResult(true);

        } catch (error) {
            console.log(error);
        }
          
    }



    useEffect(()=>{
        if(result.items.length == 0){
            return;
        }
        getResult();
    },[page]);

    return(
        <div className={styles['home-page']} style={{gap: hasResult ? "50px" : "20px"}}>
            <Header user={user} />
            {!hasResult &&  <div className= {styles['hero-section']}>
                <h1 className={styles['text-hero-section']}>Find <TypeAnimation sequence={[
                    "repositories", 5000, "projects", 5000, "libraries", 5000, "tools", 5000, "frameworks", 5000
                ]} wrapper="span" speed={50} repeat={Infinity}  /> <br/>worth keeping</h1>
            </div>}
           
            <div className= {styles['search-container']}>
                <div className={styles['search-bar-wrapper']}>
                    <div className={styles['search-bar']}>
                        <form onSubmit={(e)=>{
                            e.preventDefault();
                            if(!keyword){
                                console.log("EMPTY");
                                return;
                            }
                            getResult(true);
                        }}>
                            <label for="search-input"><Search /></label>
                            <input onChange={(e)=>{
                                setKeyword(e.target.value);
                            }} id="search-input" placeholder="Search repositories, users, orgs, or topics"></input>
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

            {hasResult && <div className={styles["result-container"]}>
                <div className={styles["result-text-header"]}>
                    <div className={styles["search-result-data"]}>
                        <p>Search Results</p>
                        <p>{result.totalcount} found</p>
                    </div>
                </div>
                {result.items.map((item, index)=>{
                    console.log(item);
                    return <RepoCard index={index} data={item} />
                })}

                {(result.totalcount > 9 && page <= maxPage) && <div className={styles['load-more-container']}> 
                    <button onClick={
                        ()=>{
                            setPage(prev => prev +1);
                        }
                    } className={styles['load-more-btn']}>Load more <CircleArrowDown size={20} /></button>
                </div>}
            </div>
            }
            
            <Footer/>
        </div>
    );
}


export default Home;