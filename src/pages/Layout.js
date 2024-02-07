import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Login" className="border border-black underline">Login</Link>
                    </li>
                    <li>
                        <Link to="/Hello">Hello</Link>
                    </li>
                    <li>
                        <Link to="/Register">Register</Link>
                    </li>
                </ul>
            </nav>

        <Outlet />
        </div>
    );
};

export default Layout;