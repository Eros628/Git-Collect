import { Plus, Star } from "lucide-react";
import '../App.css';

function RepoCard({data}){
    const getUpdatedDate = (date)=>{
        if(date.years > 0){
            return `${Math.floor(date.years)} ${date.years == 1 ? "year" :"years"}`;
        }
        else if(date.months > 0){
            return `${Math.floor(date.months)} ${date.months == 1 ? "month" :"months"}`;
        }
        else if(date.days > 0){
           return `${Math.floor(date.days)} ${date.days == 1 ? "day" :"days"}`;
        }
        else if(date.hours > 0){
            return `${Math.floor(date.hours)} ${date.hours == 1 ? "hour" :"hours"}`;
        }
        else if(date.minutes > 0){
            return `${Math.floor(date.minutes)} ${date.minutes == 1 ? "minute" :"minutes"}`;
        }
        else{
            return `seconds`;
        }
    }
    return(
        <div className="card-wrapper">
            <div className="card-header">
                <div className="profile-container">
                    <img src={data.owner.avatar_url} alt="" className="avatar" />
                    <div className="name-container">
                        <p>{data.name}</p>
                        <p>@{data.owner.login}</p>
                    </div>
                </div>
                <button className="add-collection-btn">
                    <Plus size={20} />
                </button>
            </div>
            <div className="card-description">
                <p>
                    {data.description}
                </p>
               
            </div>
            <div className="card-topic">
                {data.topics.slice(0,3).map((item, index)=>{
                    return <p title={item} key={index}>{item}</p>
                })}
            </div>
            <hr />
            <div className="card-footer">
                <div>
                    <div className="language-container">
                        <div className="circle" style={{backgroundColor: data.colorLanguage}}></div>
                        <p>{data.language}</p>
                    </div>
                    <div className="stars-container">
                        <Star size={15} fill="yellow" color="yellow"/>
                        <p>{data.stargazers_count}</p>
                    </div>
                </div>
                <p>Updated {getUpdatedDate(data.updated_at)} a ago</p>
            </div>
        </div>
    )
}

export default RepoCard;