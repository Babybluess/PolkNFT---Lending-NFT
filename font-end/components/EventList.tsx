"use client";
import React from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TAsset } from "@/types/user.type";
import { useReadContract } from "wagmi";
import { abis } from "@/pages/config/abis";
import EventModal from "./modelUtils/EventModal";

function EventList() {
   const handleBid = async (asset: any) => {
      setTimeout(() => {
         toast.success("🦄 It is successfull bidding!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
         });
      }, 15000);
   };

   const list = useReadContract({
      chainId: 420420421,
      address: `0x${process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS}`,
      functionName: "getOwnNft",
      abi: abis,
   });

   return (
      <div className="w-full min-h-[80vh] z-30 flex flex-col gap-5 items-center text-white px-10 py-5 border-x-4 border-[#F7F7F9]">
         <p className=" text-4xl font-semibold">Event list</p>
         {/* <div className="w-full">
         </div> */}
            <EventModal />
         {/* <div className="w-full h-full">
            {Array.isArray(list.data) && list.data.length > 0 ? (
               <div className="w-full flex flex-wrap gap-5">
                  {list.data.map((nft: any, index: number) => (
                     <div
                        key={index}
                        className={
                           "w-[300px] h-[450px] shadow-inner shadow-indigo-500 flex flex-col justify-center items-center border-2 border-[#5B3BA8] rounded-md bg-[#28262F] relative"
                        }
                     >
                        <div className=" w-[30%] text-center absolute left-0 top-0 z-40 text-white font-medium rounded-br-xl bg-[#5C3CA8]">
                           <p>{nft.type}</p>
                        </div>
                        <div
                           className={
                              "w-full h-[65vh] px-5 py-2  flex flex-col text-white rounded-t-xl"
                           }
                        >
                           <img
                              className=" w-full h-[65%] py-1 rounded-t-xl object-cover"
                              src={nft.image}
                           />
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
                           <p className=" text-gray-500 font-medium">
                              Highest bidding price:
                           </p>
                           <div
                              className={` ${
                                 false ? "flex items-center" : "flex flex-col items-end"
                              } w-full gap-3 `}
                           >
                              <div className=" flex w-full gap-1 items-center">
                                 <div className=" w-5 h-5">
                                    <img src="../../images/icons/cardano.png" />
                                 </div>
                                 <p>{nft.highest_bid}</p>
                              </div>
                              <p className=" text-gray-500 font-medium w-full">
                                 Eligible Nft id: {nft.id}
                              </p>
                              <div className="w-full flex flex-col">
                                 <span>Start time: {nft.start_time}</span>
                                 <span>End time: {nft.end_time}</span>
                              </div>
                              <button className=" w-full p-2 bg-yellow-300 rounded-xl">
                                 Bid
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="w-full flex justify-center items-center py-5">
                  <span className="text-gray-300 text-xl text-center">No data</span>
               </div>
            )}
         </div> */}
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

export default EventList;
