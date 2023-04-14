import { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';

import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState([]);

  const PARSE_APPLICATION_ID = 'KsiVc1c1aAFXtHQzTt9dMVrSHHlT13DLPuVyESpG';
  const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
  const PARSE_JAVASCRIPT_KEY = 'kgicXnMgIxLKHSLzNVhJglZ9BxuM31A4UUPrDgSz';
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
  Parse.serverURL = PARSE_HOST_URL;

  useEffect(() => {
    console.log("useEffect")
    const query = new Parse.Query('Riddle');
    query.equalTo("idNumber", 322);
    query.find().then((response) => {
      console.log(response[0].attributes)
      setResult(response[0]);
    }).catch((err) => {
      console.log("err = ", err)
    })
  }, []);

  // check the user selected value if it's same as answer
  // if correct, show success dialog else, failed dialog by setting isSuccess = true or false
  const handleDecisionClick = (decision) => {
    decision === 'A' ? setIsSuccess(true) : setIsSuccess(false);
    // open dialog
    setIsModalOpen(true);
  }

  return (
    result ?
      <>
        <div className='w-full h-full flex flex-col p-3 gap-2 justify-evenly md:p-8'>
          <div className=''>
            <p className='text-center' style={{fontSize: '2rem'}}>{result.attributes?.questionText}</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <img src={result.attributes?.questionImage._url} alt="" style={{ maxHeight: '50vh' }} />
          </div>
          <div className=''>
            <ColoredDivider />
            <ColoredDivider />
          </div>
          <div className='flex justify-evenly gap-4'>
            <EachDecision url={result.attributes?.answerImage1._url} indicator='A' handleClick={(indicator) => handleDecisionClick(indicator)} />
            <EachDecision url={result.attributes?.answerImage2._url} indicator='B' handleClick={(indicator) => handleDecisionClick(indicator)}/>
            <EachDecision url={result.attributes?.answerImage3._url} indicator='C' handleClick={(indicator) => handleDecisionClick(indicator)}/>
            <EachDecision url={result.attributes?.answerImage4._url} indicator='D' handleClick={(indicator) => handleDecisionClick(indicator)}/>
            <EachDecision url={result.attributes?.answerImage5._url} indicator='E' handleClick={(indicator) => handleDecisionClick(indicator)}/>
          </div>
        </div>
        {/* Dialog Section */}
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} style={{ top: '30px', maxHeight: '90%' }}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isSuccess ? 'Success' : 'Failed'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: '1.5rem !important', whiteSpace: 'pre-wrap', padding: '1rem' }}>
              {result.attributes?.answerExplanation}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div className='mt-3' style={{
              float: 'right'
            }}>
              <AwesomeButton type={isSuccess ? "secondary" : "danger"} onPress={() => setIsModalOpen(false)}>Okay</AwesomeButton>
            </div>
          </Modal.Footer>
        </Modal>
      </> : null
  );
}

const EachDecision = ({ url, indicator, handleClick }) => (
  <div className='flex flex-col justify-center items-center relative'
    style={{
      width: '20%',
      maxWidth: '10rem'
    }} onClick={() => handleClick(indicator)}>
    <div className='flex'
    >
      <img src={url} alt=""
        className=''
      />
    </div>
    <p className='text-xl md:text-3xl' >{indicator}</p>
  </div>
)
const ColoredDivider = () => (
  <div className='h-2 w-full bg-yellow-500 my-2' />
)

export default App;
