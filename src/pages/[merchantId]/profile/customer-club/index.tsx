import Layout from "@/components/layout";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/customerClub.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import backIcon from "../../../../../public/icons/back-icon.svg";
import coinIcon from "../../../../../public/icons/coin-icon.svg";
import discountIcon from "../../../../../public/icons/discount-raw-icon.svg";
import clockIcon from "../../../../../public/icons/clock-icon.svg";
import FilterBtn from "@/components/buttons/FilterBtn";
import Modal from "@/components/Modal/Modal";
import { isEmpty } from "@/helper";
import Link from "next/link";
import { useSelector } from "react-redux";
import { API } from "@/services/request-http";
import LoadingCircle from "@/components/loading/loading-circle";
import moment from "jalali-moment";
import { useSnackbar } from "notistack";

const CustomerClub = () => {
  const router = useRouter();
  const { validateToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const merchantId = useSelector((state: any) => state.holding.holdingInfo.id);
  const userInfo = useSelector((state:any) => state.user.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessDiscountPayment, setIsSuccessDiscountPayment] = useState(false);
  const [customerClubInfo, setCustomerClubInfo] = useState([]);
  const [discountReceiptInfo, setDiscountReceiptInfo] = useState<{[key:string] : any}>({});
  const [loading, setLoading] = useState(true);
  const [discountId, setDiscountId] = useState<string | number>('');
  const [modalContent, setModalContent] = useState<{ [key: string]: any }>({
    point: null,
    title: "",
  });

  const { point, title } = modalContent;

  useEffect(() => {
    if (merchantId) {
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
        `preauth/${merchantId}/holding/discount`,
        "get",
        {},
        headers
      );
      const { data } = res;
      setCustomerClubInfo(data.result);
      // setPurchaseInfo(data.billViews)
      setLoading(false);
    } catch (err: any) {
      err.response && validateToken(err.response.status);
      err.response && console.log(err.response.data.message);
      setLoading(false);
    }
  };

  const openModalHandler = (neededPoint: number, title: string,id:number | string) => {
    setIsOpen(true);
    setDiscountId(id);
    setModalContent({ ...modalContent, point: neededPoint, title });
  };

  const copyToClipboardHandler = (text:any) => {
    navigator.clipboard.writeText(text).then(() => {
      enqueueSnackbar(text, { variant: 'success'})
      },() => {
        enqueueSnackbar('خطا کپی کردن متن موردنظر', { variant: 'error'})
      });
}

  const submitModalHandler = async() => {
    setLoading(true);

    let headers = {
      "SM-TOKEN": localStorage.getItem("token") && JSON.parse(localStorage.getItem("token") || ""),
    };
    try {
      const res = await API(
        `preauth/${merchantId}/holding/discount/${discountId}`,
        "post",
        {},
        headers
      );
      const { data } = res;
      setDiscountReceiptInfo(data.result);
      setIsSuccessDiscountPayment(true);
      setIsOpen(false);
      setLoading(false);
    } catch (err: any) {
      err.response && validateToken(err.response.status);
      err.response && console.log(err.response.data.message);
      setIsOpen(false);
      setLoading(false);
    }
  };

  const memoSuccessDiscountPayment = useMemo(
    () => (
      <>
        <div
          className="darkBG"
          onClick={() => setIsSuccessDiscountPayment(false)}
        />
        <div className={styles["success-discount-payment-modal"]}>
          <div className={styles.header}>
            <p className={styles.title}>کد تخفیف شما</p>
          </div>
          <div className={styles.content}>
            <div className={styles.card}>
              <div className={styles["img-and-name"]}>
                <Image src={coinIcon} alt="card img" width={48} height={48} />
                <div className={styles["main-title-card"]}>
                  <p className={styles["card-title"]}>
                    {discountReceiptInfo.title}
                      <span style={{fontFamily:"iranyekan",margin:"0 3px"}}>
                      {discountReceiptInfo.percent}
                      </span>   
                      درصد تخفیف
                  </p>
                  <div className={styles["desc"]}>
                    <p>  
                      مهلت استفاده تا :
                    <span className={styles['date-detail']}>
                    {moment(discountReceiptInfo.endDate).format('jDD')}
                    </span>
                    <span className={styles['date-detail']}>
                      {moment(discountReceiptInfo.endDate).locale('fa').format('jMMMM')}
                    </span>
                    <span className={styles['date-detail']}>
                      {moment(discountReceiptInfo.endDate).format('jYYYY')}
                    </span>
                    <span className={styles['limitation-text']}>
                    برای 
                    {" "}{discountReceiptInfo.limitation}{" "}
                    بار
                    </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.btns}>
                <button className={styles["code-btn"]}>
                  <p>{discountReceiptInfo.code}</p>
                </button>
                <button
                  className={styles["copy-code-btn"]}
                  onClick={() => copyToClipboardHandler(discountReceiptInfo.code)}
                >
                  کپی کردن کد
                </button>
              </div>
            </div>
            <div className={styles["link-to-discount-crm-text"]}>
              <p>
                تخفیف های دریافتی شما در صفحه{" "}
                <span
                  onClick={() =>
                    router.push(`/${merchantId}/profile/customer-club/discount-crm`)
                  }
                >
                  تخفیف های دریافتی
                </span>{" "}
                قابل مشاهده میباشد
              </p>
            </div>
          </div>
          <div className={styles["submit-filter-btn"]}>
            <button onClick={() => setIsSuccessDiscountPayment(false)}>
              بازگشت
            </button>
          </div>
        </div>
      </>
    ),
    [isSuccessDiscountPayment]
  );

  return (
    <Layout loginCheck footer={false}>
       {loading ? <LoadingCircle/> : ''}
      <div className={styles["customer-club"]}>
        <div className={styles["main-title"]}>
          <Link href={`/${merchantId}/profile`} className={styles.back}>
            <Image src={backIcon} alt="back icon" width={24} height={24} />
            <p>بازگشت</p>
          </Link>
          <p className={styles.title}>باشگاه مشتریان</p>
        </div>
        <div className={styles["score-info"]}>
          <p>کل امتیازات شما</p>
          <div className={styles["score"]}>
            <span>{userInfo?.score && (userInfo.score).toFixed(2)}</span>
            <p>امتیاز</p>
            <Image src={coinIcon} alt="coin icon" width={16} height={16} />
          </div>
        </div>
        <div className={styles["info-btns"]}>
          <FilterBtn
            clickHandle={() =>
              router.push(`/${merchantId}/profile/customer-club/discount-crm`)
            }
            width={20}
            height={20}
            imgSource={discountIcon}
          >
            <p> تخفیف های دریافتی</p>
          </FilterBtn>
          <FilterBtn
            clickHandle={() =>
              router.push(
                `/${merchantId}/profile/customer-club/history-score-crm`
              )
            }
            width={20}
            height={20}
            imgSource={clockIcon}
          >
            <p>تاریخچه امتیازها</p>
          </FilterBtn>
        </div>
        <div className={styles["customer-club-cards"]}>
          {!isEmpty(customerClubInfo) && customerClubInfo.map((item:any) => (
            <div key={item.id} className={styles.card}>
            <div className={styles["img-and-name"]}>
              <Image src={coinIcon} alt="card img" width={64} height={64} />
              <div className={styles["main-title-card"]}>
                <p className={styles["card-title"]}>{item.title}</p>
                <div className={styles["desc"]}>
                  <Image
                    src={discountIcon}
                    alt="discount icon"
                    width={24}
                    height={24}
                  />
                  <div className={styles['desc-text']}>
                  <span>{item.percent}</span>
                  <p>درصد تخفیف</p>
                  </div>
                
                </div>
              </div>
            </div>
            <div className={styles.btns}>
              <button className={styles["needed-score-btn"]}>
                <Image src={coinIcon} alt="coin icon" width={17} height={17} />
                <div className={styles['needed-score-text']}>
                <span>{item.clubScore}</span>
                <p> امتیاز مورد نیاز</p>
                </div>
              </button>
              <button
                className={styles["receive-discount-btn"]}
                onClick={() => openModalHandler(item.clubScore,item.title,item.id)}
              >
                دریافت تخفیف
              </button>
            </div>
          </div>
          ))}
          
        </div>
      </div>
      {isOpen && (
        <Modal
          yesButton="دریافت تخفیف"
          yesButtonHandler={submitModalHandler}
          setIsOpen={setIsOpen}
          title={title}
        >
          <p>
            با دریافت این تخفیف
            <span style={{margin:"0 5px",fontSize:"16px",color:"#1174f8",fontFamily:"iranyekan"}}>
            {point}
            </span>
            امتیاز از شما کم میشود
          </p>
        </Modal>
      )}
      {isSuccessDiscountPayment && memoSuccessDiscountPayment}
    </Layout>
  );
};

export default CustomerClub;
