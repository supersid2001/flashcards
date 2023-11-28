import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/sign.css";

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignIn = (e) => {
        e.preventDefault();
        if (!username && !password) {
          alert("Please fill in either the username or password");
          return;
        }
        if(!username){
          alert("Please fill in username");
          return;
        }
        if(!password){
          alert("Please fill in password");
          return;
        }
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        //TODO: RETRIVE USERNAME AND PASSWORD 
        //TODO: HANDLE ANY ERRORS
        //TODO: SET LOCALSTORAGE ID FROM DATA
        router.push('/'); 
      };

    return (
        <div>
            <header>
                <h1>Welcome to Drop Table Team's translator</h1>
            </header>
            <div className="sign">
                <h3>Sign in</h3>
                <br />
                <form id="signinForm">
                    <div className="inputBox">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="inputusername"
                            name="username"
                            placeholder="Input username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <div className="inputBox">
                        <i className="iconfont icon-mima"></i>
                        <label htmlFor="password">Password </label>
                        <input
                            type="password"
                            className="inputPassword"
                            name="password"
                            autoComplete="off"
                            placeholder="Input password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="signButton">
                        <input type="submit" value="Sign up" onClick={handleSignIn} />
                    </div>
                </form>
            </div>

    
            <footer>
                <p>&copy; 2023 Drop Table Team</p>
            </footer>
        </div>
    );
}

export default Signin;