import { useState } from 'react';
import { useSignUp } from '../hooks/useSignup';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [formError, setFormError] = useState('');

  const { signup, isLoading, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
  };

  return (
    <div className='forms'>
      <h3>Create an account</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button disabled={isLoading || !name || !email || !password}>
          Create account
        </button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

export default Register;
