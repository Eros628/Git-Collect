import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
function LoadingSkeletonCard({type, key}){
    return(
        <>   
            {(type == "repository" || type == "topics")? 
            <div key={key} className="card-wrapper">
                <div className="card-header">
                    <div className="profile-container">
                        <Skeleton width={50} height={50} borderRadius={50}/>
                        <div className="name-container">
                            <p><Skeleton width={160} height={20} /></p>
                            <p><Skeleton width={120} height={10}/></p>
                        </div>
                    </div>
                    <Skeleton width={20} height={20}/>
                </div>
                <div className="card-description">
                    <p>
                        <Skeleton width={400} height={200}/>
                    </p>
                
                </div>
                <div className="card-topic">
                    
                    <Skeleton width={50} height={15}/>
                    <Skeleton width={50} height={15}/>
                    
                 
                </div>
                <hr />
                <div className="card-footer">
                    <div>
                        <div className="language-container">
                            <Skeleton width={50} height={15} />
                        </div>
                        <div className="stars-container">
                             <Skeleton width={50} height={15} />
                        </div>
                    </div>
                    <p><Skeleton width={100} height={15} /></p>
                </div>
            </div> :  
            <div key={key} className="user card-wrapper">
                <div className="user-avatar-container">
                    <Skeleton width={120} height={120} borderRadius={60}/>
                </div>
                <div className="card-profile-container">
                    <div className="name-wrapper">
                        <p><Skeleton width={150} height={30} /></p>
                    </div>
                    <div className="user-metadata">
                        <div>
                            <Skeleton width={20} height={20}/>
                            <p><Skeleton width={120} height={20} /></p>
                        </div>
                        <div>
                            <Skeleton width={20} height={20}/>
                            <p><Skeleton width={120} height={20} /></p>
                        </div>
                        <div>
                            <Skeleton width={20} height={20}/>
                            <p><Skeleton width={120} height={20}/></p>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                  
                    <Skeleton width={20} height={20}/>
                    
                </div>
            </div>
            }
        </>
       
    )
}

export default LoadingSkeletonCard;