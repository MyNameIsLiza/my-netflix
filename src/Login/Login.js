import {signInWithGoogle} from '../authentication';
import {useCallback} from "react";

export default function Login({onReRender} = () => {
}) {
    const handleSignIn = () => {
        signInWithGoogle(onReRender);
    };

    return (
        <div className="Login">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
    );
}
