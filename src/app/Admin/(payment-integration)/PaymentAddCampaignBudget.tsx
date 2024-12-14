// import React, { useEffect, useState } from 'react'
// import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Axios from '../../../Axios'
// import { AuthContext } from '../../../AuthProvider'
// import { addBudgetContext } from '../../../context/AddBudgetContext'
// import { toast as hotTost } from 'react-hot-toast';
// import { useSnackbar } from '../../../SnackBarProvider'
// import { settingsContext } from '@/context/settingContext'
// // import PaymentLoader from '../PaymentLoader'
// // import { useSnackbar } from '../../SnackBarProvider'



// const PaymentAddCampaignBudget = () => {
   
//     const {userToken, handleAllFBApiCall, fetchCampaignInsites,  setAddBudgetOrderId, setLoadAddBudget, setUserDetails} = useContext(settingsContext)
//     const { setOrderDetails} = useContext(addBudgetContext)
  
//     const [isAddBudgetLoading, setIsAddBudgetLoading] = useState(false)
//     const showSnackbar = useSnackbar();

//     const formatPaymentTime = (date) => {
//       // Define month names array
//       const monthNames = [
//         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//       ];
  
//       // Get day, month, year, hour, and minute
//       const day = date.getDate();
//       const month = monthNames[date.getMonth()];
//       const year = date.getFullYear();
//       const hour = date.getHours();
//       const minute = date.getMinutes();
  
//       // Format the date string
//       return `${day} ${month} ${year}, ${hour}:${minute < 10 ? '0' : ''}${minute}`;
//     };



// // user
// const getUserDataForAddBudget = async (tokenUser)=>{
//   try {
//     const res = await Axios.get("/user", {
//       headers:{
//         Authorization:tokenUser
//       }    
//     })

//     if(res.status===200){
//       const details = res?.data?.user
//       setUserDetails(details)
//     }
//   } catch (error) {
    
//   }
// }




  
//     const verifyOrder = async ( paymentid, orderidnew, signature, campaignBody, prefilledDetails, amount)=>{
//       setLoadAddBudget(true)
//         const body = {
//           order_id: orderidnew, 
//           payment_id: paymentid,
//           razorpay_signature:signature
//       }
//           try {
//              const res = await Axios.post("/verify-order", body, {
//                  headers:{
//                     Authorization:userToken,
                  
//                  }

//              })

//             //  console.log("verify order", res)
//                 if(res.status===200){
//                   const paymentTimeFromApi = new Date();
//                   const payment_details = {
//                     userName:prefilledDetails?.name,
//                     time:formatPaymentTime(paymentTimeFromApi),
//                     method:'Online',
//                     payment_id:paymentid,
//                     amount:amount
//                    }


//                    handleAddBudget(campaignBody, paymentid)

//                   // setTimeout(()=>{
//                   //   navigate("/campaign-overview");
//                   // })
//                     // console.log("order verified")
//                 }
//           } catch (error) {
//               console.log(error)
//               setLoadAddBudget(false)
//           }finally{
           
//             // setLoadConfirmAndPay(false)
//           }
//     }

//        //api for capaign creation
//       //api 1
//       const  handleAddBudget = (campaignBody, paymentid ) => {
//         setIsAddBudgetLoading(true)
//         setLoadAddBudget(true)
//         // setCampaignCreationStatus({...campaignCreationStatus, isCampLoading:true, isCampaignFailed:false})
        
//         const body = {
//           campaignId: campaignBody.campaign_id,
//           used_wallet_spend:campaignBody.used_wallet_spend,
//           payable_amount: campaignBody.payable_amount,
//           // payment_id:paymentid || ''
//         }
//         if(paymentid){
//           body['payment_id'] = paymentid
//         }
         
//        // console.log(body);
//         Axios.post("/update-campaign-budget", body, {
//           headers: {
//             Authorization: userToken,
//             "Content-Type": "application/json",
//           },
//         })
//           .then((response) => {
//             localStorage.removeItem("orderid")
//               if(campaignBody?.endDate){
//                 updateEndDate(campaignBody)
//               }else{
//                 setOrderDetails({})
//                 handleAllFBApiCall(userToken)
//                 fetchCampaignInsites(userToken)
//                 getUserDataForAddBudget(userToken)
//                 showSnackbar("Success: Campaign budget updated", 'success');

                
//             setLoadAddBudget(false)
            
//             setIsAddBudgetLoading(false)
//             window.location.reload()
//                 // hotTost.success("Campaign budget updated")
//               }
//             // setAddBudgetOrderId("")
//             // getOrderDetails(campaignBody?.campaign_id, userToken)
           

           
           
           
//           })
//           .catch((error) => {
//             // hotTost.error("Failed to update the campaign budget")
//             showSnackbar("Error: Failed to update the campaign budget", 'error');
//             setIsAddBudgetLoading(false)
//             setLoadAddBudget(false)
//           });
//       };

//     //  update end date 
    
//   const updateEndDate = async (campaignBody)=>{ 
//       console.log("efewfwefewfew")
//     setIsAddBudgetLoading(true)
//     setLoadAddBudget(true)
//        const body = { 
//         campaignId: campaignBody.campaign_id,  //campaign's data base id
//         endDate: campaignBody.endDate
//     }
//        try {
//           const res = await Axios.post("/update-end-date", body, {headers:{Authorization:userToken}});
//             if(res.status===200 && res?.data?.valid){
//                 // hotTost.success("end date updated")
//                 showSnackbar("Success: End date and add budget updated", 'success');
                 
//                 handleAllFBApiCall(userToken)
//             fetchCampaignInsites(userToken)
//             getUserDataForAddBudget(userToken)
//             window.location.reload()
//             }else{
//               showSnackbar("Unable to update end date, please try again later", 'error');
//             }
//        } catch (error) {
//         // setEndDateLoad(false)
//           console.log("error", error)
//           showSnackbar("Unable to update end date", 'error');
//           // hotTost.success("unable to update end date")
//        }finally{
//         setLoadAddBudget(false)
//         setIsAddBudgetLoading(false)
//         setLoadAddBudget(false)
//         // setEndDateLoad(false)
//        }
//   }


 
//           //razorpay script
//     const loadScript = (src) => {
//         return new Promise((resolve) => {
//             const script = document.createElement('script')
//             script.src = src
//             script.onload = () => {
//                 resolve(true)
//             }
//             script.onerror = () => {
//                 resolve(false)
//                 //     window.alert('You are offline, failed to load the resources.')
//             }
//             document.body.appendChild(script)
//         })
//     }
    
//      const payForAddBudgetWithRazorpay = async ( amountPayble, campaignBody, orderid, prefilledDetails ) => {

              
//                   if(!Number(amountPayble)){
                    
//                     handleAddBudget(campaignBody, 0)
//                   //  console.log("amountPayble", amountPayble)
//                    }else{
//                    // console.log("payload", adcampaignBody)
//                     const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
//                     if (!res) {
//                         alert('You are offline, failed to load the resources.')
//                         return
//                     }
                
//                    var options = {
//                     "description": 'Order fees',
//                      order_id:orderid,
//                       'captured':true,

//                     currency: 'INR',
                    
//                         key: 'rzp_test_tQA0WDlYMnLscN', //anurag
//                     //    key:'rzp_live_kFf2x1pRYyzrD4',
                  
//                     amount: amountPayble* 100,//amount in paise
                    
//                     name: 'LeapX',
//                    // description:'Thanks for purchasing',
//                     notes: {
//                       description: "Leapx",
//                       campaign: campaignBody.campaign_id,
                      
                  
//               },
//                     prefill: {
//                         email:prefilledDetails?.email,
//                         contact:prefilledDetails?.number,
//                         name:prefilledDetails?.name,
//                     },
//                     // theme: { color: '#e2bc3f' },
//                     handler: function (response:any) {
//                     //  console.log("razotpay res", response)
                        
//                         if(response?.razorpay_payment_id && response?.razorpay_order_id && response?.razorpay_signature){
//                           verifyOrder(response?.razorpay_payment_id, response?.razorpay_order_id, response?.razorpay_signature, campaignBody, prefilledDetails, amountPayble)
//                           console.log("raz apy red after pay", response)
//                         }
                       
                      
//                     },
                    
//                 };
              
//                     const paymentObject = new window.Razorpay(options)
//                     //  console.log("paymentObject", paymentObject)
//                     // paymentObject.on('payment.failed', (response) => {
//                     //     update_order(order?.id,response.error.metadata.payment_id,2,type)
//                     // })
//                     paymentObject.open()
//                    }
                



         
          
//     }
     
//   return payForAddBudgetWithRazorpay
    
  
// }

// export default PaymentAddCampaignBudget;