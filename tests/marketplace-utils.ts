import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Buy, Cancel, List } from "../generated/Marketplace/Marketplace"

export function createBuyEvent(
  buyer: Address,
  owner: Address,
  tokenId: BigInt,
  nftContractAddress: Address,
  price: BigInt
): Buy {
  let buyEvent = changetype<Buy>(newMockEvent())

  buyEvent.parameters = new Array()

  buyEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  buyEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  buyEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  buyEvent.parameters.push(
    new ethereum.EventParam(
      "nftContractAddress",
      ethereum.Value.fromAddress(nftContractAddress)
    )
  )
  buyEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return buyEvent
}

export function createCancelEvent(
  owner: Address,
  tokenId: BigInt,
  nftContractAddress: Address
): Cancel {
  let cancelEvent = changetype<Cancel>(newMockEvent())

  cancelEvent.parameters = new Array()

  cancelEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  cancelEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  cancelEvent.parameters.push(
    new ethereum.EventParam(
      "nftContractAddress",
      ethereum.Value.fromAddress(nftContractAddress)
    )
  )

  return cancelEvent
}

export function createListEvent(
  owner: Address,
  tokenId: BigInt,
  nftContractAddress: Address,
  price: BigInt
): List {
  let listEvent = changetype<List>(newMockEvent())

  listEvent.parameters = new Array()

  listEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  listEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  listEvent.parameters.push(
    new ethereum.EventParam(
      "nftContractAddress",
      ethereum.Value.fromAddress(nftContractAddress)
    )
  )
  listEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return listEvent
}
