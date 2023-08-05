import './Header.scss'
import {Outlet} from "react-router-dom";
export default function Header() {
    return (
        <div className={"main-page-container"}>
        <nav className="navbar">
            <div className="container">
                <h3>Logo</h3>
            </div>
        </nav>
            <div className="outlet-container">
                <Outlet/>
            </div>
        </div>

    )
}
