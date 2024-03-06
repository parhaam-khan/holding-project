import styles from './loading.module.scss'

const LoadingCircle = () => {
    return ( 
        <>
        <div className={styles.overlay}>
        <span className={styles['loading-circle']}></span>
        </div>
        </>
     );
}
 
export default LoadingCircle;