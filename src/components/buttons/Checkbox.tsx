import { useEffect, useState } from 'react';
import styles from './buttons.module.scss'

const Checkbox = (props:any) => {
    const{label,id,choosedFilters,setChoosedFilters} = props;
    const[checked,setChecked] = useState(false);

    useEffect(() => {
    if(checked){
        setChoosedFilters([...choosedFilters,label])
    }else{
        const items = choosedFilters.filter((item:any) => item !== label)
        setChoosedFilters(items)
    }
    },[checked])
   
    return ( 
    <div className={styles["checkbox-wrapper-1"]}>
  <input
   id={`checkbox-${id}`}
    className={styles["substituted"]}
     type="checkbox" checked={checked}
      onChange={() => setChecked(!checked)}
       aria-hidden="true" />
  <label htmlFor={`checkbox-${id}`}>
    <p>
    {label}
    </p>
    </label>
</div>
     );
}
 
export default Checkbox;