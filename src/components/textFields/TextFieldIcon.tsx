import Image from 'next/image';
import styles from './textFields.module.scss'
import cs from 'classnames'
import { isEmpty } from '@/helper';

const TextFieldIcon = (props:any) => {
    const{
        label,
        imgSrc,
        imgAlt,
        value,type,
        pattern,
        inputName,
        imgWidth,
        imgHeight,
        endIcon=false,
        endIconNode,
        autoComplete,
        handleOnChange,
        isError,
        errorMsg
    } = props;
    return ( 
        <>
        <div className={cs(styles["text-field-icon"],isError && styles.error)}>
            <Image
                className={styles.icon}
                src={imgSrc}
                alt={imgAlt}
                width={imgWidth || 24}
                height={imgHeight ||24}
                priority
              />
                <input
                 name={inputName}
                type={type || "text"} 
                value={value} 
                onChange={handleOnChange}
                 pattern={pattern || ""}
                 autoComplete={autoComplete || 'off'}
                />
                <label className={cs(!isEmpty(value) && styles['input-full'])}>{label}</label>
                {endIcon &&
                endIconNode
                }
            </div>
            {isError && !isEmpty(errorMsg) &&
            <p className={styles['error-msg']}>
            {errorMsg}
            </p>}
            </>
     );
}
 
export default TextFieldIcon;