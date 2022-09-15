import { useState, useEffect } from 'react';
import './TextInput.css';
import { get } from 'lodash'
import { isValidEmail } from '../../utils/general';
import Show from '../../assets/icons/show.png';
import Hide from '../../assets/icons/hide.png';

function TextInput(props) {

  const [value, setValue] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState('');
  const label = get(props, 'label', 'Input');
  const name = get(props, 'name', 'Email');
  const [type, setType] = useState(get(props, 'type', 'text'));
  const placeholder = get(props, 'placeholder', 'Enter Value.');
  const setValidity = get(props, 'setValidity', () => { });
  const setElementValue = get(props, 'setValue', () => { });
  const [showPasswordText, setShowPasswordText] = useState(false);

  function handleChange(evt) {
    setValue(evt.currentTarget.value);
  }

  function setInvalidity(message) {
    setInvalid(true)
    setError(message)
    setValidity(false)
  }

  function checkValidity(evt) {
    const val = evt.currentTarget.value;
    if (name === 'Email' && !isValidEmail(val)) 
      return setInvalidity('Please enter a valid email address.')
    
    if (name === 'Password' && value.length < 1) 
      return setInvalidity('Please enter a valid password.')
    
    setValidity(true)
    setElementValue(val)
  }

  function clearStatus() {
    setInvalid(false)
    setError('')
    setValidity(true)
  }

  function handlePasswordVisibility() {
    setShowPasswordText(!showPasswordText);
  }

  useEffect(() => {
    if (name !== "Password") return;
    if (showPasswordText) setType('text')
    else setType('password')
  }, [showPasswordText, name])

  return (
    <>
      <div className="input-text-label f-14 text-color">{label}</div>
      <div id="text-input" className={"input-text-container border-1 border-radius " +
        (invalid ? ' border-red' : 'border-blue')}>
        <input
          type={type}
          name={name}
          value={value}
          className={'input-text border-none'}
          placeholder={placeholder}
          onChange={(evt) => handleChange(evt)}
          onFocus={clearStatus}
          onBlur={(evt) => checkValidity(evt)}
        />

        {name === "Password" && <div className="show-hide" onClick={handlePasswordVisibility}>
          <img width={20} height={20} src={showPasswordText ? Hide : Show} alt='logo' />
        </div>}
        
      </div>
      
      {invalid && <div className="input-text-label f-14 error">{error}</div>}
    </> 
  );
}

export default TextInput;
