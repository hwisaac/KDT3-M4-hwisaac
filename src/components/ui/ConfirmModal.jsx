import React from 'react';
import style from './ConfirmModal.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiFillCloseCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import { addProduct, encodeImageFileAsURL } from '../../data/API';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { myAtom } from '../../data/atoms.js';
import LoadingModal from '../loading/LoadingModal';

/**
 * 질문을 던지고 확인or취소를 결정하는 모달창
 * @param {*} {title: 제목, question: 질문내용, setOpenModal: 모달을 여닫을지 정해주는 함수, setAnswer: 대답을 정해주는 함수}
 * @returns
 */
const ConfirmModal = ({ title, question, setOpenModal, setAnswer }) => {
  const sayNo = (event) => {
    event.preventDefault();
    console.log('sayNo');
    setOpenModal(false);
    setAnswer(false);
  };
  const sayYes = (event) => {
    event.preventDefault();
    console.log('sayYes');
    setOpenModal(false);
    setAnswer(true);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <h2 className={style.headTitle}>{/* {title} */}</h2>
          <IoIosClose className={style.close} onClick={sayNo} />
        </div>
        <form className={style.modalBody}>
          <div className={style.contents}>
            <AiOutlineInfoCircle className={style.infoCircle} />
            <div className={style.question}>{question}</div>
          </div>
          <div className={style.modalFooter}>
            <button className={style.btn} onClick={sayYes}>
              확인
            </button>
            <button className={style.btn} onClick={sayNo}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmModal;
