import { Folders, UsersRound, Calendar, Plus } from "lucide-react";
import {DateTime} from 'luxon';


function UserCard({data}){
    const date = DateTime.fromISO(data.created_at).toLocaleString;
    return(
        <div className="user card-wrapper">
            <div className="user-avatar-container">
                 <img src={data.avatar_url} alt="" />
            </div>
            <div className="card-profile-container">
                <div className="name-wrapper">
                    <p>{data.login}</p>
                </div>
                <div className="user-metadata">
                    <div>
                        <Folders />
                        <p>{data.public_repos} repositories</p>
                    </div>
                    <div>
                        <UsersRound />
                        <p>{data.followers} followers</p>
                    </div>
                    <div>
                        <Calendar />
                        <p>Joined{date}</p>
                    </div>
                </div>
            </div>
            <div className="button-container">
                 <button className="add-collection-btn">
                    <Plus size={20} />
                </button>
            </div>
        </div>
    )
}

export default UserCard;