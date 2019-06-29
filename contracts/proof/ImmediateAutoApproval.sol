pragma solidity ^0.5.0;

import "contracts/proof/Fin4BaseProofType.sol";

contract ImmediateAutoApproval is Fin4BaseProofType {

  constructor()
    Fin4BaseProofType("ImmediateAutoApproval", "Sends the approval immediately, no checks")
    public {}

    function initProofSubmission(address tokenAdrToReceiveProof, uint claimId) public returns(bool) {
        // _sendApproval(tokenAdrToReceiveProof, msg.sender);
        return true;
    }

}