import Image from "next/image";
import styles from './cards.module.scss'
import { isEmpty } from "@/helper";

const BranchInfoCard = (props:any) => {
  const{branchInfo} = props;
    return ( 
        <div className={styles['branch-card']}>
            <div className={styles['branch-img']}>
            <Image
                className={styles['img']}
                src={!isEmpty(branchInfo.slideLIst) ? branchInfo.slideLIst[0] : !isEmpty(branchInfo.logo) ? branchInfo.logo : "icons/img-branch-example.svg"}
                // src={ "icons/img-branch-example.svg"}
                alt={branchInfo.name}
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
            {branchInfo?.name}
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
             <p>{branchInfo.address}</p>
            </div>
            <a href={branchInfo.website} target="_blank">
            <button className={styles['card-btn']}>
           مشاهده سایت شعبه
            </button>
            </a>
        </div>
     );
}
 
export default BranchInfoCard;