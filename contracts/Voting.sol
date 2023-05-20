// SPDX-License-Identifier: MIT
pragma solidity <0.9.0;



contract Voting {
    
    uint256 candidateId = 1;
    uint public phaseId=0;

    address public ballotOfficialAddress;
    string public ballotOfficialName;
    string public proposal;
    uint public PhaseTime;

    enum State { Registration, Voting, Ended}
    State public state;
    
    struct Voter {
        address ethAddress;
        bool registered;
    }
    
    struct Candidate {
        uint id;
        string name;
        string party;
        string experince;
        uint256 age;
        uint256 voteCount;
    }

    event AddedCandidate(
        uint id,
        string name,
        string party,
        string experince,
        uint256 age,
        uint256 voteCount
    );

    event Voted(
        uint voteCount,
        address voter,
        uint candidateId
    );

    event PhaseChanged(
        string phase,
        uint phaseId

    );

    mapping(uint256 => Candidate) CandidateMapping;

    mapping(address => Voter) voterMapping;

    modifier onlyOfficial(){
        require(msg.sender == ballotOfficialAddress);
        _;
    }
    modifier inState(State _state){
        require(state == _state);
        _;
    }

    constructor(string memory _ballotOfficialName,string memory _proposal){
        ballotOfficialAddress = msg.sender;
        ballotOfficialName = _ballotOfficialName;
        proposal = _proposal;

        state = State.Registration;
    }

    function registerVoter(address ethAddress) public {
        voterMapping[ethAddress].ethAddress = ethAddress;
        voterMapping[ethAddress].registered = true;
    }

    function addCandidate(
        string memory name,
        string memory party,
        string memory experince,
        uint256 age,
        uint256 voteCount
    ) public 
    inState(State.Registration)
    {
        CandidateMapping[candidateId].id=candidateId;
        CandidateMapping[candidateId].name = name;
        CandidateMapping[candidateId].party = party;
        CandidateMapping[candidateId].experince = experince;
        CandidateMapping[candidateId].age = age;
        CandidateMapping[candidateId].voteCount = 0;

        emit AddedCandidate(candidateId,name, party, experince, age, voteCount);

        candidateId+=1;

    }
    function setVotingTime(uint _phasetime)
    public
    onlyOfficial
    {
        PhaseTime = block.timestamp + _phasetime;
    }
    
    function changePhase(uint pId)
    public
    onlyOfficial
    {

        if(pId==1){
            phaseId=1;
            emit PhaseChanged("Voting Phase",1);
        }
        else if(pId==2){
            if(PhaseTime != 0){
                require(block.timestamp >= PhaseTime);
            }
            phaseId=2;
            emit PhaseChanged("Result Phase",2);
        }
    }


    function getPhaseId() public view returns (uint){
        return phaseId;
    }
    
    function castVote(uint cid, uint pid) public{
        require(voterMapping[msg.sender].registered);
        require(cid<=candidateId && cid>=0);
        require(pid==1);
        CandidateMapping[cid].voteCount+=1;

        emit Voted(CandidateMapping[cid].voteCount,msg.sender,cid);
        
        voterMapping[msg.sender].registered=false;
    }
}

