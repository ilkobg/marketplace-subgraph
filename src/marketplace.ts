import {
  Buy as BuyEvent,
  Cancel as CancelEvent,
  List as ListEvent,
} from "../generated/Marketplace/Marketplace";
import {
  Buy,
  Cancel,
  List,
  TotalValue,
  NFTContract,
  NFT,
} from "../generated/schema";
import { store } from "@graphprotocol/graph-ts";

export function removeElement(array: string[], value: string): string[] {
  let newArray: string[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] != value) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

export function handleBuy(event: BuyEvent): void {
  let buyEntity = new Buy(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  buyEntity.buyer = event.params.buyer;
  buyEntity.owner = event.params.owner;
  buyEntity.tokenId = event.params.tokenId;
  buyEntity.nftContractAddress = event.params.nftContractAddress;
  buyEntity.price = event.params.price;

  let totalValueEntity = TotalValue.load(buyEntity.nftContractAddress);

  if (totalValueEntity != null) {
    let newTotalValue = totalValueEntity.totalValue + buyEntity.price;
    totalValueEntity.totalValue = newTotalValue;
  } else {
    totalValueEntity = new TotalValue(buyEntity.nftContractAddress);
    totalValueEntity.totalValue = buyEntity.price;
  }

  totalValueEntity.save();

  buyEntity.blockNumber = event.block.number;
  buyEntity.blockTimestamp = event.block.timestamp;
  buyEntity.transactionHash = event.transaction.hash;

  let nftContract = NFTContract.load(buyEntity.nftContractAddress);

  if (nftContract != null) {
    let remaining = removeElement(
      nftContract.nftIds,
      buyEntity.tokenId.toString()
    );

    nftContract.nftIds = remaining;
    nftContract.save();
  }

  store.remove("NFT", buyEntity.tokenId.toString());

  buyEntity.save();
}

export function handleCancel(event: CancelEvent): void {
  let cancelEntity = new Cancel(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  cancelEntity.owner = event.params.owner;
  cancelEntity.tokenId = event.params.tokenId;
  cancelEntity.nftContractAddress = event.params.nftContractAddress;

  cancelEntity.blockNumber = event.block.number;
  cancelEntity.blockTimestamp = event.block.timestamp;
  cancelEntity.transactionHash = event.transaction.hash;

  let nftContract = NFTContract.load(cancelEntity.nftContractAddress);

  if (nftContract != null) {
    let remaining = removeElement(
      nftContract.nftIds,
      cancelEntity.tokenId.toString()
    );

    nftContract.nftIds = remaining;
    nftContract.save();
  }

  store.remove("NFT", cancelEntity.tokenId.toString());

  cancelEntity.save();
}

export function handleList(event: ListEvent): void {
  let listEntity = new List(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  listEntity.owner = event.params.owner;
  listEntity.tokenId = event.params.tokenId;
  listEntity.nftContractAddress = event.params.nftContractAddress;
  listEntity.price = event.params.price;

  listEntity.blockNumber = event.block.number;
  listEntity.blockTimestamp = event.block.timestamp;
  listEntity.transactionHash = event.transaction.hash;

  let nftContract = NFTContract.load(listEntity.nftContractAddress);
  if (nftContract == null) {
    // No NFTs for this contract yet
    nftContract = new NFTContract(listEntity.nftContractAddress);
    nftContract.nftIds = [];
  }

  let nft = new NFT(listEntity.tokenId.toString());
  nft.price = listEntity.price;
  nft.save();

  let current_ids = nftContract.nftIds;
  current_ids.push(listEntity.tokenId.toString());
  let new_ids = current_ids;
  nftContract.nftIds = new_ids;
  nftContract.save();

  listEntity.save();
}