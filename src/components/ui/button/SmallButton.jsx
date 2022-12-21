import React from 'react';
import { MdOutlineClear } from 'react-icons/md';
import styles from './SmallButton.module.css';

export default function SmallButton({ text, onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {text === '선택 삭제' && <MdOutlineClear />}
      {text}
    </button>
  );
}
