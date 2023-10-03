
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Register = () => {

    const userInfo = useContext(AuthContext)
    const { createUser } = userInfo

    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(name, email, password);

        //Call createUser function and pass email and password
        createUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                e.target.reset()
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
                                <input type="email" name="email"
                                    placeholder="Email..." className="input input-bordered" required />
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
                                <button className="bg-rose-600 text-white font-semibold px-2 py-2 rounded-md">Create Account</button>
                            </div>
                        </form>

                        <div className="text-center mt-16">
                            <Link to="/login"><p className="text-sm">Already have an Account? Sign In</p></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;