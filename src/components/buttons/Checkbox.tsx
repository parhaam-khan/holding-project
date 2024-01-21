import { useState } from 'react';
import styles from './buttons.module.scss'

const Checkbox = (props:any) => {
    const{label,id} = props;
    const[checked,setChecked] = useState(false)

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