import React, {useRef} from "react";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import { Button } from "@chakra-ui/react";

function Upload() {
    const fileInputRef = useRef(null);

  const encryptionSignature = async() =>{
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

  const progressCallback = (progressData) => {
    let percentageDone = 100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async () => {
    const file = fileInputRef.current.files[0]; // Get the selected file from the input element
    if (!file) {
      console.error('No file selected');
      return;
    }

    const output = await lighthouse.upload(file, "api", progressCallback);
    console.log('File Status:', output);

    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  /* Deploy file along with encryption */
  const uploadFileEncrypted = async(e : any) =>{
    console.log("uploading ..");
    try {
      const sig = await encryptionSignature();
      const response = await lighthouse.uploadEncrypted(
        e,
        "",
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
    <div className="App">
      <input type="file" />
      <Button onClick= {(e)=>uploadFileEncrypted(e)}>Upload</Button>
      <input type="file" ref={fileInputRef} />
      <Button onClick= {(e)=>uploadFile(e)}>Upload File</Button>
    </div>
  );
}

export default Upload;