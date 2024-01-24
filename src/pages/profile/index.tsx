import Layout from "@/components/layout";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile = () => {
    // const{isLogin} = useAuth();
    // const router = useRouter();
    // console.log(isLogin());

// useEffect(() => {
// if(!isLogin()){
//  router.push('/authenticate/login')
// }
// },[])


    return ( 
        <Layout>
        <div>
            پروفایل
        </div>
        </Layout>
     );
}
 
export default Profile;