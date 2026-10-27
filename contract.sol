// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {

    struct Certificate {
        string name;
        string course;
        bool exists;
    }

    mapping(string => Certificate) public certificates;

    function addCertificate(string memory _id, string memory _name, string memory _course) public {
        certificates[_id] = Certificate(_name, _course, true);
    }

    function verifyCertificate(string memory _id) public view returns (string memory, string memory, bool) {
        Certificate memory cert = certificates[_id];
        return (cert.name, cert.course, cert.exists);
    }
}