import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';


const Login = () => {

    const userInfo = useContext(AuthContext)
    const { loginUser, googleLogin, githubLogin, forgotPassword } = userInfo

    // Error and Success message
    const [loginError, setLoginError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const emailRef = useRef()

    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);


        //Validations
        setSuccess('')
        setLoginError('')

        if (password.length < 6) {
            setLoginError("Password must be 6 characters long.")
            return;
        }

        else if (!/[A-Z]/.test(password)) {
            setLoginError("Password must have at least one uppercase letter.")
            return;
        }

        //Call loginUser function and pass email and password
        loginUser(email, password)
            .then(result => {
                const user = result.user

                if (!user.emailVerified) {
                    setLoginError("Please verify your email first")
                }
                else {
                    console.log(user);
                    setSuccess("User has been logged in successfully.")
                    e.target.reset()
                    navigate('/')
                }
            })
            .catch(error => {
                console.log("Error", error.message);
                setLoginError(error.message)
            })

    }

    const handleForgotPassword = () => {
        const email = emailRef.current.value

        if (!email) {
            setLoginError("Please input a email address.")
            return;
        }
        else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            setLoginError("Please input a valid email address.")
            return;
        }

        // Call forgot password function and pass email
        forgotPassword(email)
            .then(() => {
                setSuccess("Password reset email sent!")
            })
            .catch(error => {
                setLoginError(error.message)
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
                                <input
                                    ref={emailRef}
                                    type="email"
                                    name="email"
                                    placeholder="Email..." className="input input-bordered" required />
                            </div>
                            <div className="form-control  relative">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password..." className="input input-bordered" required />

                                <div>
                                    <span className="text-lg top-[52px] left-52 absolute" onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>} </span>
                                </div>
                                <label className="label">
                                    <a onClick={handleForgotPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
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

                        {
                            success && <p className="text-sm text-green-500">{success}</p>
                        }

                        {
                            loginError && <p className="text-sm text-red-500">{loginError}</p>
                        }


                        <div className="text-center mt-8">
                            <Link to="/register"><p className="text-sm">Do not have Account? Sign up</p></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;