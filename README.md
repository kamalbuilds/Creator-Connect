<div align="center">
  <img src="https://user-images.githubusercontent.com/95926324/235373288-1b9639aa-e9cb-4b9b-ba8d-2bd8310fe3be.png" alt="logo">
</div>

# CreatorConnect

## Problem Statement
In an oversaturated YouTube landscape, new creators face significant challenges in growing their communities and monetizing their content through traditional ad-based models. The CreatorConnect platform aims to address these issues by providing a solution that offers diversified monetization opportunities, exclusive and premium content offerings, enhanced community engagement, and decentralized content storage. By doing so, CreatorConnect empowers creators to overcome the limitations of existing platforms, build loyal fan bases, and establish sustainable careers in the digital realm.

## Introducing the "CreatorConnect" Platform
An innovative solution that empowers creators to easily create and build their community. By combining the features of pay-per-view and an online event platform, we offer creators a comprehensive suite of tools to monetize their content and engage with their audience.

## Features

* <img src="https://user-images.githubusercontent.com/95926324/236307435-47cb8d33-d0f6-47b3-9415-fc9d589aa720.png" alt="ai" width="20"> generated NFT 🖼️: For giving access to your community.

* Pay-per-view functionality 💸: Creators can monetize their content by implementing a pay-per-view model, where viewers pay a fee to access their exclusive videos or podcasts. This feature is seamlessly integrated into the platform, enabling creators to earn revenue directly from their content.

* NFT gated event system 🎫: Creators can organize interactive events, such as virtual meetings or live streams, where their community members can engage with them in real-time. Access to these events is token-gated, meaning attendees must hold specific NFTs representing event tickets or memberships. This fosters community engagement and adds an element of exclusivity.

* Secure storage on Filecoin 🛡️: The platform securely stores creators' content on Filecoin, ensuring durability, accessibility, and protection against content takedowns or policy changes on centralized platforms.

* Lens Integration 📸: Share directly to Lenster.

![CreatorConnect Preview](https://user-images.githubusercontent.com/95926324/235943778-80a2ae6c-658d-40f1-9608-216f118fddc8.png)

## Technologies Used

The CreatorConnect platform is built using the following technologies:

* Huddle01 SDK: Used for effortless recording and uploading of videos or podcasts onto the platform.
  
  A dashboard provided to the creator to perform various SDK functions- [Dashboard Code](https://github.com/legendarykamal/Creator-Connect/blob/master/src/pages/dashboard/%5Bindex%5D.tsx)
  
  Used to create TokenGated room - [Token Gated Code](https://github.com/legendarykamal/Creator-Connect/blob/master/src/components/TokenGated.tsx)

  Recording Video by creator - [Recording code on Dashboard](https://github.com/legendarykamal/Creator-Connect/blob/master/src/pages/dashboard/%5Bindex%5D.tsx#L61)

* Huddle01 iframe : For Recording Meetings by the Creators
  [Code for Iframe](https://github.com/legendarykamal/Creator-Connect/blob/master/src/pages/%5Broomid%5D.tsx)

* Lighthouse SDK: Storing on FVM, Encryption of the data, and Setting Access Control for files straight from the Dapp. Store files on Filecoin and provide the Creator with Encryption & Access control functionality to Encrypt the Video and document.

  Code: [Lighthouse Code Implementation](https://github.com/legendarykamal/Creator-Connect/tree/master/src/components/lighthouse)

* FVM: NFT Contract Deployed on the Filecoin Virtual Machine (FVM) to mint NFTs for token-gated events and ensure security and authenticity.

  Code: [Creator NFT Deployed on Hyperspace FVM Testnet](https://github.com/legendarykamal/Creator-Connect/blob/master/contract/contracts/CreatorNFT.sol)
  
* Deployed link: [CreatorConnect on Hyperspace](https://explorer.glif.io/address/0x983f1200Af39AC6095FF6DaD829c266ADC5B5Cbf/?network=hyperspacenet)

Testing of Minting of NFT: [Minting Nft Transaction on Hyperspace](https://hyperspace.filfox.info/en/tx/0x7f638f73e4ca85bd14f6539195a3a31f884a90706ccbc71ed428398bca419349)

https://user-images.githubusercontent.com/95926324/236297724-50b74895-452f-4d34-a2c3-8807ad0a13c2.mp4

## How CreatorConnect is More Effective than YouTube?

While YouTube is a popular choice for content creators, the CreatorConnect platform offers several advantages that make it more effective in certain scenarios:

1. Monetization Opportunities 💰: CreatorConnect provides additional revenue streams beyond ads and channel memberships. The pay-per-view feature allows creators to directly monetize their content by charging viewers for access, enabling them to earn income directly from their audience.

2. Exclusive and Premium Content 🎁: With pay-per-view and token-gated events, CreatorConnect enables creators to offer exclusive and premium content, attracting dedicated fans who are willing to pay for specialized content or access to interactive events.

3. Enhanced Community Engagement 🤝: The NFT gated event platform facilitates deeper community engagement by organizing interactive events where creators can directly interact with their fans in real-time. This fosters a sense of connection, loyalty, and personalization.

4. Decentralized Storage 🌐: Storing content on Filecoin ensures durability, security, and resilience. This decentralized approach enhances data integrity and protects against potential issues related to content takedowns or platform policy changes.

The combination of these features makes CreatorConnect a powerful platform for creators to monetize their content, engage with their audience, and establish a sustainable career in the digital landscape.

