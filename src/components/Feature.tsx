import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ReactElement } from 'react';
  import {
    FcAbout,
    FcCollaboration,
    FcDonate,
    FcManager,
  } from 'react-icons/fc';
  import { GrPersonalComputer } from 'react-icons/gr';
  import { SiLighthouse } from 'react-icons/si';
  interface CardProps {
    heading: string;
    description: string;
    icon: ReactElement;
    href: string;
  }
  
  const Card = ({ heading, description, icon, href }: CardProps) => {
    return (
      <Box
        maxW={{ base: 'full', md: '275px' }}
        w={'full'}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}
      >
        <Stack align={'start'} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={'white'}
            rounded={'full'}
            bg={useColorModeValue('gray.100', 'gray.700')}
            mx={'auto'}
          >
            {icon}
          </Flex>
          <Box mt={2}>
            <Heading size="md">{heading}</Heading>
            <Text mt={1} fontSize={'sm'}>
              {description}
            </Text>
          </Box>
          <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
            Learn more
          </Button>
        </Stack>
      </Box>
    );
  };
  
  
  export default function Feature() {
    return (
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
            Features
          </Heading>
          <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
            Connect with your creators seamlessly and get access to exclusive content.
          </Text>
        </Stack>
  
        <Container maxW={'5xl'} mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
            <Card
                heading={'Build your Communities'}
                icon={<Icon as={FcManager} w={10} h={10} />}
                description={
                  'As a Creator Build your Communities by Scheduling Token-Gated Meetups'
                }
                href={'#'}
              />
            <Card
              heading={'Pay per view Content'}
              icon={<Icon as={FcDonate} w={10} h={10} />}
              description={
                'Creators can monetize their content by implementing a pay-per-view model, where viewers pay a fee to access their exclusive videos or podcasts.'
              }
              href={'#'}
            />
            <Card
              heading={'NFT gated events'}
              icon={<Icon as={FcCollaboration} w={10} h={10} />}
              description={
                'Creators can organize interactive events, such as virtual meetings or live streams, where their community members can engage with them in real-time.'
              }
              href={'#'}
            />
            <Card
              heading={'Lighthouse Powered Access'}
              icon={<Icon as={SiLighthouse} w={10} h={10} />}
              description={
                'Apply Access Controls to your Files'
              }
              href={'#'}
            />
            <Card
              heading={'Decentralised Storage'}
              icon={<Icon as={GrPersonalComputer} w={10} h={10} />}
              description={
                'Storing content on Filecoin ensures durability, security, and resilience.'
              }
              href={'#'}
            />
          </Flex>
        </Container>
      </Box>
    );
  }