//@ts-nocheck
import React, {useRef} from "react";
import { useState } from "react";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import { Button } from "@chakra-ui/react";

export default function Upload() {
    const fileInputRef = useRef(null);
    const encryptedfileInputRef = useRef(null);
    const [sig, setSig] = useState(null);

  const encryptionSignature = async() =>{
    if(window){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log(address,"address");
        const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
        const signedMessage = await signer.signMessage(messageRequested);
        console.log(signedMessage,"signedMessage");
        return({
          signedMessage: signedMessage,
          publicKey: address
        });
    }
  }

  const progressCallback = (progressData : any) => {
    let percentageDone = 100 - Number((progressData?.total / progressData?.uploaded)?.toFixed(2));
    console.log(percentageDone);
  };

  const uploadFile = async () => {
    const file = fileInputRef.current.files[0]; // Get the selected file from the input element
    if (!file) {
      console.error('No file selected');
      return;
    }
    const output = await lighthouse.upload(file, "59424315-565a-4f1d-8d60-b8c6de63bae2", progressCallback);
    console.log('File Status:', output);

    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  /* Deploy file along with encryption */
  const uploadFileEncrypted = async(e : any) =>{
    console.log("uploading ..");
    try {
      const sig = await encryptionSignature();
      setSig(sig);
      const file = encryptedfileInputRef.current.files[0]; 
      console.log(file,sig,"file and sig");
      const response = await lighthouse.uploadEncrypted(
        file,
        "59424315-565a-4f1d-8d60-b8c6de63bae2",
        sig.publicKey,
        sig.signedMessage,
        progressCallback
      );
      console.log(response);
      /*
        output:
          data: {
            Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
            Size: "318557",
            Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
          }
        Note: Hash in response is CID.
      */
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <div className="my-8">
        <h1>Now upload your Recordings</h1>
        <input type="file" ref={encryptedfileInputRef} className="mb-4" />
        <Button onClick={(e) => uploadFileEncrypted(e)} className="mr-4">Upload Encrypted File</Button>
        <input type="file" ref={fileInputRef} className="mb-4" />
        <Button onClick={uploadFile}>Upload File</Button>
    </div>
  );
}
