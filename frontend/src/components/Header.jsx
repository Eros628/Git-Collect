import {FolderGit2} from 'lucide-react';
import { useNavigate, useLocation} from 'react-router';
import '../App.css';

function Header(){
    const location = useLocation();
    console.log(location.pathname);
    return(
        <div className={(location.pathname == '/login' || location.pathname =='/') ? 'header login' : 'header home'}>
            <div className="logo-container">
                <FolderGit2 />
                <h1 className='name-site'>GitCollect</h1>
            </div>

            {
                (location.pathname != '/login' && location.pathname != "/" ) && 
                <div className="nav-container">
                    <a href="">Search</a>
                    <a href="">Collections</a>
                    <a href="">Trending</a>
                 </div>
            }

            {
                (location.pathname != '/login' && location.pathname != "/" ) &&
                  <div className="profile-container">
                    <p className="username">
                        Eros628
                    </p>
                 </div>
            }
    
        </div>
    )
}

export default Header;