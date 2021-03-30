import { BigInt } from "@graphprotocol/graph-ts"
import {
  Attestations,
  AttestationsRequested,
  AttestationIssuerSelected,
  AttestationCompleted,
  Withdrawal,
  AttestationExpiryBlocksSet,
  AttestationRequestFeeSet,
  SelectIssuersWaitBlocksSet,
  MaxAttestationsSet,
  RegistrySet,
  OwnershipTransferred
} from "../generated/Attestations/Attestations"
import { Attestation } from "../generated/schema"

export function handleAttestationsRequested(
  event: AttestationsRequested
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Attestation.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Attestation(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.requestCount = BigInt.fromI32(0)
    entity.completeCount = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.requestCount = entity.requestCount + event.params.attestationsRequested

  // Entity fields can be set based on event parameters
  entity.identifier = event.params.identifier
  entity.account = event.params.account

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.validatorSignerAddressFromCurrentSet(...)
  // - contract.initialized(...)
  // - contract.checkProofOfPossession(...)
  // - contract.getEpochNumberOfBlock(...)
  // - contract.getVerifiedSealBitmapFromHeader(...)
  // - contract.validatorSignerAddressFromSet(...)
  // - contract.hashHeader(...)
  // - contract.minQuorumSizeInCurrentSet(...)
  // - contract.registry(...)
  // - contract.maxAttestations(...)
  // - contract.numberValidatorsInCurrentSet(...)
  // - contract.selectIssuersWaitBlocks(...)
  // - contract.getBlockNumberFromHeader(...)
  // - contract.owner(...)
  // - contract.isOwner(...)
  // - contract.getEpochNumber(...)
  // - contract.numberValidatorsInSet(...)
  // - contract.attestationExpiryBlocks(...)
  // - contract.attestationRequestFees(...)
  // - contract.getEpochSize(...)
  // - contract.minQuorumSize(...)
  // - contract.pendingWithdrawals(...)
  // - contract.fractionMulExp(...)
  // - contract.getParentSealBitmap(...)
  // - contract.getUnselectedRequest(...)
  // - contract.getAttestationIssuers(...)
  // - contract.getAttestationStats(...)
  // - contract.batchGetAttestationStats(...)
  // - contract.getAttestationState(...)
  // - contract.getCompletableAttestations(...)
  // - contract.getAttestationRequestFee(...)
  // - contract.getMaxAttestations(...)
  // - contract.validateAttestationCode(...)
  // - contract.lookupAccountsForIdentifier(...)
}

export function handleAttestationIssuerSelected(
  event: AttestationIssuerSelected
): void {}

export function handleAttestationCompleted(event: AttestationCompleted): void {
  let entity = Attestation.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Attestation(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.completeCount = BigInt.fromI32(0)
    entity.requestCount = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.completeCount = entity.completeCount + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.identifier = event.params.identifier
  entity.account = event.params.account

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleWithdrawal(event: Withdrawal): void {}

export function handleAttestationExpiryBlocksSet(
  event: AttestationExpiryBlocksSet
): void {}

export function handleAttestationRequestFeeSet(
  event: AttestationRequestFeeSet
): void {}

export function handleSelectIssuersWaitBlocksSet(
  event: SelectIssuersWaitBlocksSet
): void {}

export function handleMaxAttestationsSet(event: MaxAttestationsSet): void {}

export function handleRegistrySet(event: RegistrySet): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
