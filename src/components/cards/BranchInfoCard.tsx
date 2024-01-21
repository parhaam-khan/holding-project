import Image from "next/image";
import styles from './cards.module.scss'

const BranchInfoCard = () => {
    return ( 
        <div className={styles['branch-card']}>
            <div className={styles['branch-img']}>
            <Image
                className={styles['img']}
                src="icons/img-branch-example.svg"
                alt="branch img"
                fill={true}
                priority
              />
                <div className={styles.rate}>
            <span className={styles['rate-point']}>
            4.3
            </span>
            <Image
                className={styles['rate-icon']}
                src="icons/star-icon.svg"
                alt="star icon"
                width={16}
                height={16}
              />
            </div>
            </div>
          
            <div className={styles['branch-title']}>
            <h2>
                شعبه ستاری کوروش مال
            </h2>
            </div>
            <div className={styles['branch-address']}>
            <Image
                className={styles['location-icon']}
                src="icons/location-icon.svg"
                alt="location icon"
                width={16}
                height={16}
              />
             <p>
             لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
             </p>
            </div>
            <button className={styles['card-btn']}>
           مشاهده سایت شعبه
            </button>
        </div>
     );
}
 
export default BranchInfoCard;