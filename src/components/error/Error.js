import './Error.css';

function Error(props) {

  return (
    <div className="error-container f-14 text-color-red ">{props.message}
    </div>
  );
}

export default Error;
