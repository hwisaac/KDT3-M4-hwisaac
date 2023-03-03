import React from 'react';
import { useRecoilValue } from 'recoil';
import { alternativeImg, getCookie, userInfoState } from '../../recoil/userInfo';
import { Link, Outlet } from 'react-router-dom';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import { getAccountInfo } from '../../api/accountApi';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const Section = styled.section`
  margin: auto;
  height: 80%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 4rem 1rem;
`;

const H3 = styled.h3`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-black);
`;

const H4 = styled.h4`
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-gray1);
  ::after {
    padding-left: 2rem;
    content: '|';
  }
  :last-child::after {
    content: none;
  }
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  gap: 2rem;
`;

const Profile = styled.div`
  background-color: var(--color-gray2);
  width: 18rem;
  height: 25rem;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
`;

const H5 = styled.h5`
  padding: auto;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-black2);
  width: 100%;
`;

const Between = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  color: var(--color-white);
  margin: 1rem 0;
  & span:last-child {
    font-weight: 300;
    font-size: 0.9rem;
  }
`;

const HorizontalLine = styled.div`
  width: var(--width);
  height: 0.1px;
  background-color: var(--color-white);
`;

const Btn = styled(Link)`
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 1rem;
  color: var(--color-black2);
  background-color: var(--color-white);
  border: none;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    color: var(--color-white);
    background-color: var(--color-black2);
    transition: all 0.5s;
  }
`;

const Details = styled.div`
  width: 45rem;
  min-height: 25rem;
  background-color: var(--color-gray1);
  padding: 1.5rem;
`;

const BlackLink = styled(Link)`
  color: var(--color-black1);
`;

export const MyPage = () => {
  const userInfo = useRecoilValue(userInfoState);
  const accessToken = getCookie('accessToken');
  const subMenu = ['account', 'order', 'post', 'review'];

  const { isLoading, data: myAccount, refetch } = useQuery(['myAccount'], () => getAccountInfo({ accessToken }));

  if (isLoading) return <LoadingModal />;
  return (
    <Section>
      <H3 className="fah">MY PAGE</H3>
      <Container>
        {subMenu.map((submenu) => (
          <H4 className="fah" submenu={submenu} key={submenu}>
            <BlackLink
              to={{
                pathname: `/mypage/my${submenu}`,
              }}
            >
              MY {`${submenu}`.toUpperCase()}
            </BlackLink>
          </H4>
        ))}
      </Container>

      <Container>
        <Profile>
          <H5 className="fah">MY INFO</H5>
          <Between>
            <span>Welcome, {userInfo.displayName}</span>
            <span>Log Out</span>
          </Between>

          <HorizontalLine />

          <div>
            <Between>
              <span>E-mail</span>
              <span>{userInfo.email}</span>
            </Between>
            <Between>
              <span>Total Balance</span>
              <span>₩ {myAccount.totalBalance ? myAccount.totalBalance.toLocaleString() : 0}</span>
            </Between>
            <Between>
              <span>My Orders</span>
              <span>{0}</span>
            </Between>
            <Between>
              <span>My Posts</span>
              <span>{0}</span>
            </Between>
            <Between>
              <span>My Reviews</span>
              <span>{0}</span>
            </Between>
          </div>

          <Btn to="/">Edit My Info</Btn>
        </Profile>

        <Details>
          <Outlet context={{ accessToken, myAccount }} />
        </Details>
      </Container>
    </Section>
  );
};
export default MyPage;
