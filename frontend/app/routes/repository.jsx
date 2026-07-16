import { ArrowLeft, CircleAlert, Files, Folder, GitFork, Plus, Star, Eye, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/repository.module.css";
import { useContext, useState } from "react";
import { AuthUserContext } from "../context/authUserContext";

export default function Repository(){
    const user = useContext(AuthUserContext);
    const [isCommitClicked, setIsCommitClicked] = useState(false);

    return (
        <div className={styles['repo-page']}>
            <Header user={user}/>
            <div className={styles['bg-circle']}>

            </div>
             <div className={styles['bg-circle2']}>

            </div>
            <div className={styles["main-section"]}>
                <div className={styles["upper-section"]}>
                    <div className={styles["upper-wrapper-text"]}>
                        <div>
                            <button className={styles["back-to-search-btn"]}>
                                <ArrowLeft />
                                <p>Back to Search</p>
                            </button>
                        </div>
                        <div>
                            <p>
                                &gt; Eros628 &gt; <span>Git-Collect</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles['repo-info-details']}>
                    <div className={styles["repo-profile-wrapper"]}>
                        <div className={styles["author-profile-wrapper"]}>
                            <img src="" alt="" />
                            <p>Eros628</p>
                            <button className={styles['view-profile-btn']}>
                                <p>View Profile</p>
                                <ArrowRight />
                            </button>
                        </div>
                        <div className={styles["repo-description-wrapper"]}>
                            <div>
                                <h1><span>Eros628</span>/Git-Collect</h1>
                                <p>An enterprise-grade Next.js boilerplate for high-performance, maintainable apps. 
                                    Includes Tailwind, tRPC, TypeScript, Prisma, and NextAuth.
                                </p>
                                <div className={styles["topic-wrapper"]}>
                                    <div className={styles['topic']}>
                                        <p>Javascript</p>
                                    </div>
                                    <div  className={styles['topic']}>
                                        <p>Javascript</p>
                                    </div>
                                    <div  className={styles['topic']}>
                                        <p>Javascript</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className={styles["view-github-btn"]}>
                                    <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#00b83d]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#00b83d]"> </path> </g> </g> </g> </g></svg>
                                    <p>View on Github</p>
                                </button>
                                <button className={styles["add-collection-btn"]}>
                                    <Plus />
                                    <p>Add to Collection</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles["repo-content-wrapper"]}>
                        <div className={styles["repo-files"]}>
                            <div className={styles["header-file-label"]}>
                                <button onClick={
                                    ()=>{
                                        setIsCommitClicked(false);
                                    }
                                } className={styles["file-btn"]} style={{borderBottom: !isCommitClicked ? "2px solid #0095FF" : "0"}}>
                                    File
                                </button>
                                <button onClick={
                                    ()=>{
                                        setIsCommitClicked(true);
                                    }
                                }  className={styles["commit-btn"]} style={{borderBottom: isCommitClicked ? "2px solid #0095FF" : "0"}}>
                                    Commit
                                </button>
                            </div>
                            {isCommitClicked ? 
                            <div className={styles['commit']}>
                                <p>Commits</p>
                                <div> 
                                    <div className={styles['commit-wrapper']}>
                                        <div className={styles["profile-wrapper"]}>
                                            <img src="" alt="profile picture" />
                                            <p>Eros628</p>
                                        </div>
                                        <p>Update React element symbol</p>
                                    </div>
                                    <div>
                                        <p>2 days ago</p>
                                    </div>
                                </div>
                                 <div> 
                                    <div className={styles['commit-wrapper']}>
                                        <div className={styles["profile-wrapper"]}>
                                            <img src="" alt="profile picture" />
                                            <p>Eros628</p>
                                        </div>
                                        <p>Update React element symbol</p>
                                    </div>
                                    <div>
                                        <p>2 days ago</p>
                                    </div>
                                </div>
                                 <div> 
                                    <div className={styles['commit-wrapper']}>
                                        <div className={styles["profile-wrapper"]}>
                                            <img src="" alt="profile picture" />
                                            <p>Eros628</p>
                                        </div>
                                        <p>Update React element symbol</p>
                                    </div>
                                    <div>
                                        <p>2 days ago</p>
                                    </div>
                                </div>
                    
                            </div>:
                            <>
                                <div className={styles["files"]}>
                                    <div className={styles["upper-header-table-files"]}>
                                        <div className={styles["commit-wrapper"]}>
                                            <div className={styles["profile-wrapper"]}>
                                                <img src="" alt="profile picture" />
                                                <p>Eros628</p>
                                            </div>
                                            <p>Update React element symbol</p>
                                        </div>
                                        <div>
                                            <p>2 days ago</p>
                                        </div>
                                    </div>
                                    <div className={styles["file-content"]}>
                                        <div>
                                            <Folder />
                                            <p>package </p>
                                        </div>
                                        <div>
                                            <Folder />
                                            <p>package </p>
                                        </div>
                                        <div>
                                            <Folder />
                                            <p>package </p>
                                        </div>
                                        <div>
                                            <Files />
                                            <p>testing.js </p>
                                        </div>
                                        <div>
                                            <Files />
                                            <p>testing.js </p>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className={styles["opened-file-wrapper"]}>
                                    <div className={styles["file-name"]}>
                                        <p>README.md</p>
                                    </div>
                                </div>
                            </>

                            }
                        </div>
                        <div className={styles["repo-stats-wrapper"]}>
                            <div className={styles["about-section-repo-stats"]}>
                                <p>About</p>
                                <div>
                                    <div>
                                        <Star />
                                        <p>218k stars</p>
                                    
                                    </div>
                                    <div>
                                        <Eye />
                                        <p>6.7k watching</p>
                                    </div>
                                    <div>
                                        <GitFork />
                                        <p>44k forks</p>
                                    </div>
                                    <div>
                                        <CircleAlert/>
                                        <p>1.2k open issues</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["languages-repo"]}>
                                <p>Languages</p>
                                <div className={styles["languages-wrapper"]}>
                                    <div className={styles["languages-bar"]}>
                                        {Array(3).fill(0).map((item, index)=>{
                                            return <div key={index} style={{height: "100%", width:"25%", backgroundColor: "yellow"}}> </div>
                                        })}
                                    </div>
                                    <div className={styles["language"]}>
                                        <div>
                                            <div className={styles["circle-language"]}></div>
                                            <p>Javascript</p>
                                        </div>
                                        <p>85%</p>
                                    </div>
                                    <div className={styles["language"]}>
                                        <div>
                                            <div className={styles["circle-language"]}></div>
                                            <p>Javascript</p>
                                        </div>
                                        <p>85%</p>
                                    </div>
                                    <div className={styles["language"]}>
                                        <div>
                                            <div className={styles["circle-language"]}></div>
                                            <p>Javascript</p>
                                        </div>
                                        <p>85%</p>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer />
        </div>
    );
}
