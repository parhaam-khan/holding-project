import { API } from "@/services/request-http";
import { useEffect, useState } from "react";
import styles from "@/styles/notifs.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import backIcon from "../../../public/icons/back-icon.svg";
import backDarkIcon from "../../../public/icons/back-dark-icon.svg";
import Layout from "@/components/layout";
import { isEmpty } from "@/helper";
import LoadingCircle from "@/components/loading/loading-circle";
import { useSelector } from "react-redux";
import Link from "next/link";
import { baseUrl } from "@/services/apiUrl";
import { useSnackbar } from "notistack";
import Head from "next/head";
import useTheme from "@/hooks/useTheme";

const Notifications = () => {
  const{theme} = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const holdingInfo = useSelector((state:any) => state.holding.holdingInfo);
  const merchantId = useSelector((state: any) => state.holding.holdingInfo.id);
  const [notifInfo, setNotifInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(merchantId){
      initialApi(merchantId);
    }
  }, [merchantId]);

  const initialApi = async (merchantId: any) => {
    try {
      const res = await API(`${merchantId}/ad`, "get");
      const {
        data: { resultList },
      } = res;
      setNotifInfo(resultList);
      setLoading(false);
    } catch (err: any) {
      err.response && enqueueSnackbar(err.response.data.message, { variant: 'error'});
      setLoading(false);
    }
  };

  return (
    <>
    <Head>
    <title>{holdingInfo?.name}</title>
    <meta name="description" content={holdingInfo?.description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href={holdingInfo.logo} />
  </Head>
    <Layout>
      {loading ? <LoadingCircle /> : ""}
      <div className={styles.notifs}>
        <div className={styles["main-title"]}>
          <Link href={`/${merchantId}`} className={styles.back}>
            {theme === 'dark'?
            <Image src={backDarkIcon} alt="back icon" width={24} height={24} />
            :
            <Image src={backIcon} alt="back icon" width={24} height={24} />
             }
            <p>بازگشت</p>
          </Link>
          <p className={styles.title}>اطلاع رسانی</p>
        </div>
        <div className={styles.notifList}>
          {!isEmpty(notifInfo) ?
            notifInfo.map((item: any) => (
              <div key={item.id} className={styles.notif}>
                <div className={styles["img"]}>
                  <Image
                    src={baseUrl + item.imageUrl}
                    // src={ "icons/img-branch-example.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    priority
                  />
                  <div className={styles["name-and-desc"]}>
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.desc}>{item.description}</p>
                  </div>
                </div>
                <div className={styles.footer}>
                  {/* <p className={styles.seen}>
         خوانده شده
        </p> */}
                  <p className={styles["created-date"]}>زمان ایجاد پیام</p>
                </div>
              </div>
            ))  
          :
          <div className={styles.empty}>
            <p className={styles["main-title"]}>
              هیچ پیامی موجود نیست
            </p>
          </div>
          }
        </div>
      </div>
    </Layout>
    </>
  );
};

export default Notifications;
