// @ts-nocheck
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import lighthouse from "@lighthouse-web3/sdk";
import { useAccount } from 'wagmi';

const FileListButton = () => {
  const { address } = useAccount();
  const [fileList, setFileList] = useState([]);
  const [toggle,SetToggle] = useState(false);
  
  const fetchFileList = async () => {
    SetToggle(!toggle);
    try {
      const response = await lighthouse.getUploads(address as string);
      const files = response.data.fileList;
      setFileList(files);
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  };

  return (
    <>
      <Button onClick={fetchFileList}>Show File List</Button>
      <div className='mt-40 flex'>
        { toggle && fileList.map((file) => (
            <div key={file.id} className='p-4 flex flex-row'>
            <p>File Name: {file.fileName}</p>
            <p>File Type: {file.mimeType}</p>
            {/* Add more file information as needed */}
            </div>
        ))}
      </div>
    </>
  );
};

export default FileListButton;