import Image from 'next/image';
import styles from './Modal.module.scss'
import closeIcon from '/public/icons/close-modal-icon.svg'

const Modal = (props:any) => {
    const {setIsOpen,yesButton,title,yesButtonHandler,children} = props;

    return ( 
        <>
        <div className='darkBG' onClick={() => setIsOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>{title}</h5>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <Image
             className={styles['user-icon']}
                src={closeIcon}
                alt='close icon'
                width={16}
                height={16}
                />
            </button>
            <div className={styles.modalContent}>
              {children}
            </div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.yesBtn} onClick={yesButtonHandler}>
                  {yesButton}
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setIsOpen(false)}
                >
                  لغو
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
     );
}
 
export default Modal;