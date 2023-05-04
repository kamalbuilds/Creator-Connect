import React from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import { Button, Box, Input, Select, useToast } from "@chakra-ui/react";
import { useState } from "react";

function AccessControl() {
  const [cid, setCid] = React.useState("QmW5os2bHWSnHaNN7rEknUUog1hhNYc1MWSMjVCoUuaRjU");
  const [selectedChain, setSelectedChain] = useState("wallaby");
  console.log(selectedChain)
  const toast = useToast();
  const handleChainChange = (e : any) => {
    setSelectedChain(e.target.value);
  };

  const [conditions, setConditions] = useState([
    {
      id: 1,
      chain: selectedChain,
      method: "balanceOf",
      standardContractType: "ERC721",
      contractAddress: "0x1a6ceedD39E85668c233a061DBB83125847B8e3A",
      returnValueTest: { comparator: ">=", value: "1" },
      parameters: [":userAddress"],
    },
  ]);

  const encryptionSignature = async() =>{
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return({
      signedMessage: signedMessage,
      publicKey: address
    });
  }

  const applyAccessConditions = async (e: any) => {
    e.preventDefault();
    const aggregator = "([1])";
    console.log(conditions,"cid");
    const { publicKey, signedMessage } = await encryptionSignature();
    
    const response = await lighthouse.applyAccessCondition(
      publicKey,
      cid,
      signedMessage,
      conditions,
      aggregator
    );
    toast({
      title: "Access Conditions applied successfully",
      description: "Visit at https://gateway.lighthouse.storage/ipfs/" + response.data.cid,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    console.log(response);
  };

  const handleConditionChange = (index: number, field: string, value: any) => {
    setConditions((prevConditions) =>
      prevConditions.map((condition, i) =>
        i === index ? { ...condition, [field]: value } : condition
      )
    );
  };

  const handleComparatorChange = (index: number, value: string) => {
    setConditions((prevConditions) =>
      prevConditions.map((condition, i) =>
        i === index
          ? { ...condition, returnValueTest: { ...condition.returnValueTest, comparator: value } }
          : condition
      )
    );
  };

  const handleValueChange = (index: number, value: string) => {
    setConditions((prevConditions) =>
      prevConditions.map((condition, i) =>
        i === index
          ? { ...condition, returnValueTest: { ...condition.returnValueTest, value: value } }
          : condition
      )
    );
  };

  return (
    <div className="flex justify-center items-center my-4 mx-4">
      <Box maxW="lg" p="8" borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <h2 className="text-cyan-400 text-center">Apply Access Control to your Encrypted Files</h2>
        {conditions.map((condition, index) => (
          <div key={condition.id}>
            <div>
              <label htmlFor={`id-${index}`}>ID:</label>
              <Input
                type="text"
                id={`id-${index}`}
                value={condition.id}
                readOnly
              />
            </div>
            <div>
              <label htmlFor={`chain-${index}`}>Chain:</label>
              <Select
                id={`chain-${index}`}
                value={selectedChain}
                onChange={handleChainChange}
              >
                <option value="testnet">Hyperspace</option>
                <option value="wallaby">Wallaby</option>
                <option value="Polygon">Polygon</option>
                <option value="Ethereum">Ethereum</option>
              </Select>
            </div>
            <div>
              <label htmlFor={`method-${index}`}>Method:</label>
              <Input
                type="text"
                id={`method-${index}`}
                value={condition.method}
                onChange={(e) =>
                  handleConditionChange(index, "method", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor={`standardContractType-${index}`}>
                Standard Contract Type:
              </label>
              <Select
                id={`standardContractType-${index}`}
                value={condition.standardContractType}
                onChange={(e) =>
                    handleConditionChange(
                        index,
                        "standardContractType",
                        e.target.value
                    )
                    }   
              >
                <option value="ERC721">ERC-721</option>
                <option value="ERC20">ERC-20</option>
                <option value="ERC1155">ERC-1155</option>
              </Select>
            </div>
            <div>
              <label htmlFor={`returnValueTest-${index}`}>
                Comparator with Value:
              </label>
              <div>
                <Select
                  id={`comparator-${index}`}
                  value={condition.returnValueTest.comparator}
                  onChange={(e) =>
                    handleComparatorChange(index, e.target.value)
                  }
                >
                  <option value=">=">{">="}</option>
                  <option value="==">{"=="}</option>
                  <option value="<=">{"<="}</option>
                </Select>
                <Input
                  type="text"
                  id={`value-${index}`}
                  value={condition.returnValueTest.value}
                  onChange={(e) =>
                    handleValueChange(index, e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <label htmlFor={`contractAddress-${index}`}>
                Contract Address:
              </label>
              <Input
                type="text"
                id={`contractAddress-${index}`}
                value={condition.contractAddress}
                onChange={(e) =>
                    handleConditionChange(
                        index,
                        "contractAddress",
                        e.target.value
                    )
                  }
                />
              </div>
              <div>
                <label htmlFor={`returnValueTest-${index}`}>
                    CID
                </label>
                <Input
                    type="text"
                    id={`cid-${index}`}
                    value={cid}
                    onChange={(e) =>
                        setCid(e.target.value)
                    }
                />
              </div>
              {/* Add other fields as needed */}
            </div>
          ))}
          <Button onClick={(e) => applyAccessConditions(e)} className="mx-12 my-4">
            Apply Access Conditions
          </Button>
        </Box>
      </div>
    );
    }
    
    export default AccessControl;
    
