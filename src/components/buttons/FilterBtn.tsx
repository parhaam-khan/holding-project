import styles from './buttons.module.scss'
import Image from 'next/image';

const FilterBtn = (props:any) => {
    const{imgSource,clickHandle,width,height} = props;
    return ( 
      <button className={styles['filter-btn']} onClick={clickHandle}>
         <Image
                className={styles['filter-icon']}
                src={imgSource}
                alt="filter icon"
                width={width || 16}
                height={height || 16}
              />
      {props.children}
      </button>
     );
}
 
export default FilterBtn;