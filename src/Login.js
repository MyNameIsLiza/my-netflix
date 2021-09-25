import './Login.css';

function Login() {
    return (
        <div className="Login">
            <div className="loginDiv">
                <label htmlFor={"loginInput"}>Login</label>
                <input type="text" id={"loginInput"}/>
            </div>
            <div className="passwordDiv">
                <label htmlFor={"loginInput"}>Password</label>
                <input type="password" id={"passwordInput"}/>
            </div>
            <input type="submit" value={"Submit"}/>
        </div>
    );
}

export default Login;

