# NFT Marketplace Indexer

## Overview

I’m using TheGraph project as indexer for the Marketplace, and more specifically I’ve created a subgraph for my Marketplace.

The subgraph analyzes the smart contract and extract all events with their parameters. For this to happen, the contract must be deployed to pubic testnet and verified via Etherscan.

The subgraph is responsible for reading blocks, handling all emitted events and storing them. This data can be accessed later with GraphQL queries, as we are reading from database.

The events and their data are represented as entities and there is custom logic in the events handlers - we can define what to happen with this data before it is saved.
One example is that I’ve created additional property to the List event entity, `isActive`, which represents is the current listing is active. On Buy or Cancel event, this property is set to false.

Here in the subgraph is important to keep all events historically and not delete them. The consumers of the subgraph can filter by isActive property to get only active listings, for example.

## Creation of the subgraph

#### Requirements
- Graph CLI: `npm install -g @graphprotocol/graph-cli`

Following official TheGraph documentation is pretty straightforward:
[Quick Start for subgraph init](https://thegraph.com/docs/en/cookbook/quick-start/)
[Creating a subgraph](https://thegraph.com/docs/en/developing/creating-a-subgraph/)

Main points are:
- Initializing the subgraph - One should provide several options, such as desired network, contract address, constract ABI, start block, etc.
- Writing the subgraph logic - After the initializing step from exisiting contract, the subgraph provides basic handlers for all events. One can write custom logic here.
- Deploying the subgraph to Subgraph Studio:
```
graph codegen
graph build

graph auth --studio <DEPLOY_KEY>
graph deploy --studio <SUBGRAPH_SLUG>
```
- Publishing the subgraph from Subgraph Studio to become publicly available - you need some GRT tokens for this operation.

## Working with the subgraph

Subgraph Studio provides query URLs, used to communicate with the subgraph externally.

My subgraph is published and can be used with the development query URL:
https://api.studio.thegraph.com/query/48381/nftmarketplace/version/latest
