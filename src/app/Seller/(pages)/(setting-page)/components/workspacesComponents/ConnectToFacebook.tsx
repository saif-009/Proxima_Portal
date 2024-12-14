// @ts-nocheck
"use client"
import React, { useEffect } from "react";
import { Facebook } from "lucide-react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react'
import ButtonLoader from "@/components/ButtonLoader";

// Define a TypeScript interface for the props
interface ConnectToFacebookProps {
    handelClientsPage: (accessToken: string) => void;
    setToken: (token: string) => void;
    fetchFbPageLoad: boolean;
}

// const accesstoken = "EAAO9e3ZAvFL4BO7WoF4AkTnA4Inn8e7CUoStqOqo0nZCIzaCyiGowCFoz9L0sRALZCwZCgZC9sp0Ei7zsjHtaikgFZB8UeGqNWTUz7BZADbnz3n4uhmGZCxOx4jSRRg8zZAC94vOUaEYZAQJgMQjmpEkzZCnLBjVxCiXH1l2ZBZCroJUN4FL06uEGBRvVYSbId8s9mH56ZCKxY6pLskuf0Q8MEx4EZD"

const ConnectToFacebook = ({ handelClientsPage, fetchFbPageLoad, text }:any) => {

    
    
    useEffect(() => {
        const loadFacebookSDK = () => {
            // Load the JavaScript SDK asynchronously
            const script = document.createElement("script");
            script.id = "facebook-jssdk";
            script.src = "https://connect.facebook.net/en_US/sdk.js";
            script.async = true;

            const firstScript = document.getElementsByTagName("script")[0];
            firstScript.parentNode.insertBefore(script, firstScript);

            // Optional: Clean up the script on component unmount
            return () => {
                const fbSdkScript = document.getElementById("facebook-jssdk");
                if (fbSdkScript) {
                    fbSdkScript.parentNode.removeChild(fbSdkScript);
                }
            };
        };

        

        window.fbAsyncInit = () => {
            // FB JavaScript SDK configuration and setup
            window.FB.init({
                appId: "1052762895750334",
                cookie: true,
                xfbml: true,
                version: "v20.0",
            });
        };

        loadFacebookSDK();
    }, []);

    const launchFBE = () => {
        if (window.FB) {
            window.FB.login(
                function (response: any) {
                    if (response.authResponse) {
                        const accessToken = response.authResponse.accessToken;
                        Cookies.set("fbToken", accessToken, { expires: 7 });

                        handelClientsPage(accessToken);
                        // setToken(accessToken);
                    } else {
                        console.log("User cancelled login or did not fully authorize.");
                    }
                },
                {
                    config_id: '2496508650531906',
                }
            );
        }
    };

 

    return (
        <div className="">
             <Button onClick={launchFBE} className="w-full dark:bg-[#383838] dark:text-white">
                
                
             {/* {!fetchFbPageLoad && <Facebook style={{ marginRight: 2 }} />} */}
                {fetchFbPageLoad ? (
                    <> <span>Link Ad A/C</span> &nbsp;<ButtonLoader/></>
                ) :'Link Ad A/C'}
                               
                </Button>

        </div>
    );
}

export default ConnectToFacebook;
