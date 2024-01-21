import { useEffect, useRef, useState } from 'react';
import styles from './FilterList.module.scss';
import Image from 'next/image';
import Checkbox from '../buttons/Checkbox';

const FilterList = (props:any) => {
    const{setShowFilterList} = props;
 const overlayRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
       if(overlayRef.current) overlayRef.current.style.display = 'block';
    },[])

    const handleCloseFilter = () => {
        setShowFilterList(false)
    }

    return ( 
        <>
        <div ref={overlayRef} className={styles.overlay}></div>
        <div className={styles['filter-list']}>
        <div className={styles.header}>
        <p className={styles.title}>
            دسته بندی شعب
        </p>
        <button className={styles.close} onClick={handleCloseFilter}>
        <p>
            بستن
        </p>
        <Image
                src="icons/close-icon.svg"
                alt="close icon"
                width={24}
                height={24}
              />
        </button>
        </div>
        <div className={styles['options-list']}>
        <div>
            <Checkbox id={1} label={'رستوران'}/>
        </div>
        <div>
            <Checkbox id={2}  label={'رستوران'}/>
        </div>
        <div>
            <Checkbox id={3}  label={'رستوران'}/>
        </div>
        </div>
        </div>
        </>
     );
}
 
export default FilterList;
