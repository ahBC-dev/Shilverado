import { useState, useRef, useEffect } from 'react';
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

//for wallet connection issuation text address
import { TransactionContext } from '../context/TransactionContext';
import { useContext } from 'react';

const ThreeDEthCard = () => {
  const { currentAccount } = useContext(TransactionContext); //get current account
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Track mouse position globally
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate rotation based on global mouse position
  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate card center in viewport percentage
    const cardCenterX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const cardCenterY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    
    // Calculate distance from mouse to card center
    const deltaX = mousePosition.x - cardCenterX;
    const deltaY = mousePosition.y - cardCenterY;
    
    // Apply rotation based on distance (subtle effect)
    const rotateY = deltaX * 0.3; // Reduced multiplier for subtle movement
    const rotateX = -deltaY * 0.3;
    
    setRotate({ x: rotateX, y: rotateY });
  }, [mousePosition]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Enhanced glow only on hover
  const baseGlow = 0.3;
  const hoverGlow = 0.7;

  return (
    <div 
      ref={cardRef}
      className="p-3 justify-center items-center flex flex-col rounded-xl h-40 sm:w-72 w-full my-5 transition-all duration-500 ease-out relative overflow-hidden max-w-[288px]"
      style={{
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? '1.03' : '1'}, ${isHovered ? '1.03' : '1'}, ${isHovered ? '1.03' : '1'})`,
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(145deg, #1e3a8a 0%, #3b82f6 30%, #1e40af 70%)',
        boxShadow: `
          0 0 ${isHovered ? '40' : '20'}px rgba(59, 130, 246, ${isHovered ? hoverGlow : baseGlow}),
          0 0 ${isHovered ? '80' : '40'}px rgba(37, 99, 235, ${isHovered ? hoverGlow * 0.6 : baseGlow * 0.4}),
          ${rotate.y * 0.2}px ${rotate.x * 0.2}px 30px rgba(0, 0, 0, 0.3)
        `,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle Global Movement Background */}
      <div 
        className="absolute inset-0 rounded-xl transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, ${isHovered ? 0.2 : 0.1}) 0%,
            rgba(37, 99, 235, ${isHovered ? 0.15 : 0.05}) 50%,
            transparent 100%)`,
          opacity: isHovered ? 0.8 : 0.4,
        }}
      />
      
      {/* Enhanced Shine on Hover */}
      <div 
        className="absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(105deg, 
            transparent 0%,
            rgba(255, 255, 255, ${isHovered ? 0.4 : 0.1}) 50%,
            transparent 100%)`,
          opacity: isHovered ? 0.6 : 0.2,
          transform: `translateX(${rotate.y * 5}px) rotateY(${rotate.y * 0.5}deg) translateZ(0)`,
        }}
      />

      {/* Card Content */}
      <div className="flex justify-between flex-col w-full h-full relative z-10">
        <div className="flex justify-between items-start">
          <div 
            className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center transition-all duration-300"
            style={{ 
              transform: 'translateZ(25px)',
              boxShadow: isHovered 
                ? `0 0 20px rgba(59, 130, 246, 0.8)`
                : `0 0 10px rgba(59, 130, 246, 0.3)`,
              borderColor: `rgba(255, 255, 255, ${isHovered ? 1 : 0.7})`,
              background: isHovered ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)',
            }}
          >
            <SiEthereum 
              fontSize={21} 
              color="#fff"
              style={{
                filter: isHovered 
                  ? `drop-shadow(0 0 8px rgba(59, 130, 246, 0.9))`
                  : `drop-shadow(0 0 4px rgba(59, 130, 246, 0.4))`
              }}
            />
          </div>
          <BsInfoCircle 
            fontSize={17} 
            color="#fff"
            style={{ 
              transform: 'translateZ(25px)',
              filter: isHovered 
                ? `drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))`
                : `drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))`
            }}
          />
        </div>
        <div style={{ transform: 'translateZ(35px)' }}>
          <p 
            className="text-white font-light text-sm transition-all duration-300"
            style={{
              textShadow: isHovered 
                ? `0 0 12px rgba(59, 130, 246, 0.8)`
                : `0 0 6px rgba(59, 130, 246, 0.3)`
            }}
          >
            {currentAccount ? 'Wallet Connected' : 'Address'}
          </p>
          <p 
            className="text-white font-semibold text-lg mt-1 transition-all duration-300"
            style={{
              textShadow: isHovered 
                ? `0 0 18px rgba(59, 130, 246, 0.9), 0 0 25px rgba(37, 99, 235, 0.6)`
                : `0 0 8px rgba(59, 130, 246, 0.4)`
            }}
          >
            {currentAccount
              ? `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`
              : 'Wallet Address'
            }
          </p>
        </div>
      </div>
      
      {/* Border Glow - Enhanced on Hover */}
      <div 
        className="absolute inset-0 rounded-xl border pointer-events-none transition-all duration-300"
        style={{
          borderColor: `rgba(59, 130, 246, ${isHovered ? 0.5 : 0.2})`,
          boxShadow: `
            inset 0 0 ${isHovered ? '25' : '15'}px rgba(59, 130, 246, ${isHovered ? 0.3 : 0.1}),
            inset 0 0 ${isHovered ? '50' : '30'}px rgba(37, 99, 235, ${isHovered ? 0.15 : 0.05})
          `,
        }}
      />
    </div>
  );
};

export default ThreeDEthCard;