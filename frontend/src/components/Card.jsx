import { Plus, Star } from "lucide-react";
import '../App.css';

function Card(param){
    console.log(param.data.name);
    return(
        <div className="card-wrapper" key={param.index}>
            <div className="card-header">
                <div className="profile-container">
                    <img src={param.data.owner.avatar_url} alt="" className="avatar" />
                    <div className="name-container">
                        <p>{param.data.name}</p>
                        <p>@{param.data.owner.login}</p>
                    </div>
                </div>
                <button className="add-collection-btn">
                    <Plus size={20} />
                </button>
            </div>
            <div className="card-description">
                <p>
                    {param.data.description}
                </p>
               
            </div>
            <div className="card-topic">
                {param.data.topics.slice(0,3).map((item, index)=>{
                    return <p title={item} key={index}>{item}</p>
                })}
            </div>
            <hr />
            <div className="card-footer">
                <div>
                    <div className="language-container">
                        <div className="circle"></div>
                        <p>{param.data.language}</p>
                    </div>
                    <div className="stars-container">
                        <Star size={15} fill="yellow" color="yellow"/>
                        <p>{param.data.stargazers_count}</p>
                    </div>
                </div>
                <p>Updated 1 day ago</p>
            </div>
        </div>
    )
}

export default Card;