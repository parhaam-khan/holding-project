import Image from 'next/image';
import styles from './textFields.module.scss';


const SearchTextfield = () => {
    return ( 
        <div className={styles['search-textFields']}>
              <Image
                className={styles['search-icon']}
                src="icons/search-icon.svg"
                alt="search icon"
                width={16}
                height={16}
              />
            <input className={styles['search-input']} type='text' placeholder='جستجوی شعبه'/>
        </div>
     );
}
 
export default SearchTextfield;