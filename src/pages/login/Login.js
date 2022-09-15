
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Project Imports
import { login } from '../../services/login';
import Error from '../../components/error/Error';
import { toast } from 'react-toastify';
import Logo from '../../assets/icons/logo.png';
import TextInput from '../../components/text-input/TextInput';
import Button from '../../components/button/Button';
import './Login.css';

function Login(props) {
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    if (!formValid) return toast("Please provide information!");;
    const response = await login(email, password);
    if (response?.status_code === 200) {
      toast("Login Successfull!");
      const fullName = response.data?.user?.full_name || 'User'
      return navigate('/home', { state: { fullName } })
    } else setError(response?.error || "Failed to Login!");
    
    setLoading(false)
  }

  return (
    <>
      <img width={165} height={25} src={Logo} alt='logo' className="heading" />
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.contentInner}>
            <h2 className="header f-24 font-face-l-b">Login to your Docsumo account</h2>
            {error.length > 0 && <Error message={error} />}
            <TextInput
              label={'Work Email'} type={'text'} placeholder={'janedoe@abc.com'} name={'Email'}
              setValidity={(status) => setFormValid(status)}
              setValue={(email) => setEmail(email)} />

            <TextInput label={'Password'} type={'password'} placeholder={'Enter password here...'} name={'Password'}
              setValidity={(status) => setFormValid(status)}
              setValue={(password) => setPassword(password)} />

            <div className="forget-password-link f-14"><span id="forgot-password-link">Forgot Password?</span></div>

            <Button label={'Login'} handleSubmit={handleSubmit} loading={loading} />

            <div className="text-align-center m-t-15 f-18 text-gray m-r-2 font-face-l-b">
              Don't have an account? <span id="signup-link" className="f-18 color-default m-l-2">Sign Up</span>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundSize: 'cover',
    background: "url(/assets/background.png) no-repeat 100% 90%"
  },
  content: {
    height: '500px',
    width: '550px',
    backgroundColor: "white",
    borderRadius: '10px',
    borderWidth: '50px',
    borderColor: 'black',
  },
  contentInner: {
    padding: 60,
    paddingTop: 50,
  },
}

export default Login;
