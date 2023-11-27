import { useState } from 'react';
import { useRouter } from 'next/router';

function LogIn() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('id', inputValue);
    router.push('/');
  };

  return (
    <div>
      <h1>Set ID Page</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Enter ID:
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="submit">Set ID</button>
      </form>
    </div>
  );
}

export default LogIn;