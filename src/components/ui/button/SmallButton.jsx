import React from 'react';
import styled from 'styled-components';

export default function SmallButton({ text, onClick }) {
  return <Button onClick={onClick}>{text}</Button>;
}

const Button = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: start;
  max-width: 150px;
  padding: 1.25rem 0;
  font-size: 0.75rem;
`;
