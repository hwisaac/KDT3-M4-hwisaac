import React from 'react';
import bankPng from '../../../assets/icons/bank-logo.png';

const BankIcon = ({ bankCode = '004', scale = '20%', className = null }) => {
  const bank = {
    '004': {
      name: 'KB국민은행',
      logo: {
        background: `url(${bankPng}) no-repeat -4px -16px`,
        width: '104px',
        height: '80px',
        scale,
        position: 'absolute',
      },
    },
    '088': {
      name: '신한은행',
      logo: {
        background: `url(${bankPng}) no-repeat -164px -4px`,
        width: '104px',
        height: '104px',
        scale,
        position: 'absolute',
      },
    },
    '020': {
      name: '우리은행',
      logo: {
        background: `url(${bankPng}) no-repeat -485px -5px`,
        width: '102px',
        height: '102px',
        scale,
        position: 'absolute',
      },
    },
    '081': {
      name: '하나은행',
      logo: {
        background: `url(${bankPng}) no-repeat -324px -9px`,
        width: '104px',
        height: '94px',
        scale,
        position: 'absolute',
      },
    },
    '089': {
      name: '케이뱅크',
      logo: {
        background: `url(${bankPng}) no-repeat -651px -164px`,
        width: '90px',
        height: '104px',
        scale,
        position: 'absolute',
      },
    },

    '090': {
      name: '카카오뱅크',
      logo: {
        background: `url(${bankPng}) no-repeat -329px -169px`,
        width: '94px',
        height: ' 94px',
        scale,
        position: 'absolute',
      },
    },

    '011': {
      name: 'NH농협은행',
      logo: {
        background: `url(${bankPng}) no-repeat -179px -170px`,
        width: '75px',
        height: ' 92px',
        scale,
        position: 'absolute',
      },
    },
  };

  return (
    <div className={className} style={bank[bankCode].logo}>
      {/* {bank[bankCode].name} */}
    </div>
  );
};

export default BankIcon;
