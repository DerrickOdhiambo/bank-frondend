import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = () => {
  return (
    <div className='spinner'>
      <div className='sweet-loading'>
        <ClipLoader color='#1c424f' size={40} />
      </div>
    </div>
  );
};

export default Spinner;
