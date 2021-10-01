import {signInWithGoogle} from '../authentication';

export default function Login({onReRender} = () => {
}) {
    const handleSignIn = () => {
        signInWithGoogle(onReRender);
    };

    return (
        <div className="Login">
            <h1>Hello User</h1>
            <h2>Press button and sign in. It will be funny!</h2>
            <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
    );
}
