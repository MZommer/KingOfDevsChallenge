import "./styles.css";

import { ethers } from "ethers";

/// Contains needed settings, as nodeUrl, contractAddress, and abi
import { settings } from "./settings";

/// This is a definition of the type of object returned by the contract
/// and is what the addProposalToList function expects as input parameter
import { Proposal } from "./Proposal";

/// Allows to add a proposal to the list
import { addProposalToList } from "./utils";

/// Empties the list
import { resetList } from "./utils";

/// Set the app loading status to true or false
import { setLoading } from "./utils";

const etherProvider = new ethers.providers.JsonRpcProvider(settings.nodeUrl);

const getProposals = async () => {
  const Ballot = new ethers.Contract(
    settings.contractAddress,
    settings.contractAbi,
    etherProvider
  );
  const proposalsCount = await Ballot.getProposalsCount();

  /*
  // slower solution
  resetList();
  for (let i = 0; i < proposalsCount; i++) {
    const proposal: Proposal = await Ballot.proposals(i);
    addProposalToList(proposal);
  }
  */

  // faster way, i send all the requests and then wait until they all finish
  const proposals = await Promise.all(
    Array(proposalsCount.toNumber())
      .fill()
      .map((_, id) => Ballot.proposals(id))
    // i would replace "Ballot.proposals" with a function for error handling, but i dont see it necesary here
  );
  resetList();
  proposals.forEach((proposal: Proposal) => addProposalToList(proposal));
};

const main = async () => {
  setLoading(true);
  await getProposals();
  setLoading(false);
};

main();
