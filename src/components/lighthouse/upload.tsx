//@ts-nocheck
import React, {useRef} from "react";
import { useState } from "react";
import lighthouse from '@lighthouse-web3/sdk';
import { Button } from "@chakra-ui/react";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useBalance,
} from "wagmi";
import { createEvent } from "react-dom/test-utils";

export default function Upload() {
    const encryptedfileInputRef = useRef(null);
    const [sig, setSig] = useState(null);
    const [file , setFile ] = useState<any>()
    const provider = useProvider();
    const { data: signer } = useSigner();
    const { address, isConnected } = useAccount();
    console.log(file,"file");

    const encryptionSignature = async() =>{
      const messageRequested = (await lighthouse.getAuthMessage(address as string)).data.message;
      console.log(signer,"signer")
      const signedMessage = await signer?.signMessage(messageRequested);
      return({
        signedMessage: signedMessage,
        publicKey: address
      });
    }

    const progressCallback = (progressData: any) => {
      let percentageDone: any = (
        progressData.total / progressData.uploaded
      )?.toFixed(2);
      let percentage: any = 100 - percentageDone;
      console.log(percentage);
    };

    const uploadFile = async (e : any) => {
      // e.preventDefault();
      if (!e.target.files || e.target.files.length === 0) {
        console.error('No file selected');
        return;
      }
      console.log(e,"event");
      const output = await lighthouse.upload(
        e,
        process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string,
        progressCallback
      );
      console.log('File Status:', output);
      alert("File uploaded successfully", output.data.Hash);

      console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    };
    

  /* Deploy file along with encryption */
  const uploadFileEncrypted = async(e : any) =>{
    console.log("uploading ..");
    try {
      const sig = await encryptionSignature();
      const response = await lighthouse.uploadEncrypted(
        e,
        process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string,
        sig.publicKey as string,
        sig.signedMessage as string,
        progressCallback
      );
      alert("File uploaded successfully", response.data.Hash);
      console.log(response.data.Hash);

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  function handleFileChange (e : any) {
    const file = e.target.files[0];
    setFile(file);
    console.log(file,"file set");
  }

  return (
    <div className="my-8 text-center">
      <h1 className="text-center text-indigo-400 text-2xl">Now upload your Recordings</h1>
      <div className="flex items-center my-4">
        <input
                accept="application/pdf , text/plain"
                className="block text-sm text-gray-900 border border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file"
                type="file"
                onChange={(e)=> uploadFile(e)}
              />
          <Button className="ms-4">Upload File</Button>
      </div>
      <div className="flex items-center my-4">
        <input
              accept="application/pdf , text/plain"
              className="block text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file"
              type="file"
              onChange={(e) => uploadFileEncrypted(e)}
            />
        <Button  className="ms-4">
          Upload Encrypted File
        </Button>
      </div>
    </div>
  );
}
