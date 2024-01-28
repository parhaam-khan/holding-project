import { useEffect, useRef, useState } from 'react';
import styles from './FilterList.module.scss';
import Image from 'next/image';
import Checkbox from '../buttons/Checkbox';

const FilterList = (props:any) => {
    const{setShowFilterList,listItem,holdingInfo,showFilterList,setSubMerchants} = props;
    const[choosedFilters,setChoosedFilters] = useState([])
    console.log(choosedFilters);
    //  console.log(choosedFilters);
 const overlayRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
       if(overlayRef.current) overlayRef.current.style.display = 'block';
    },[])

    const handleCloseFilter = () => {
        setShowFilterList({show:false,type:''})
    }

    const handleFilterData = () => {
     const newSubMerchantList =  holdingInfo.subMerchantTagVOS.filter((item:any) => (choosedFilters.length > 0 ? choosedFilters.some((i) => item.tag === i) : item))
    // console.log(newSubMerchantList);
    setSubMerchants(newSubMerchantList)
    handleCloseFilter()
    // console.log(newSubMerchantList);
    }

    return ( 
        <>
        <div ref={overlayRef} className={styles.overlay}></div>
        <div className={styles['filter-list']}>
        <div className={styles.header}>
        {showFilterList.type === 'cat' ? 
            <p className={styles.title}>
            دسته بندی شعب
        </p>
         :
          <p className={styles.title}>
            انتخاب شهر
          </p>
        }
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
            {listItem.map((item:any,index:number) => (
            <div key={index}>
            <Checkbox
            choosedFilters={choosedFilters}
            setChoosedFilters={setChoosedFilters} 
            label={item}
            id={index}
            />
            </div>
            ))}
       
        </div>
        <div className={styles['submit-filter-btn']}>
        <button onClick={handleFilterData}>
            نمایش انتخاب ها
        </button>
        </div>
        </div>
        </>
     );
}
 
export default FilterList;
