import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Header = () => {

    const userInfo = useContext(AuthContext)
    const { user, logOut } = userInfo

    const handleLogout = () => {
        logOut()
    }

    const links = <>
        <NavLink className="text-lg font-semibold mr-3" to="/">Home</NavLink>

        <NavLink className="text-lg font-semibold mr-3" to="/register">Register</NavLink>

        <NavLink className="text-lg font-semibold mr-3" to="/login">Login</NavLink>

        {
            user && <>
                <NavLink className="text-lg font-semibold mr-3" to="/profile">Profile</NavLink>

                <NavLink className="text-lg font-semibold mr-3" to="/orders">Orders</NavLink>
            </>
        }
    </>

    return (

        <nav>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Auth Integration</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end">

                    {
                        user ?
                            <div className="flex items-center">
                                <p className="text-rose-600 mr-2">{user.email}</p>

                                <a onClick={handleLogout} className="btn btn-sm bg-rose-600 text-white">Sign Out</a>
                            </div>


                            :
                            <Link to="/login"><button className="btn btn-sm bg-rose-600 text-white">Sign In</button></Link>
                    }

                </div>




            </div>
        </nav>
    );
};

export default Header;