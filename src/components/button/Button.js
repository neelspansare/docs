import { useEffect, useState } from 'react';
import { get } from 'lodash'

// Project Imports
import './Button.css';

function Button(props) {
  const label = get(props, 'label', 'Input');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(props.loading)
  }, [props.loading]);

  const handleSubmit = () => {
    if (loading) return;
    props.handleSubmit();
  }
  
  return (
    <>
      <div className="btn-login border-none container" id="btn-login" onClick={handleSubmit}>
        {loading && < div
          className="absolute ">{'Loading...'}</div>}
        {!loading && <span className="text-white font-face-l-b">{label}</span>}
      </div>
      
    </> 
  );
}

export default Button;
