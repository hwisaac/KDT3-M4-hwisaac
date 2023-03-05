import React, { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import ecoimg0 from 'assets/image/home/ecosection1.jpg';
import ecoimg1 from 'assets/image/home/ecosection2.jpg';
import ecoimg2 from 'assets/image/home/ecosection3.jpg';

const pVariants = {
  animate: {
    height: 'auto',
  },
  initial: {
    height: '0',
  },
};

const ecoImageVariants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    display: 'none',
  },
};
export default function EcoSection() {
  const [menuId, setMenuId] = useState(0);

  useEffect(() => {
    console.log(menuId);
  }, [menuId]);
  const handleHead = (id) => {
    if (menuId !== id) setMenuId(id);
    else setMenuId(-1);
  };

  const EcoImageSrc = (menuId) => {
    switch (menuId) {
      case 0:
        return ecoimg0;
      case 1:
        return ecoimg1;
      case 2:
        return ecoimg2;
      default:
        return ecoimg0;
    }
  };
  return (
    <EcoSectionComponent>
      <AnimatePresence>
        <EcoImage
          key={menuId}
          src={EcoImageSrc(menuId)}
          variants={ecoImageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </AnimatePresence>
      <EcoMenu>
        <MenuItem menuId={menuId} headerId={0}>
          <h3 onClick={() => handleHead(0)}>
            <span>
              <em>we are </em> sustainable
            </span>
            {menuId === 0 ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </h3>
          <motion.p variants={pVariants} animate={menuId === 0 ? 'animate' : 'initial'}>
            we care about environment and maintain our business without depleting natural resources
          </motion.p>
        </MenuItem>
        <MenuItem menuId={menuId} headerId={1}>
          <h3 onClick={() => handleHead(1)}>
            <span>vegan</span>
            {menuId === 1 ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </h3>
          <motion.p variants={pVariants} animate={menuId === 1 ? 'animate' : 'initial'}>
            We offer a wide selection of plant-based products to promote animal welfare and reduce the environmental
            impact of animal agriculture
          </motion.p>
        </MenuItem>
        <MenuItem menuId={menuId} headerId={2}>
          <h3 onClick={() => handleHead(2)}>
            <span>plastic-free</span>
            {menuId === 2 ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </h3>
          <motion.p variants={pVariants} animate={menuId === 2 ? 'animate' : 'initial'}>
            We minimize our use of plastic and offer plastic-free alternatives to reduce plastic waste and protect the
            environment.
          </motion.p>
        </MenuItem>
      </EcoMenu>
    </EcoSectionComponent>
  );
}

const EcoSectionComponent = styled.section`
  display: flex;
  width: auto;
  height: auto;
  padding: 100px 0;
  gap: 100px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const EcoImage = styled(motion.img)`
  height: 420px;
  display: block;
  /* position: absolute; */
  width: 300px;
  object-fit: cover;
  /* background-image: ${(props) => {
    switch (props.menuId) {
      case 0:
        return 'url(ecoimage0)';
      case 1:
        return 'orange';
      case 2:
        return 'var(--color-white2)';
      default:
        return 'var(--color-gray2)';
    }
  }}; */
  /* background-color: ${(props) => {
    switch (props.menuId) {
      case 0:
        return 'var(--color-gray2)';
      case 1:
        return 'orange';
      case 2:
        return 'var(--color-white2)';
      default:
        return 'var(--color-gray2)';
    }
  }}; */
`;
const EcoMenu = styled.div`
  height: 420px;
  display: flex;
  width: 300px;
  flex-direction: column;
`;

const MenuItem = styled.div`
  border-top: 1.5px solid var(--color-black2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &:last-child {
    border-bottom: 1.5px solid var(--color-black2);
  }
  h3 {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    span {
      font-family: 'Fahkwang';
      font-size: 20px;
      font-weight: 300;
      em {
        color: var(--color-brown);
      }
    }
  }

  p {
    display: block;
    opacity: 0.7;
    /* height: ${(props) => (props.headerId === props.menuId ? 'auto' : '0')}; */
    overflow: hidden;
    margin-bottom: ${(props) => (props.headerId === props.menuId ? '10px' : '0')};
  }
`;
