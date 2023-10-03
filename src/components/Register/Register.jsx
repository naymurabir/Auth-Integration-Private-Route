
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { sendEmailVerification } from "firebase/auth";

const Register = () => {

    const userInfo = useContext(AuthContext)
    const { createUser } = userInfo

    // Error and Success message
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const termsAccepts = e.target.terms.checked
        console.log(name, email, password);


        //Validations
        setSuccess('')
        setRegisterError('')

        if (password.length < 6) {
            setRegisterError("Password must be 6 characters long.")
            return;
        }

        else if (!/[A-Z]/.test(password)) {
            setRegisterError("Password must have at least one uppercase letter.")
            return;
        }

        else if (!termsAccepts) {
            setRegisterError("Accept our terms and conditions.")
            return;
        }

        //Call createUser function and pass email and password
        createUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                setSuccess("User has been registered successfully.")
                e.target.reset()

                // Email verification
                sendEmailVerification(user)
                    .then(() => {
                        setSuccess("Email verification sent!")
                    })
                    .catch(error => {
                        setRegisterError(error.message)
                    })

            })
            .catch(error => {
                console.log("Error", error.message);
                setRegisterError(error.message)
            })

    }

    return (
        <div className="hero h-[580px] bg-rose-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 h-[550px] w-[300px]">
                    <div className="card-body">

                        <h2 className="text-xl font-bold text-center text-rose-600">Create Account</h2>

                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name..." className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input
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

                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="terms" id="terms" />
                                    <label htmlFor="terms"> <p className="text-sm text-purple-800">Accept our terms and Conditions.</p> </label>
                                </div>

                            </div>
                            <div className="form-control mt-6">
                                <button className="bg-rose-600 text-white font-semibold px-2 py-2 rounded-md">Create Account</button>
                            </div>
                        </form>
                        {
                            success && <p className="text-sm text-green-500">{success}</p>
                        }

                        {
                            registerError && <p className="text-sm text-red-500">{registerError}</p>
                        }

                        <div className="text-center mt-2">
                            <Link to="/login"><p className="text-sm">Already have an Account? Sign In</p></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;