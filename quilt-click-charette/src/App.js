import React, { useState, useRef } from 'react';
import './style.css';  // Import your CSS file
import {motion} from 'framer-motion';

const App = () => {
  const [move, setMove] = React.useState(false);
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  const toggleMovement = () => {
    setIsMoving(!isMoving);
  };
  const swapColor = () => {
    const parentColor = parentRef.current.style.backgroundColor;
    const childColor = childRef.current.style.backgroundColor;

    // Swap colors
    parentRef.current.style.backgroundColor = childColor;
    childRef.current.style.backgroundColor = parentColor;
  };

  const addDiv = (classes, parentId) => {
    console.log('Adding div to:', parentId);
    const newDiv = document.createElement('div');
    newDiv.classList.add(...classes);
    const parentDiv = document.getElementById(parentId);
    if (parentDiv) {
      parentDiv.appendChild(newDiv);
    }
  }

  return (
    <main>
    <div id="content" className="dark-navy">
       <div id="grid">
            <div id="box1" className="box navy">
                <motion.div className="circle dark-navy left top"
                   whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                  }}>
                </motion.div>
                <motion.div className="circle dark-navy bottom right"
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 1 },
                }}></motion.div>
            </div>
            <div id="box2" className="box light-grey">
                <div>
                  <div className="hst white fliph small top right"></div>
                  <motion.div className="hst white small bottom right"
                    initial={{rotate: -90}}
                    whileHover={{
                      rotate: 180,
                    }}
                    transition={{ duration: 0 }}
                  ></motion.div>
                </div>  
            </div>
            <div id="box3" className="box dark-grey">
                <motion.div className="rectangle bottom light-brown"
                whileHover={{
                  translateY: '-50%',  
                  transition: { duration: 1 },
                }}
                ></motion.div>
            </div>
            <div id="box4" 
              className="box"
              style={{ backgroundColor: '#6C97A2' }} 
              ref={parentRef} 
              onClick={swapColor}
            >
              <div 
                className="circle bottom left"
                ref={childRef}
                style={{ backgroundColor: '#257E95' }}
                onClick={swapColor}
              ></div>
            </div>
            <div id="box5" className="box white">
                <motion.div className="rectangle left dark-grey"
                  onClick={toggleMovement}
                  animate={{
                    x: isMoving ? [0, 300] : [0, 0], // Back-and-forth horizontal movement
                  }}
                  transition={{
                    duration: 1,         
                    repeat: Infinity,    
                    repeatType: 'reverse',  
                    ease: 'easeInOut',   
                  }}>
                </motion.div>
            </div>
            <div id="box6" className="box blue">
                <div className="light-blue rectangle left" onClick={() => addDiv(['light-blue', 'rectangle', 'left'], 'box2')}></div>
            </div>
            <div id="box7" className="box brown">
              <motion.div 
              whileHover={{ skewX: 10, skewY: 10 }} transition={{ duration: 1 }}>
                <div className="square top right light-brown"></div>
                <div className="square bottom left blue"></div> 
              </motion.div>
                
            </div>
            <div id="box8" className="box brown">
                <motion.div className="light-brown rectangle left" drag="x" dragConstraints={{ left: 0, right: 300 }}></motion.div>
            </div>    
            <div id="box9" className="box light-blue">
                <div className="circle small blue centered"></div>
            </div>
            <div id="box10" className="box navy">
                <div className="light-blue rectangle right"></div>
                <div className="circle small white centered"></div>

            </div>
            <div id="box11" className="box dark-navy" onClick={() => setMove(!move)}>
              <motion.div
                className="circle small light-brown centered"
                initial={{ y: 0 }}
                animate={{ y: move ? [150, -25, 0] : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 30, mass: 1, repeat: 4, repeatType: 'reverse',
                  ease: 'easeInOut', duration: .5 }}
              ></motion.div>
            </div>
            <div id="box12" className="box white">
                <div className="hst light-grey"></div>
            </div>
            <div id="box13" className="box dark-blue">
                <div className="square top small light-blue"></div>
            </div>
            <div id="box14" className="box light-brown">
                <div className="rectangle right slight-down light-blue"></div>
                <div className="rectangle left slight-up blue"></div>
            </div>
            <div id="box15" className="box blue">
                <div className="hst navy fliph small top right"></div>
                <div className="hst navy fliph small bottom right"></div>
                <div className="hst navy small top left"></div>
                <div className="hst navy small bottom left"></div>
            </div>
            <div id="box16" className="box dark-navy">
                <div className="hst navy fliph"></div>
                <div className="hst light-blue fliph small bottom left"></div>
            </div>
            <div id="box17" className="box brown">
                <div className="circle light-brown top right"></div>
            </div>
            <div id="box18" className="box white">
                <div className="square top small light-brown"></div>
                <div className="square bottom right small light-brown"></div>
            </div>
            <div id="box19" className="box navy">

            </div>
            <div id="box20" className="box blue">
                <div className="circle light-blue left top"></div>
                <div className="circle light-blue bottom right"></div>
            </div>
       </div>
    </div>
    </main>
  );
};

export default App;
