import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from '@/styles/profile.module.scss'
import Image from "next/image";
import moment from "jalali-moment";
import LoadingCircle from "@/components/loading/loading-circle";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "@/features/user/userSlice";
import Head from "next/head";

const Profile = () => {
    // const[holdingInfo,setHoldingInfo] = useState<{[key:string]:any}>({});
    const dispatch = useDispatch<any>()
    const holdingInfo = useSelector((state:any) => state.holding.holdingInfo);
    const loading = useSelector((state:any) => state.user.loading);
    const apiCode = useSelector((state:any) => state.user.apiCode);
    const userInfo = useSelector((state:any) => state.user.userInfo);
    //  console.log(userInfo);
    // const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);
    // const[loading,setLoading] = useState(false);
    // const[profileInfo,setProfileInfo] = useState<{[key:string]:any}>({});
    // const { userInfo, setUserInfo } = useApiContext();
    // console.log(profileInfo);
    const router = useRouter();

useEffect(() => {
    if(holdingInfo.id){
        dispatch(fetchUserInfo(holdingInfo.id));
    }
},[holdingInfo.id])


//   const initialApi = async(merchantId:any) => {
//     let headers = {
//         'SM-TOKEN': JSON.parse(localStorage.getItem('token') || ''),
//         'X-VIEWNAME': 'simple',
//       };
//     try{
//         const res = await API(`preauth/bills/customer/${merchantId}/getCustomerProfile`,'get',{},headers)
//         const{data:{result}} = res;
//         //  console.log(res);
//         setUserInfo(result)
//         setLoading(false)
//     }catch(err:any){
//         console.log(err);
//         err.response && tokenCheck(err.response.status)
//         err.response && console.log(err.response.data.message);
//         setLoading(false)
//     }
//   }

  const logOutUserHandler = () => {
    localStorage.removeItem('token')
    router.push(`${holdingInfo.id}`)
  }


    return ( 
        <>
        <Head>
        <title>{holdingInfo?.name}</title>
        <meta name="description" content={holdingInfo?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={holdingInfo.logo} />
      </Head>
        <Layout loginCheck apiCode={apiCode}>
            {loading ? <LoadingCircle/> : ''}
        <div className={styles.profile}>
            <div className={styles.title}>
            پروفایل کاربری
            </div>
            <div className={styles['profile-info-menu']}>
             <Image
             className={styles['user-icon']}
                src={'../icons/user-profile-icon.svg'}
                alt='user icon'
                width={80}
                height={80}
                priority
                />
                <div className={styles['user-info']}>
                  <div className={styles.name}>
                    <p>
                     {userInfo?.fullName}
                    </p>
                  </div>
                  <div className={styles['date-of-membership']}>
                    <p>
                    تاریخ عضویت:
                   <span style={{marginInlineStart:"3px"}}>
                     {userInfo?.createdDate && moment(userInfo.createdDate).locale("fa").format('jDD jMMMM jYYYY')} 
                   </span>
                    </p>
                  </div>
                </div>
                <div className={styles['profile-menu']}>
                <div className={styles['menu-item']} onClick={() =>  router.push(`/${holdingInfo.id}/profile/creditcard`)}>
                    <div className={styles['title']}>
                    <Image
                src={ '../icons/credit-card-icon.svg'}
                alt='credit card icon'
                width={24}
                height={24}
                priority
                />
                <p>
                    کارت اعتباری
                </p>
                    </div>
                    <span className={styles.arrow}>
                    <Image
                src={ '../icons/arrow-icon.svg'}
                alt='arrow icon'
                width={16}
                height={16}
                priority
                />
                </span>
                </div>
                <div className={styles['menu-item']} onClick={() =>  router.push(`/${holdingInfo.id}/profile/customer-club`)}>
                    <div className={styles['title']}>
                    <Image
                src={ '../icons/customer-club-icon.svg'}
                alt='customer club icon'
                width={24}
                height={24}
                priority
                />
                <p>
                     باشکاه مشتریان
                </p>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                <div className={styles['customer-score']}>
                    <p>
                        {userInfo?.score && (userInfo.score).toFixed(2)} امتیاز
                    </p>
                <Image
                src={ '../icons/coin-icon.svg'}
                alt='coin icon'
                width={16}
                height={16}
                priority
                />
                        </div>
                    <span className={styles.arrow}>
                    <Image
                src={ '../icons/arrow-icon.svg'}
                alt='arrow icon'
                width={16}
                height={16}
                priority
                />
                </span>
                    </div>
                
                </div>
                <div className={styles['menu-item']}>
                    <div className={styles['title']} onClick={() => router.push(`/${holdingInfo.id}/about`)}>
                    <Image
                src={ '../icons/about-icon.svg'}
                alt='about icon'
                width={24}
                height={24}
                priority
                />
                <p>
                     درباره ما
                </p>
                    </div>
                    <span className={styles.arrow}>
                    <Image
                src={ '../icons/arrow-icon.svg'}
                alt='arrow icon'
                width={16}
                height={16}
                priority
                />
                </span>
                </div>
                <div style={{borderBottom:"none"}} className={styles['menu-item']}>
                    <div className={styles['title']} onClick={logOutUserHandler}>
                    <Image
                src={'../icons/exit-icon.svg'}
                alt='exit icon'
                width={24}
                height={24}
                priority
                />
                <p>
                      خروج
                </p>
                    </div>
                </div>
                </div>
            </div>
            <div className={styles['extra-menu']}>
            {/* <div style={{marginTop:"10px"}} className={styles['menu-item-extra']}>
                <div className={styles['title']}>
                    <Image
                src={ '../icons/otp-pass-icon.svg'}
            alt='otp icon'
                width={24}
                height={24}
                priority
                />
                <p>
                      رمز یکبار مصرف
                </p>
                    </div>
                    <p className={styles['info-text']}>
                  -------
                </p>
                </div> */}
                <div className={styles['menu-item-extra']}>
                <div className={styles['title']}>
                    <Image
                src={ '../icons/contact-us-icon.svg'}
            alt='contact icon'
                width={24}
                height={24}
                priority
                />
                <p>
                تماس با ما
                </p>
                    </div>
                <p className={styles['info-text']}>
                  {holdingInfo.phone}
                </p>
                </div>
            </div>
         
        </div>
        </Layout>
        </>
     );
}
 
export default Profile;