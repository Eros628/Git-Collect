import { useEffect } from "react";
import Header from "../components/Header";
import axios from 'axios';
import { Search } from "lucide-react";
import Footer from '../components/Footer';
import { useNavigate } from "react-router";
import  styles from '../Pages/Home.module.css';
import { ChevronDown } from "lucide-react";



function Home(){

    const navigate = useNavigate();
    /* const verify = async()=>{
        try {
            const verify = await axios.get("http://localhost:3000/gitcollect/auth/verify", {
            withCredentials: true
            });

            if(verify.data.isLogged){
                return;
            }

        } catch (error) {
            console.log(error);
            navigate('/login');
        }
        
    };

    useEffect(()=>{
      verify();
    }, []);*/
    
   


    return(
        <div className={styles['home-page']}>
            <Header />
            <div className= {styles['hero-section']}>
                <h1 className={styles['text-hero-section']}>Find <span>repositories</span> <br/>worth keeping</h1>
            </div>
            <div className= {styles['search-container']}>
                <div className={styles['search-bar-wrapper']}>
                    <div className={styles['search-bar']}>
                        <form>
                            <label for="search-input"><Search /></label>
                            <input id="search-input" placeholder="Search repositories, users, orgs, or topics"></input>
                            <button className={styles['search-btn']}>
                                Search
                            </button>
                        </form>
                    </div>
                    <div className={styles['filter-container']}>
                        <button className={styles['type-filter']}><span>Type:</span>Repository <ChevronDown /></button>
                        <div className={styles['secondary-filter-wrapper']}>
                            <button className= {styles['search-in-filter']}><span>Search In:</span>Anywhere <ChevronDown /></button>
                            <button className={styles['language-filter']}><span>Lang:</span>Anywhere <ChevronDown /></button>
                            <button className={styles['sort-filter']}>
                                <span>Sort:</span> Best Match <ChevronDown />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="result-container">
                
            </div>
            <Footer/>
        </div>
    );
}


export default Home;