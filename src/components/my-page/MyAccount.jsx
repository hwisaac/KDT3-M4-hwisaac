import { Link, Outlet, useOutletContext } from 'react-router-dom';
import { deleteAccount } from '../../api/accountApi';
import styled from 'styled-components';

const Section = styled.section`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 1;
`;

const H3 = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-black1);
  width: 100%;
  margin-bottom: 2rem;
`;

const TableHead = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  place-items: center;
  margin: 0.3rem 0;
  color: var(--color-white);
  font-weight: 400;
`;

const TableRow = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  place-items: center;
  margin: 1.5rem 0;
  color: var(--color-white);
  font-weight: 300;
  font-size: 0.8rem;
`;

const HorizontalLine = styled.div`
  width: var(--width);
  height: 1px;
  opacity: 0.3;
  background-color: var(--color-white);
  margin: 1rem 0;
`;

const Btn = styled.button`
  border: none;
  background-color: transparent;
  color: var(--color-white);
`;

const BtnWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const BigBtn = styled(Link)`
  width: 30%;
  text-align: center;
  box-sizing: border-box;
  padding: 0.5rem;
  color: var(--color-black2);
  background-color: var(--color-white2);
  border: none;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    color: var(--color-white);
    background-color: var(--color-black2);
    transition: all 0.5s;
  }
`;

export const MyAccount = () => {
  const { accessToken, myAccount } = useOutletContext();
  const handleDelete = (event) => {
    const accountId = event.target.dataset.id;
    const signature = window.confirm('해당 계좌를 삭제하시겠습니까 ?');
    if (signature) {
      deleteAccount({ accessToken, accountId, signature });
    }
  };

  return (
    <Section>
      <Outlet />
      <H3 className="fah">MY ACCOUNTS</H3>
      <div>
        <TableHead>
          <li>BANK ACCOUNT NUM.</li>
          <li>MY BALANCE</li>
          <li>DELETE</li>
        </TableHead>
        <HorizontalLine />
        {myAccount?.accounts ? (
          myAccount?.accounts.map((account) => (
            <TableRow key={account.id}>
              <li>
                {account?.bankName} {account?.accountNumber}
              </li>
              <li>₩ {account?.balance.toLocaleString()}</li>
              <li>
                <Btn onClick={handleDelete} data-id={account.id}>
                  [ Delete ]
                </Btn>
              </li>
            </TableRow>
          ))
        ) : (
          <p>There is no account connected. Please add your account.</p>
        )}
      </div>
      <BtnWrapper>
        <BigBtn to="addaccount">Add account</BigBtn>
      </BtnWrapper>
    </Section>
  );
};

export default MyAccount;
