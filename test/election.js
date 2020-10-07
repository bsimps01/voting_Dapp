var Election = artifacts.require('./Election.sol');

contract("Election", function(accounts) {
    var electionInstance;

    it("initializes with 2 candidates", function() {
        return Election.deployed().then(function(instance) {
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count, 2);
        });
    });

    it("initializes the candidates with the correct values", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[0], 1, "contains correct id");
            assert.equal(candidate[1], "Candidate 1", "contains correct name");
            assert.equal(candidate[2], 0, "contains correct # of votes");
            return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate[0], 2, "contains correct id");
            assert.equal(candidate[1], "Candidate 2", "contains correct name");
            assert.equal(candidate[2], 0, "contains correct # of votes");
        })
    });

    it("allows voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {
            electionInstance.Instance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, { from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "event was triggered");
            assert.equal(receipt.logs[0].event, "votedEvent", "correct event tyepe");
            assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "correct candidate id");
            return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
            assert(voted, "voter was marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "candidate's vote count goes up by 1");
        })
    });
});