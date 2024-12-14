// @ts-nocheck
"use client"
import Axios from '@/Axios/Axios'
import { settingsContext } from '@/context/settingContext'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'


const PaymentForRechargeWallet = () => {
     const { getUserDetails} = useContext<any>(settingsContext)
    

    const formatPaymentTime = (date:any) => {
      // Define month names array
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
  
      // Get day, month, year, hour, and minute
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const hour = date.getHours();
      const minute = date.getMinutes();
  
      // Format the date string
      return `${day} ${month} ${year}, ${hour}:${minute < 10 ? '0' : ''}${minute}`;
    };

   
    const verifyOrder = async ( paymentid:any, orderidnew:any, signature:any, prefilledDetails:any, amount:any)=>{
    //   setLoadAddBudget(true)
        const body = {
          order_id: orderidnew, 
          payment_id: paymentid,
          razorpay_signature:signature
      }
          try {
             const res = await Axios.post("/verify-order", body)

            //  console.log("verify order", res)
                if(res.status===200){
                  const paymentTimeFromApi = new Date();
                  const payment_details = {
                    userName:prefilledDetails?.name,
                    time:formatPaymentTime(paymentTimeFromApi),
                    method:'Online',
                    payment_id:paymentid,
                    amount:amount
                   }
                   getUserDetails()

                  
                }
          } catch (error) {
              console.log(error)
            //   setLoadAddBudget(false)
          }finally{
           
            // setLoadConfirmAndPay(false)
          }
    }
     
 
          //razorpay script
    const loadScript = (src:any) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
                //     window.alert('You are offline, failed to load the resources.')
            }
            document.body.appendChild(script)
        })
    }
   
     const payForReachargeWalletWithRazorpay = async ( amountPayble:any, orderid:any, prefilledDetails:any ) => {
    
                   // console.log("payload", adcampaignBody)
                    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
                    if (!res) {
                        alert('You are offline, failed to load the resources.')
                        return
                    }
                
                   var options = {
                    "description": 'Order fees',
                     order_id:orderid,
                      'captured':true,
                    
                    currency: 'INR',
                    
                        key: 'rzp_test_tQA0WDlYMnLscN', //anurag
                      //  key:'rzp_live_kFf2x1pRYyzrD4',
                  
                    amount: amountPayble* 100,//amount in paise
                    
                    name: 'LeapX',
                   // description:'Thanks for purchasing',
                    notes: {
                      description: "Leapx",
                      campaign:""
                      
                  
              },
                    prefill: {
                        email:prefilledDetails?.email,
                        contact:prefilledDetails?.number,
                        name:prefilledDetails?.name,
                    },
                    // theme: { color: '#e2bc3f' },
                    handler: function (response:any) {
                     console.log("razotpay res", response)
                        
                        if(response?.razorpay_payment_id && response?.razorpay_order_id && response?.razorpay_signature){
                          verifyOrder(response?.razorpay_payment_id, response?.razorpay_order_id, response?.razorpay_signature, prefilledDetails, amountPayble)
                          console.log("raz apy red after pay", response)
                        }
                       
                      
                    },
                    // prefill:{
                    //      name:'leapX'

                    // }
                };
                
   // @ts-ignore           
                    const paymentObject = new window.Razorpay(options)
                    //  console.log("paymentObject", paymentObject)
                    // paymentObject.on('payment.failed', (response) => {
                    //     update_order(order?.id,response.error.metadata.payment_id,2,type)
                    // })
                    paymentObject.open()
                   
                



         
          
    }
     
  return payForReachargeWalletWithRazorpay
    
  
}

export default PaymentForRechargeWallet;