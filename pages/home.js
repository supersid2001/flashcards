import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/sign.css";

function Home() {
    const router = useRouter();
    const handleSignUpButtonClick = () => {
        router.push('/signup');
    };
    const handleSignInButtonClick = () => {
        router.push('/signin');
    };

    return (
        <div>
        <header>
            <h1>Welcome to Drop Table Team&apos;s translator</h1>
        </header>
        <div>
            <button id="signinButton" className="button" onClick={handleSignInButtonClick}>
            Sign in
            </button>
            <button id="signupButton" className="button" onClick={handleSignUpButtonClick}>
            Sign up
            </button>
        </div>

        <footer>
            <p>&copy; 2023 Drop Table Team</p>
        </footer>

        
        </div>
    );
}

export default Home;