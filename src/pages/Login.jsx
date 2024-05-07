import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword from Firebase Authentication
import { auth } from '../services/firebase'; // Assuming you have a Firebase initialization file

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or perform any necessary actions upon successful login
      navigate("/")
    } catch (error) {
      setError(error.message);
      console.error("Error signing in:", error);
    }
  }
  return (
    <div className='w-full h-screen'>
      <img className='hidden sm:block absolute w-full h-full object-cover'
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d253acf4-a1e2-4462-a416-f78802dc2d85/f04bf88c-f71c-4d02-82ed-adb870b8f8db/IN-en-20240429-POP_SIGNUP_TWO_WEEKS-perspective_WEB_658a042e-62cf-473d-8da0-7b875f23e2ef_small.jpg" alt="" />
      <div className='bg-black/70 fixed top-0 left-0 w-full h-screen' />
      <div className='fixed w-full px-4 py-24 z-20'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-nsans-bold'> Log In</h1>
            <form onSubmit={handleFormSubmit} className='w-full flex flex-col py-4'>
              <input className="p-3 my-2 bg-gray-700 rounded" type="email" placeholder='email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="p-3 my-2 bg-gray-700 rounded" type="password" placeholder='password' autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className='bg-red-600 py-3 my-6 rounded font-nsans-bold'>Log In</button>
              <div className='flex justify-between items-center text-gray-600'>
                <p>
                  <input type="checkbox" className='mr-2' checked={rememberLogin} onChange={(e) => setRememberLogin(!rememberLogin)} /> Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className='my-4'><span className='text-gray-600 mr-2'>New to FlickFlare?</span><Link to='/login'>Sign Up</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login