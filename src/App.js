import { useState } from 'react';

import brHeart from './assets/imgs/brHeart.png';
import gbHeart from './assets/imgs/gbHeart.png';
import grHeart from './assets/imgs/grHeart.png';
import ybHeart from './assets/imgs/ybHeart.png';
import yrHeart from './assets/imgs/yrHeart.png';
import bbHeart from './assets/imgs/bbHeart.png';

import brTriangle from './assets/imgs/brTriangle.png';
import bbTriangle from './assets/imgs/bbTriangle.png';
import grTriangle from './assets/imgs/grTriangle.png';
import gbTriangle from './assets/imgs/gbTriangle.png';
import ybTriangle from './assets/imgs/ybTriangle.png';
import yrTriangle from './assets/imgs/yrTriangle.png';

import yRectangle from './assets/imgs/yRectangle.png';

import bbStar from './assets/imgs/bbStar.png';
import grStar from './assets/imgs/grStar.png';
import rbStar from './assets/imgs/rbStar.png';
import rrStar from './assets/imgs/rrStar.png';
import brStar from './assets/imgs/brStar.png';
import ybStar from './assets/imgs/ybStar.png';
import yrStar from './assets/imgs/yrStar.png';

import Arrow from './assets/imgs/arrow.png';
import IconStar from './assets/imgs/icon-star.png';
import IconBanned from './assets/imgs/icon-banned.png';
import IconArrow from './assets/imgs/icon-arrow.png';

import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';

import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDecisionClick = (decision) => {
    decision === 'A' ? setIsSuccess(true) : setIsSuccess(false);
    setIsModalOpen(true);
  }

  return (
    <>
      <div className='container'>
        <div className='w-full h-full flex flex-col gap-8 response-padding-8'>
          <div className='text-center pt-8'>
            <h3>DE SYMBOLEN IN HET MIDDEN VAN ELK DIAGRAM STAAN VOOR EEN REGEL / OPDRACHT. WELK DIAGRAM HOORT OP HET VRAAGTEKEN?</h3>
          </div>
          <div className='flex flex-col grow items-center' style={{ justifyContent: "space-evenly" }}>
            <EachLine ritems={[yrStar, rrStar, rrStar]} litems={[rrStar, yrStar, yrStar]} cases={[IconStar]} />
            <EachLine ritems={[grHeart, brHeart, brHeart]} litems={[bbHeart, gbHeart, gbHeart]} cases={[IconStar, IconBanned]} />
            <EachLine ritems={[grTriangle, yrTriangle, yRectangle]} litems={[yRectangle, ybTriangle, gbTriangle]} cases={[IconArrow, IconBanned]} />
            <EachLine ritems={[yrStar, ybTriangle, brHeart]} litems={null} cases={[IconArrow, IconBanned, IconStar]} />
          </div>
          <div className=''>
            <ColoredDivider />
            <ColoredDivider />
          </div>
          <div className='flex justify-between bottom'>
            <EachDecision item1={ybHeart} item2={brTriangle} item3={bbStar} optionText="A" handleClick={(value) => handleDecisionClick(value)} />
            <EachDecision item1={bbHeart} item2={yrTriangle} item3={ybStar} optionText="B" handleClick={(value) => handleDecisionClick(value)} />
            <EachDecision item1={yrHeart} item2={bbTriangle} item3={grStar} optionText="C" handleClick={(value) => handleDecisionClick(value)} />
            <EachDecision item1={brStar} item2={bbTriangle} item3={yrHeart} optionText="D" handleClick={(value) => handleDecisionClick(value)} />
            <EachDecision item1={ybHeart} item2={brTriangle} item3={rbStar} optionText="E" handleClick={(value) => handleDecisionClick(value)} />
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onHide={()=>setIsModalOpen(false)} style={{top: '30%'}}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isSuccess ? 'Success' : 'Failed'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: '1.5rem' }}>
            {isSuccess ? '🎉Congratelation, your answer is correct.' : 'Your answer is not correct 😋, Please try again'}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className='mt-3' style={{
            float: 'right'
          }}>
            <AwesomeButton type={isSuccess ? "secondary" : "danger"} onPress={() => setIsModalOpen(false)}>{isSuccess ? 'Next' : 'Again'}</AwesomeButton>
          </div>
        </Modal.Footer>
        {/* <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} styles={{
        modal: {
          borderRadius: 10,
          top: '30%'
        }
      }}> */}
        {/* <div className='my-5'>
          <h2>{isSuccess ? 'Success' : 'Failed'}</h2>
        </div> */}
        {/* <p style={{ fontSize: '1.5rem' }}>
          {isSuccess ? '🎉Congratelation, your answer is correct.' : 'Your answer is not correct 😋, Please try again'}
        </p> */}
        {/* </Modal> */}
      </Modal>
    </>
  );
}

const EachLine = ({ ritems, litems, cases }) => (
  <div className='flex gap-8 items-center w-full'>
    <div className='flex ' style={{ flexBasis: '30%' }}>
      {
        ritems !== null ? ritems.map((ritem, key) => {
          return <img className='shape' src={ritem} key={key} alt="item" />
        }) : <p>?</p>
      }
    </div>
    <div className='grow relative' style={{
      minHeight: '20px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <img className='' src={Arrow} style={{ height: '2.5vw' }} alt="item" />
      <div className='flex justify-evenly absolute left-0 top-0 w-full'>
        {
          cases.map((item, key) => {
            return (<img className='action' src={item} key={key} alt="item" />)
          })
        }
      </div>
    </div>
    <div className='flex' style={{ flexBasis: '30%' }}>
      {
        litems !== null ? litems.map((litem, key) => {
          return <img className='shape' src={litem} key={key} alt="item" />
        }) : <p className='w-full text-center' style={{ fontSize: '4rem' }}>?</p>
      }
    </div>
  </div>
)
const EachDecision = ({ item1, item2, item3, optionText, handleClick }) => {
  return (
    <div className='flex flex-col justify-center items-center decision-group' onClick={() => handleClick(optionText)}>
      <div className='flex'>
        <img className='decision' src={item1} alt="item" />
        <img className='decision' src={item2} alt="item" />
        <img className='decision' src={item3} alt="item" />
      </div>
      <h3>{optionText}</h3>
    </div>
  )
}
const ColoredDivider = () => (
  <div className='h-2 w-full bg-yellow-500 my-2' />
)

export default App;
