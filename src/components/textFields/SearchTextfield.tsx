import Image from 'next/image';
import styles from './textFields.module.scss';
import { useState } from 'react';
import { isEmpty } from '@/helper';


const SearchTextfield = (props:any) => {
  const{setSubMerchants,holdingInfo} = props;
  const[inputText,setInputText] = useState('');

  const handleOnChange = (e:any) => {
    const text = e.target.value
    setInputText(text)
    // const filteredData = holdingInfo.subMerchantList.filter((item:any) => item.name.toLowerCase().includes(text.toLowerCase()) || item.address.toLowerCase().includes(text.toLowerCase()))
     const filteredData = holdingInfo.subMerchantTagVOS.map((item:any) => {
      let arry:[] = []
    const newData = item.subMerchantList.filter((branch:any) => {
        if(branch.name.toLowerCase().includes(text.toLowerCase()) || branch.address.toLowerCase().includes(text.toLowerCase())){
          // console.log('inside condition');
          arry.push(branch)
        } 
        // console.log(obj)
        return arry
      })
      // console.log(newData);
      return {tag:item.tag,subMerchantList:[...arry]}
      // return newData
    })
     console.log(filteredData);

    setSubMerchants(filteredData)
  }
    return ( 
        <div className={styles['search-textFields']}>
              <Image
                className={styles['search-icon']}
                src="icons/search-icon.svg"
                alt="search icon"
                width={16}
                height={16}
              />
            <input
             className={styles['search-input']}
              type='text' 
              placeholder='جستجوی شعبه'
              value={inputText}
              onChange={handleOnChange}
              />
        </div>
     );
}
 
export default SearchTextfield;