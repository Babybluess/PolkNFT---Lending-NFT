"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { UpdatedIMG } from "@/components";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listDto } from "@/types/user.type";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { abis } from "../config/abis";
// import CustomButton from "./CustomButton";

function index() {
   const router = useRouter();
   const account = useAccount();
   const balance = useBalance({
      address: account.address,
   });
   const [price, setPrice] = useState(0);
   const [amount, setAmount] = useState(0);
   const [duration, setDuration] = useState(0);

   const backClick = () => {
      router.back();
   };

   const list = useReadContract({
      chainId: 420420421,
      address: `0x${process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS}`,
      functionName: "getOwnNft",
      abi: abis,
   });

   return (
      <div className=" w-full min-h-screen relative flex flex-col bg-white">
         <p
            onClick={() => backClick()}
            className=" absolute left-5 top-5 hover:-translate-x-2 cursor-pointer w-[40px] h-[40px] bg-[#E2EAB0] rounded-xl flex justify-center items-center"
         >
            &#8592;
         </p>
         <div className=" w-full h-[500px] bg-white">
            <UpdatedIMG name={"Background"} />
            <div className=" flex w-full h-[250px] max-sm:pt-10 gap-2 items-end px-[10%] -translate-y-40">
               <UpdatedIMG name={"Avatar"} />
               <div className=" h-[50px] flex justify-center items-center rounded-xl bg-gradient-to-br from-[#E55D87] to-[#5FC3E4]">
                  <span className=" text-black font-bold text-3xl max-sm:text-sm px-[10px] flex items-end">
                     {account.address?.substring(0, 4)}...
                     {account.address?.substring(38)}
                  </span>
               </div>
            </div>
         </div>
         {/* Own Assets */}
         <div className="w-full h-full px-5">
            <span>Own assets</span>
            <div className="w-full flex flex-wrap p-20 gap-10">
               {Array.isArray(list.data) &&
                  list.data.length > 0 &&
                  list.data.map((nft: any, index: number) => (
                     <div
                        key={index}
                        className={`w-[300px] h-[450px] shadow-inner shadow-indigo-500 flex flex-col justify-center items-center border-2 border-[#5B3BA8] rounded-md bg-[#28262F] relative ${nft.highest_bid > 0 ? "hidden" : "visible"}`}
                     >
                        <div className=" w-[30%] text-center absolute left-0 top-0 z-40 text-white font-medium rounded-br-xl bg-[#5C3CA8]">
                           <p>{nft.type}</p>
                        </div>
                        <div
                           className={
                              "w-full h-[65vh] px-5 py-2  flex flex-col text-white rounded-t-xl"
                           }
                        >
                           <div className=" w-full h-[65%] rounded-t-xl flex justify-center items-center">
                              <img
                                 className=" w-full h-full py-1 rounded-t-xl object-cover"
                                 src={nft.newuri}
                              />
                           </div>
                           <div className=" w-full flex gap-2">
                              <div className=" w-6 h-6">
                                 <img
                                    className=" h-full w-full object-cover rounded-full"
                                    src={"../../images/bannerIMG/avartar.jpg"}
                                 />
                              </div>
                              <p>
                                 {String(nft.lender).substring(0, 4)}...
                                 {String(nft.lender).substring(38)}
                              </p>
                           </div>
                           {nft.status == 0 ? (
                              <>
                                 <p className=" text-gray-500 font-medium">Price:</p>
                                 <div className=" flex w-full gap-1 items-center">
                                    <div className=" w-5 h-5">
                                       <img src="../../images/icons/westend_icon.png" />
                                    </div>
                                    <input
                                       onChange={(e: any) =>
                                          setPrice(Number(e.target.value))
                                       }
                                       className=" text-black w-full rounded-md"
                                       type="number"
                                       placeholder="?$/nft"
                                    />
                                 </div>
                                 <p className=" text-gray-500 font-medium">Amount:</p>
                                 <input
                                    onChange={(e: any) =>
                                       setAmount(Number(e.target.value))
                                    }
                                    className=" text-black w-full rounded-md"
                                    type="number"
                                    placeholder="0"
                                 />
                              </>
                           ) : (
                              <>
                                 <p className=" text-gray-500 font-medium">Price: {(nft.price / (10 ** 18)).toFixed(2)}</p>
                                 <p className=" text-gray-500 font-medium">Amount: {nft.lendingAmount}</p>
                              </>
                           )}
                           <div className="w-full flex flex-col gap-2">
                              <span>Renting duration:</span>
                              <select onChange={(e) => setDuration(Number(e.target.value))}>
                                 <option title="5 minute" value={300}></option>
                                 <option title="10 minute" value={600}></option>
                                 <option title="30 minute" value={1800}></option>
                                 <option title="1 hour" value={3600}></option>
                                 <option title="1 day" value={86400}></option>
                                 <option title="10 day" value={864000}></option>
                              </select>
                           </div>
                           {/* <CustomButton index={index} data={nft} price={price} amount={amount} deadline={duration} /> */}
                        </div>
                     </div>
                  ))}
            </div>
         </div>
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
         />
      </div>
   );
}

export default index;
