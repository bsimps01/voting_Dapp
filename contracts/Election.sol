pragma solidity ^0.5.16;

contract Election {
    // Candidate Model
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Fetch candidates
    mapping(uint => Candidate) public candidates;

    // Store count of how many candidates there are
    uint public candidatesCount;

    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}