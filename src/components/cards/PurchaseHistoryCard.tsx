import moment from 'jalali-moment';
import styles from './cards.module.scss'
import { isEmpty, thousandSeperator } from '@/helper';

const PurchaseHistoryCard = (props:any) => {
    const{item} = props;

    return ( 
        <div className={styles['purchase-history-card']}>
         <div className={styles.title}>
           <p>
            نام خرید
           </p>
           <p>
            {!isEmpty(item.createdDate) && moment(item.createdDate).locale("fa").format('jDD jMMMM jYYYY')} 
           </p>
         </div>
         <div className={styles['sub-title']}>
            {item.merchantName}
         </div>
         <div className={styles['sub-items']}>
        <div className={styles['item']}>
        <p className={styles.title}>
            مبلغ کل:
        </p>
        <div className={styles.amount}>
        <span>{thousandSeperator(item.amount)}</span>
        <p className={styles.currency}>
        تومان
        </p>
        </div>
        </div>
        <div className={styles['item']}>
        <p className={styles.title}>
             تخفیف:
        </p>
        {!isEmpty(item.discount) && item.discount !== 0 ?
         <div className={styles.amount}>
        <span>{thousandSeperator(item.discount,)}</span>
        <p className={styles.currency}>
        تومان
        </p>
        </div>
         :
        '------'
        }
        </div>
        <div className={styles['item']}>
        <p className={styles.title}>
             پرداختی شما:
        </p>
        <div className={styles.amount}>
        <span className={styles['your-payment']}>{thousandSeperator((item.amount - item.discount))}</span>
        <p className={styles.currency}>
        تومان
        </p>
        </div>
       
        </div>
        </div>
        </div>
     );
}
 
export default PurchaseHistoryCard;