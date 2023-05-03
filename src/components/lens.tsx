import { ShareToLens, Theme, Size } from '@lens-protocol/widgets-react';
import { Box, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';

function LensShareComponent() {
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [via, setVia] = useState('');
  const [title, setTitle] = useState('Share your post on Lens 🌿');


  return (
    <>
    <Box className='w-90 border-4 mx-40 p-4'>
      <Input
        type="text"
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Enter hashtags"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Enter via"
        value={via}
        onChange={(e) => setVia(e.target.value)}
      />
        <div className='mx-40 my-10'>
            <ShareToLens
                content={content}
                url={url}
                hashtags={hashtags}
                via={via}
                title={title}
                theme={Theme.default}
                size={Size.medium}
            />
        </div>
    </Box>
      </>
  );
}

export default LensShareComponent;
