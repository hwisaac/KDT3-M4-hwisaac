import { useRecoilValue } from 'recoil';
import style from './MyAccount.module.css';

function MyAccount({ myAccount, userInfo }) {
  return (
    <section className={style.account}>
      <p className={style.p}> {userInfo.displayName}님의 연결된 계좌</p>
      <ul className={style.list}>
        <li className={style.li}>은행/계좌번호</li>
        <li className={style.li}>보유 금액</li>
      </ul>
      {myAccount.accounts ? (
        myAccount.accounts.map((account, index) => (
          <ul key={account.id} className={style.content}>
            <li className={style.li}>
              {account.bankName} {account.accountNumber}
            </li>
            <li className={style.li}>{account.balance.toLocaleString()} 원</li>
          </ul>
        ))
      ) : (
        <p>연결된 계좌가 없습니다. 계좌를 연결해 주세요.</p>
      )}
    </section>
  );
}

export default MyAccount;
