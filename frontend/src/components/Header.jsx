import {FolderGit2} from 'lucide-react';
import '../App.css';
import '../Pages/Login.css';

function Header(){
    return(
        <div className="header">
            <div className="logo-container">
                <FolderGit2 />
                <h1 className='name-site'>GitCollect</h1>
            </div>
        </div>
    )
}

export default Header;