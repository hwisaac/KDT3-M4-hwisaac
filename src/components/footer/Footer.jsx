import React from 'react';
import { useState } from 'react';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import style from './Footer.module.css';
import { SiNaver } from 'react-icons/si';

const Footer = (props) => {
  return (
    <footer className={style.footer}>
      <div className={style.inner}>
        <div className={style.cell}>
          <div className={style.col}>
            <AiFillExclamationCircle className={style.exclamation} />
            <span>반품, 배송비, 반품 배송주소 등은 해당 상품 페이지 내 안내를 참고해주세요</span>
          </div>

          <span>주식회사 프레시멘토 1600-5673</span>
          <span>판매자 개인정보 처리방침</span>
          <span>판매자 정보</span>
        </div>
        <ul className={style.cell}>
          <li>네이버 약관</li>
          <li>네이버페이 이용약관</li>
          <li>전자금융거래 이용약관</li>
          <li>개인정보처리방침</li>
          <li>책임의 한계와 법적고지</li>
          <li>청소년보호정책</li>
          <li>지식재산권신고센터</li>
          <li>안전거래 가이드</li>
          <li>쇼핑&페이 고객센터</li>
        </ul>
        <ul className={style.cellInfo}>
          <li>네이버(주)</li>
          <li>
            <span>사업자등록번호 220-81-62517</span>
            <span>통신판매업신고번호 2006-경기성남-0692호</span>
          </li>
          <li>
            <span>대표이사 최수연</span>
            <span>경기도 성남시 분당구 정자일로 95, NAVER 1784, 13561</span>
          </li>
          <li>
            <span>전화 1588-3819</span>
            <span>이메일 helpcustomer@naver.com</span>
            <span>사업자등록정보확인</span>
          </li>
          <li>
            <span>호스팅 서비스 제공: NAVER Cloud</span>
          </li>
        </ul>
        <ul className={style.cellInfo}>
          <li>고객센터</li>
          <li>
            <span>강원도 춘천시 퇴계로 89 강원전문건설회관</span>
          </li>
          <li>
            <span>전화 1588-3816</span>
            <span>전화클릭</span>
          </li>
          <li>
            <span>결제도용신고 1588-3816</span>
          </li>
          <li>
            <span className={style.bold}>1:1문의 바로가기</span>
          </li>
        </ul>
        <ul className={style.cellInfo}>
          <li>전자금융거래 분쟁처리</li>
          <li>
            <span>전화 1588-3819</span>
          </li>
          <li>
            <span>1:1문의 바로가기</span>
          </li>
          <li>
            <span>결제도용신고 1588-3816</span>
          </li>
          <li>
            <span className={style.bold}>1:1문의 바로가기</span>
          </li>
        </ul>
        <div className={style.cell}>
          <span>
            네이버(주)는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은
            판매자에게 있습니다.
          </span>
          <span>자세히보기</span>
        </div>
        <div className={style.cell}>
          <SiNaver className={style.naverIcon} />
          <span>
            Copyright &copy; <span className={style.bold}>NAVER Corp.</span> All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
