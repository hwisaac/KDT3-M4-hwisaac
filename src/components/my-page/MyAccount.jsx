import { deleteAccount } from '../../api/accountApi';
import style from './MyAccount.module.css';

export const MyAccount = ({ accessToken, myAccount, refetch }) => {
  const handleDelete = (event) => {
    const accountId = event.target.dataset.id;
    const signature = window.confirm('해당 계좌를 삭제하시겠습니까 ?');
    if (signature) {
      deleteAccount({ accessToken, accountId, signature });
      refetch();
    }
  };

  return (
    <section className={style.account}>
      <p className={style.p}> 결제 계좌 관리</p>
      <ul className={style.ul}>
        <li className={style.li}>은행/계좌번호</li>
        <li className={style.li}>보유 금액</li>
        <li className={style.li}>관리</li>
      </ul>
      {myAccount?.accounts ? (
        myAccount?.accounts.map((account) => (
          <ul key={account.id} className={style.content}>
            <li className={style.li}>
              {account?.bankName} {account?.accountNumber}
            </li>
            <li className={style.li}>{account?.balance.toLocaleString()} 원</li>
            <li className={style.li}>
              <button onClick={handleDelete} data-id={account.id}>
                삭제
              </button>
            </li>
          </ul>
        ))
      ) : (
        <p>연결된 계좌가 없습니다. 계좌를 연결해 주세요.</p>
      )}
    </section>
  );
};

export default MyAccount;
