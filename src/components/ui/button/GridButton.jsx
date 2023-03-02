import { useState } from 'react';
import styled from 'styled-components';

const vars = {};

const GridButton = ({ grids, grid, setGrid }) => {
  const [drop, setDrop] = useState(false);
  return (
    <Wrapper>
      <DefaultText onClick={() => setDrop((prev) => !prev)}>{grid ? grid : 'Grid'} +</DefaultText>
      {drop && (
        <ItemWrapper>
          {grids.map((item) => (
            <Item variants={vars}>
              <button
                onClick={() => {
                  setGrid(item);
                  setDrop(false);
                }}
              >
                {item}
              </button>
            </Item>
          ))}
        </ItemWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 20px;
  position: relative;
`;

const DefaultText = styled.button`
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`;

const ItemWrapper = styled.ul`
  position: absolute;
  top: 20px;
  z-index: 5;
  background-color: var(--color-white);
  border-radius: 10px;
`;

const Item = styled.li`
  padding: 3px;
  button {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default GridButton;
