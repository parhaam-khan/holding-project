import { useState } from 'react';
import styles from './SwitchBtn.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { darkModeToggle } from '@/features/holding/holdingSlice';

const SwitchBtn = () => {
    const dispatch = useDispatch<any>();
    const checked = useSelector((state:any) => state.holding.darkMode);
    // console.log(checked);

    const onChangeToggle = () => {
        dispatch(darkModeToggle(null))
    }

    return ( 
        <div className={styles['checkbox-wrapper-2']}>
        <input
        type="checkbox"
        className={styles.toggle} 
        checked={checked}
        onChange={onChangeToggle}/>
      </div>
     );
}
 
export default SwitchBtn;