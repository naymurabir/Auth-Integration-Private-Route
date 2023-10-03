import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";


const Login = () => {

    const userInfo = useContext(AuthContext)
    const { loginUser, googleLogin, githubLogin } = userInfo

    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);

        //Call loginUser function and pass email and password
        loginUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                e.target.reset()
                navigate('/')
            })
            .catch(error => {
                console.log("Error", error.message);
            })

    }

    // Google and Github login
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user
                console.log(user);
            })
            .catch(error => {
                console.log("Error", error.message);
            })
    }

    const handleGithubLogin = () => {
        githubLogin()
            .then(result => {
                const user = result.user
                console.log(user);
            })
            .catch(error => {
                console.log("Error", error.message);
            })
    }


    return (
        <div className="hero h-[580px] bg-rose-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 h-[520px] w-[300px]">
                    <div className="card-body">

                        <h2 className="text-xl font-bold text-center text-rose-600">Log In</h2>

                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email..." className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="Password..." className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="bg-rose-600 text-white font-semibold px-2 py-2 rounded-md">Login</button>
                            </div>
                        </form>


                        <div className="flex justify-around mt-3" >
                            <button onClick={handleGoogleLogin} className=" bg-blue-400 text-white rounded-md btn-ghost btn-sm">Google</button>

                            <button onClick={handleGithubLogin} className=" bg-purple-400 text-white rounded-md btn-ghost btn-sm">Github</button>
                        </div>

                        <div className="text-center mt-20">
                            <Link to="/register"><p className="text-sm">Do not have Account? Sign up</p></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;