import styles from './buttons.module.scss'
import Image from 'next/image';

const FilterBtn = (props:any) => {
    const{imgSource,clickHandle} = props;
    return ( 
      <button className={styles['filter-btn']} onClick={clickHandle}>
         <Image
                className={styles['filter-icon']}
                src={imgSource}
                alt="filter icon"
                width={16}
                height={16}
              />
      {props.children}
      </button>
     );
}
 
export default FilterBtn;