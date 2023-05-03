// @ts-nocheck
import React from "react";
import { Box, Heading, Text, Image , Input , Button } from "@chakra-ui/react";
import { useState } from "react";

const Card = ({ heading, description, imageUrl , videoUrl}) => {
  return (
    <Box p={4} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imageUrl} alt={heading} maxH="200px" objectFit="cover" className="mx-20"/>
      <video controls autoPlay className="media my-6">
        <source src={videoUrl} type="video/webm" />
      </video>
      <Box mt={4}>
        <Heading as="h2" size="lg" mb={2}>
          {heading}
        </Heading>
        <Text color="gray.600">{description}</Text>
      </Box>
    </Box>
  );
};

const Cards = () => {
    const [videoUrl, setVideoUrl] = useState("");

    const handleInputChange = (event) => {
      setVideoUrl(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Do something with the videoUrl, like adding it to the cardsData array
      // Reset the input field
      setVideoUrl("");
    };

  const cardsData = [
    {
      heading: "How I owned twitter",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus diam auctor, varius est sit amet, dapibus tortor.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
      videoUrl: "https://test-recordings-123.s3.ap-south-1.amazonaws.com/pox-wriy-iew-1683060075596-DCptpq.mp4",
    },
    {
      heading: "Ape Meetup",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus diam auctor, varius est sit amet, dapibus tortor.",
      imageUrl: "https://huddle01.com/_next/image?url=%2Fimages%2FAbout%2FTeam%2Fpreetham.jpg&w=384&q=100",
      videoUrl: "https://gateway.lighthouse.storage/ipfs/QmdQN5R6F8mU4X8qZ3bUXCnCRNKCeaRZ1L2YjPKrbaEmh8",
    },
    {
      heading: "Card 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus diam auctor, varius est sit amet, dapibus tortor.",
      imageUrl: "https://huddle01.com/_next/image?url=%2Fimages%2FAbout%2FTeam%2Fambesh.jpg&w=384&q=100",
      videoUrl: "https://test-recordings-123.s3.ap-south-1.amazonaws.com/ozi-gvio-kkj-1683061401429-hmumYm.mp4",
    },
  ];

  return (
    <div>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Cards
      </Heading>
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={6}>
        {cardsData.map((card, index) => (
          <Card
            key={index}
            heading={card.heading}
            description={card.description}
            imageUrl={card.imageUrl}
            videoUrl={card.videoUrl}
          />
        ))}
        <Card
          heading="Custom Card"
          description="Enter a video URL:"
          videoUrl={videoUrl}
        />
      </Box>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={handleInputChange}
        />
        <Button type="submit">Add Card</Button>
      </form>
    </div>
  );
};

export default Cards;




// an input box asking the user for the source 