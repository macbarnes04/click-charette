import React, { useState, useRef } from 'react';
import './style.css';  // Import your CSS file
import {motion} from 'framer-motion';

const App = () => {
  const [move, setMove] = React.useState(false);
  const [move1, setMove1] = React.useState(false);
  const parentRef = useRef(null);
  const parentRRef = useRef(null);
  const childRef = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isDoubleMoving, setIsDoubleMoving] = useState(false);
  const [rotate, setRotate] = React.useState(false);
  const [moveState, setMoveState] = useState(0);
  const [isSwapped, setIsSwapped] = useState(false);
  const toggleMovement = () => {
    setIsMoving(!isMoving);
  };
  const moveSquares = () => {
    setMoveState((prev) => (prev + 1) % 4);  // Cycle through 4 states
  };
  const positions = [
    { x: 0, y: 300 },  // Down
    { x: -300, y: 300 }, // Left
    { x: -300, y: 0 }, // Up
    { x: 0, y: 0 },  // Right (back to start)
  ];
  const positions2 = [
    { x: 0, y: -134 },  // First square moves up, second moves down
    { x: 134, y: -134 },  // First square moves right, second moves down
    { x: 134, y: 0 },  // First square moves right, second moves up
    { x: 0, y: 0 },  // Reset to original positions
  ];
  const [positions3, setPositions3] = useState({
    firstCircle: { x: 0, y: 0 },  // Initial position of first circle
    secondCircle: { x: 300, y: 300 },  // Initial position of second circle
  });
  const toggleDoubleMovement = () => {
    setIsDoubleMoving(!isDoubleMoving);
  };
  const colorArray = ["#D9D9D9", "#848482", "#C0C0C0", "#072C4D", "#0E4A7E", "#257E95"];
  const [colorIndex, setColorIndex] = useState(0); 
  const swapClick = () => {
    // Swap the positions of the circles
    setPositions3((prevPositions) => ({
      firstCircle: prevPositions.secondCircle,
      secondCircle: prevPositions.firstCircle,
    }));
  };

  const swapColor = () => {
    const parentColor = parentRef.current.style.backgroundColor;
    const childColor = childRef.current.style.backgroundColor;

    // Swap colors
    parentRef.current.style.backgroundColor = childColor;
    childRef.current.style.backgroundColor = parentColor;
  };


  const rotateColor = () => {
    // Get the current border color
    const currentColor = parentRRef.current.style.backgroundColor;
    
    // Find the next color in the array
    const nextColorIndex = (colorIndex + 1) % colorArray.length;
    setColorIndex(nextColorIndex);  // Update the color index state

    // Set the border color to the next color in the array
    parentRRef.current.style.backgroundColor = colorArray[nextColorIndex];
  };
  const [roll, setRoll] = useState(false);
  const [index, setIndex] = useState(0);

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
    <div id="content" className="dark-navy" ref={parentRRef}>
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
                    transition={{ duration: .5 }}
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
            <div id="box7" className="box brown" style={{overflow: 'visible'}}>
              <motion.div 
              whileHover={{ skewX: 10, skewY: 10 }} transition={{ duration: 1 }}>
                <div className="square small top right light-brown"></div>
                <div className="square small bottom left blue"></div> 
              </motion.div>
                
            </div>
            <div id="box8" className="box brown">
                <motion.div className="light-brown rectangle left" drag="x" dragConstraints={{ left: 0, right: 300 }}></motion.div>
            </div>    
            <div id="box9" className="box light-blue" style={{overflow: 'visible'}}>
                <motion.div className="circle small blue centered" style={{ zIndex: 1000 }}
                onClick={() => setMove1(!move1)} 
                initial={{ x: 0, y: 0 }}
                animate={{
                  x: move1 ? "-50%" : 0, 
                  y: move1 ? "150%" : 0,   
                }}
                transition={{
                  stiffness: 200,
                  damping: 30,
                  mass: 10,
                  duration: 5,
                  x: { delay: 0 },        
                  y: { delay: 1 },      
                }}></motion.div>
            </div>
            <div id="box10" className="box navy">
                <motion.div className="light-blue rectangle right" style={{transformOrigin: 'center left'}}
                  animate={{rotate: rotate? -360 : 0}}
                  transition={{duration: 2}}>
                </motion.div>
                <div className="circle small white centered" onClick={() => setRotate(!rotate)}></div>

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
                <motion.div className="hst light-grey"
                initial={{
                  x: 0,
                  y: 0
                }}
                whileHover={{
                  x: "50%", 
                  y: "-50%",   
                }}
                transition={{duration: .5}}></motion.div>
            </div>
            <div id="box13" className="box dark-blue" onClick={() => setRoll(!roll)}>
                <div className="square top small light-blue" ></div>
                <motion.div className="square top right small dark-navy"
                initial={{x: 0}}
                animate={{
                  x: roll ? '-50vw' : 0, // Move the element 100% of the viewport width to the right
                  rotate: roll ? -360 : 0, // Rotate 360 degrees while moving
                }}  
                transition={{
                  duration: 5,            // Duration of the animation
                }}    
                onClick={() => setRoll(!roll)}></motion.div>
            </div>
            <div id="box14" className="box light-brown">
                <motion.div className="rectangle right slight-down light-blue"
                  onClick={toggleDoubleMovement}
                  animate={{
                    y: isDoubleMoving ? [0,200, 0] : [0, 0], // up-and-down vertical movement
                  }}
                  transition={{
                    duration: 1,         
                    repeat: Infinity,    
                    repeatType: 'reverse',  
                    ease: 'easeInOut',   
                  }}></motion.div>
                <motion.div className="rectangle left slight-up blue"
                  onClick={toggleDoubleMovement}
                    animate={{
                      y: isDoubleMoving ? [200, 0, 200,] : [0, 0], // up-and-down vertical movement
                    }}
                    transition={{
                      duration: 1,         
                      repeat: Infinity,    
                      repeatType: 'reverse',  
                      ease: 'easeInOut',   
                    }}></motion.div>
            </div>
            <div id="box15" className="box navy" style={{ overflow: "visible", position: "relative" }}>
                <motion.div
                  whileTap={{ y: "100%" }}  // Moves by 100% of #box15's height
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1000 }}
                >
                  <div className="hst blue fliph small top right"></div>
                  <div className="hst blue fliph small bottom right"></div>
                  <div className="hst blue small top left"></div>
                  <div className="hst blue small bottom left"></div>
                </motion.div>
              </div>
            <div id="box16" className="box dark-navy">
                <div className="hst navy fliph"></div>
                <motion.div className="hst light-blue fliph small bottom left"
                initial={{ scaleX: -1 }}
                  whileHover={{
                    x: [0, 150, 0],  // Moves right then back left
                    y: [0, -150, 0], // Moves up then back down
                  }}
                  transition={{
                    duration: 1,    // Smooth movement time
                    ease: "easeInOut",
                    repeat: Infinity, // Keeps looping
                    repeatType: "reverse", // Reverses each time
                  }}
                ></motion.div>
            </div>
            <div id="box17" className="box brown">
                <motion.div className="circle light-brown top right"
                  animate={positions[index]}  // Moves to the next position
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => setIndex((prev) => (prev + 1) % positions.length)}
                ></motion.div>
            </div>
            <div id="box18" className="box brown">
                <motion.div className="square bottom left small white"
                onClick={moveSquares}
                animate={{ x: positions2[moveState].x, y: positions2[moveState].y }}  // First square
                transition={{ duration: 0.5, ease: "easeInOut" }}></motion.div>

                <motion.div className="square top right small white"
                onClick={moveSquares}
                animate={{ x: -positions2[moveState].x, y: -positions2[moveState].y }}  // Second square
                transition={{ duration: 0.5, ease: "easeInOut" }}></motion.div>
            </div>
            <div id="box19" className="box navy" onClick={rotateColor}>

            </div>
            <div id="box20" className="box blue" onClick={swapClick}>
                <motion.div className="circle light-blue left top"
                    animate={{
                      x: positions3.firstCircle.x,  // x position of the first circle
                      y: positions3.firstCircle.y,  // y position of the first circle
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}>
                </motion.div>
                <motion.div className="circle navy bottom right"
                    animate={{
                      x: positions3.secondCircle.x,  // x position of the second circle
                      y: positions3.secondCircle.y,  // y position of the second circle
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                </motion.div>
            </div>
       </div>
    </div>
    </main>
  );
};

export default App;
