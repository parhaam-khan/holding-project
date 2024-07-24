import Layout from "@/components/layout";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/historyScoreCrm.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import backIcon from "/public/icons/back-icon.svg";
import backDarkIcon from "/public/icons/back-dark-icon.svg";
import coinIcon from "/public/icons/coin-icon.svg";
import receivedIcon from "/public/icons/received-icon.svg";
import changedIcon from "/public/icons/changed-icon.svg";
import Link from "next/link";
import { useSelector } from "react-redux";
import useTheme from "@/hooks/useTheme";
import { API } from "@/services/request-http";
import { useSnackbar } from "notistack";

const HistoryScoreCrm = () => {
  const{theme} = useTheme();
  const { validateToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const merchantId = useSelector((state:any) => state.holding.holdingInfo.id);
  const [loading, setLoading] = useState(false);
  const [crmHistoryInfo, setCrmHistoryInfo] = useState<any>({});

  useEffect(() => {
    if(merchantId){
       initialApi(merchantId);
    }
  }, [merchantId]);

  const initialApi = async (merchantId: any) => {
    let headers = {
      "SM-TOKEN":
        localStorage.getItem("token") &&
        JSON.parse(localStorage.getItem("token") || ""),
    };
    try {
      const res = await API(
        `preauth/persons/${merchantId}/getPointsOfCustomer`,
        "get",
        {},
        headers
      );
      const { data } = res;
      setCrmHistoryInfo(data.result);
      // setPurchaseInfo(data.billViews)
      setLoading(false);
    } catch (err: any) {
      err.response && validateToken(err.response.status);
      err.response && enqueueSnackbar(err.response.data.message, { variant: 'error',hideIconVariant:true});
      setLoading(false);
    }
  };

  return (
    <Layout loginCheck footer={false}>
      <div className={styles["history-score-crm"]}>
        <div className={styles["main-title"]}>
        <Link href={`/${merchantId}/profile/customer-club`} className={styles.back}>
        {theme === 'dark'?
            <Image src={backDarkIcon} alt="back icon" width={24} height={24} />
            :
            <Image src={backIcon} alt="back icon" width={24} height={24} />
             }
            <p>بازگشت</p>
        </Link>
          <p className={styles.title}>تاریخچه امتیازها</p>
          </div>
        <div className={styles["score-info"]}>
          <p>کل امتیازات شما</p>
          <div className={styles["score"]}>
            <span>{crmHistoryInfo.totalPoint}</span>
            <p>امتیاز</p>
            <Image src={coinIcon} alt="coin icon" width={16} height={16} />
          </div>
        </div>
        {crmHistoryInfo?.pointList?.resultList.map((item:any,idx:number) => (
 <div key={idx} className={styles['history-score-crm-card']}>
 <div className={styles.card}>
  <div className={styles['score-title']}>
   <div className={styles.img}>
   <Image src={coinIcon} alt="coin icon" width={16} height={16} />
  <p>{item.point}   
  <span>
    امتیاز
  </span>
  </p>
 
   </div>
<div className={styles['receive-text']}>
  {item.tradeType === 'CREDIT' ?   
  <>
    <Image src={receivedIcon} alt="received icon" width={16} height={16} />
<p className={styles.received}>دریافت شده</p>
  </>
  : item.tradeType === 'DEBIT'  &&  
  <>
  <Image src={changedIcon} alt="coin icon" width={16} height={16} />
<p className={styles.changed}>تبدیل شده</p>
</>
}



</div>
  </div>
  {/* <div className={styles.desc}>
   <p>خرید از رستوران بورسا شعبه قیطریه</p>
  </div> */}
  {/* <div className={styles.date}>
  <p>
   12 آذر 1402 - ساعت 12:25
  </p>
  </div> */}
 </div>
</div>
        ))}
       
      </div>
    </Layout>
  );
};

export default HistoryScoreCrm;
