/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
// eslint-disable-next-line no-unused-vars
const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const app = express();

exports.addContract = functions.https.onRequest(async (req, res) => {
  const data = req.body;
  const newContract = await db.collection("contracts").add(data);
  res.send("Data added with ID: " + newContract.id);
});

exports.getLatestContractAddress = functions.https.onRequest(async (req, res) => {
  const snapshot = await db.collection("contracts").get();
  const dataList = [];
  snapshot.forEach((doc) => {
    dataList.push(doc.data());
  });
  let contractAddress = 0;
  let time = "1000-08-24 16:02:16.646361";
  dataList.forEach((doc) => {
    if (doc.time > time) {
      time = doc.time;
      contractAddress = doc.contract_address;
    }
  });
  res.header("Access-Control-Allow-Origin", "hhtp://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send(contractAddress);
});

exports.addMintNFT = functions.https.onRequest(async (req, res) => {
  const data = req.body;
  const newContract = await db.collection("mint-nft").add(data);
  res.send("Data added with ID: " + newContract.id);
});

exports.addTransferNFT = functions.https.onRequest(async (req, res) => {
  const data = req.body;
  const newContract = await db.collection("transfer-nft").add(data);
  res.send("Data added with ID: " + newContract.id);
});

exports.getNFTContracts = functions.https.onRequest(async (req, res) => {
  const snapshot = await db.collection("contracts").get();
  const dataList = [];
  snapshot.forEach((doc) => {
    dataList.push(doc.data());
  });
  res.send(dataList);
});

exports.getMintNFT = functions.https.onRequest(async (req, res) => {
  const snapshot = await db.collection("mint-nft").get();
  const dataList = [];
  snapshot.forEach((doc) => {
    dataList.push(doc.data());
  });
  res.send(dataList);
});

exports.getTransferNFT = functions.https.onRequest(async (req, res) => {
  const snapshot = await db.collection("transfer-nft").get();
  const dataList = [];
  snapshot.forEach((doc) => {
    dataList.push(doc.data());
  });
  res.send(dataList);
});
