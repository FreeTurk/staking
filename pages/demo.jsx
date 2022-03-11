import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Script from 'next/script'
import Particles from "react-tsparticles";
import { useMoralis, useWeb3Transfer, enableWeb3, isWeb3Enabled, web3 } from "react-moralis";
import  { Moralis } from "moralis";
import React, { useEffect, useState } from 'react';
import { initializeApp, firebase } from "firebase/app";
import WalletConnectProvider from '@walletconnect/web3-provider';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, where, deleteDoc } from "firebase/firestore"
import {isMobile} from 'react-device-detect';
import { Line, Circle } from 'rc-progress';
import percentValue from 'percent-value';



export default function Home() {
    const [timeLeft, setTimeLeft] = useState(0)
    const [bal, setBal] = useState()
    const [stakedAmount, setStakes] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [usrAdd, setUsrAdd] = useState(0)
    const [isValVisible, setValVisible] = useState(false)
    const { authenticate, account } = useMoralis();

    console.log(serverTimestamp())
    const firebaseConfig = {
        apiKey: "AIzaSyAZgon2VEA4J2GN_fP8x1NRYVU6ZiUkXV0",
        authDomain: "staking-dee0b.firebaseapp.com",
        projectId: "staking-dee0b",
        storageBucket: "staking-dee0b.appspot.com",
        messagingSenderId: "252348056976",
        appId: "1:252348056976:web:43cb78f5ff6b3fd6681f15",
        measurementId: "G-877KX0SJ6N"
      };

    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app)

    const dbInstance = collection(database, 'stakers');

    const saveStake = () => {
        addDoc(dbInstance, {
            address: account,
            amount: JSON.parse(stakedAmount * 10 ** 18),
            createdAt: serverTimestamp()
        })
    }


    const particlesInit = (main) => {
        console.log(main);

        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      };

      const particlesLoaded = (container) => {
        console.log(container);
      };

      const ABI = [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "staker",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "stakedAmount",
                    "type": "uint256"
                }
            ],
            "name": "stakeStart",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "staker",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "stakedAmount",
                    "type": "uint256"
                }
            ],
            "name": "payStake",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
    ];

    var stakePay = BigInt(10 * 10 ** 18)

    const sendOptions = {
        contractAddress: "0xc658639FEAa313C4b6BD69C5Bf9300835E766535",
        functionName: "stakeStart",
        abi: ABI,
        params: {
          staker: account,
          stakedAmount: BigInt(stakedAmount * 10 ** 18),
        },
      };

    const payOptions = {
      contractAddress: "0xc658639FEAa313C4b6BD69C5Bf9300835E766535",
      functionName: "payStake",
      abi: ABI,
      params: {
        staker: account,
        stakedAmount: BigInt(Math.round((usrAdd / 111) * 100)),
      },
    };

    const getBalance = {
      contractAddress: "0xc658639FEAa313C4b6BD69C5Bf9300835E766535",
      functionName: "balanceOf",
      abi: ABI,
      params: {
        account: account,
      },
    }

    //This is half of the code.
