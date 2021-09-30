import {signInWithGoogle} from '../authentication';

export default function Login() {
    return (
        <div className="Login">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}
