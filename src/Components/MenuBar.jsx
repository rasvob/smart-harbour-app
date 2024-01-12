import { NavLink } from "react-router-dom";

const MenuBar = () => {
    return (
        <div className="navbar shadow-sm">
            <div className="flex-1">
                <NavLink to="/" className="btn btn-ghost text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                Smart Harbour
                </NavLink>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal">
                <li className="mx-1"><NavLink to="/">Domů</NavLink></li>
                <li className="mx-1"><NavLink to="/state-details">Podrobný stav</NavLink></li>
                <li className="mx-1"><NavLink to="/payments">Platby stání</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default MenuBar;