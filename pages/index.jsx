import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Script from 'next/script'
import Particles from "react-tsparticles";
import { useMoralis, useWeb3Transfer, enableWeb3, isWeb3Enabled, web3 } from "react-moralis";
import  { Moralis } from "moralis";
import React, { useState } from 'react';
import { initializeApp, firebase } from "firebase/app";
import WalletConnectProvider from '@walletconnect/web3-provider';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, where, deleteDoc } from "firebase/firestore"



export default function Home() {
    const [bal, setBal] = useState('')
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
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
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
    
  return (
    <div className="h-full w-full flex justify-center lg:items-center">
         <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#343657",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 2,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 40,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 3,
          },
        },
        detectRetina: true,
      }}
    />
        <div className="py-16 lg:p-0 text-white flex absolute gap-16 flex-col lg:flex-row w-3/4 lg:h-2/4 justify-center items-center transition-all">
            <div className="items-center justify-around drop-shadow-xl bg-blue-700 w-full lg:w-1/3 lg:max-w-sm lg:h-full h-96 flex flex-col p-8 rounded-xl">
                <div className="text-4xl font-bold">
                    Start Staking!
                </div>
                <div className='text-xl text-center'>
                    Welcome to Trueholds staking! <br />
                    200% APY, 7 Day Lock
                </div>
                <div id="logging">
                {account ? <button className="drop-shadow-md p-4 rounded-md transition-all overflow-hidden text-ellipsis max-w-[200px] hover:scale-110 bg-blue-900">{account}</button> : <button onClick={async function log() {
                  console.log(bal)
                  await Moralis.authenticate({ 
                    provider: "walletconnect"
                })
                  await setBal(await Moralis.executeFunction(getBalance))}} className="drop-shadow-md p-4 rounded-md transition-all hover:scale-110 bg-blue-900">Connect</button>}
                </div>
            </div>
            <div className="items-center justify-around drop-shadow-xl bg-blue-700 w-full lg:w-1/3 lg:max-w-sm lg:h-full h-96 flex flex-col p-8 rounded-xl">
                <div className='text-xl text-center'>
                    To start staking, enter an amount and press &quot;Stake!&quot;
                </div>
                <div>
                  <div>{bal}</div>
                    <input onChange={event => setStakes(event.target.value)} className='bg-blue-900 rounded-md p-4' type="number" />
                </div>
                <div>
                    {account ? <button className='drop-shadow-md p-4 rounded-md transition-all overflow-hidden text-ellipsis max-w-[240px] hover:scale-110 bg-blue-900' onClick={
                    async() => {

                        const q = query(dbInstance, where("address", "==", account))
                        const querySnapshot = await getDocs(q);

                        console.log(querySnapshot.docs.length)

                        if (querySnapshot.docs.length == 0) {
                        if (BigInt(stakedAmount)) {
                                const transaction = await Moralis.executeFunction(sendOptions);
                                console.log(transaction.hash)
                                await transaction.wait();
                                saveStake();
                        } else if (!BigInt(stakedAmount)) {
                            alert("Please enter a value")
                        }
                    } else {
                        alert("You have staked before")
                    }
                    }}>Stake!</button> : <div>Please connect first...</div>}
                </div>
            </div>
            <div className="items-center justify-around drop-shadow-xl bg-blue-700 w-full lg:w-1/3 lg:max-w-sm lg:h-full h-96 flex flex-col p-8 rounded-xl">
                <div className='text-xl text-center'>
                    Here, you can check your staked coins.
                </div>
                <div>
                    { isValVisible ? <div className='text-center'>You have {usrAdd / 10 ** 18} coins staked. <br /> <br /> That makes about {Math.round(((usrAdd / 100) * 111) / 10 ** 18)} after staking!</div> : <div>Seems like you haven&apos;t staked yet...</div>}
                </div>
                <div className='flex gap-4 flex-col'>
                    {account ? <button className='drop-shadow-md p-4 rounded-md transition-all overflow-hidden text-ellipsis max-w-[240px] hover:scale-110 bg-blue-900' onClick={async() => {
                    const q = query(dbInstance, where("address", "==", account))
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const obj = (doc.id, "=>", doc.data());
                    console.log(doc.id, "=>", doc.data())
                    console.log(obj.amount);
                    console.log(obj.createdAt.seconds)
                    console.log(Math.round((new Date()).getTime() / 1000))

                    setValVisible(true)
                    setUsrAdd(obj.amount)
                    
                    if (Math.round((new Date()).getTime() / 1000) - obj.createdAt.seconds < 604800) {
                        setIsReady(false)
                    } else {
                        setIsReady(true)
                    }

                    });
                }}>Check</button> : <div>Please connect first!..</div>}
                {account && isReady ? <button className='drop-shadow-md p-4 rounded-md transition-all overflow-hidden text-ellipsis max-w-[240px] hover:scale-110 bg-blue-900' onClick={async() => {
                    const q = query(dbInstance, where("address", "==", account))
                    const querySnapshot = await getDocs(q);
                    const transaction = await Moralis.executeFunction(payOptions);
                    console.log(transaction.hash)
                    await transaction.wait();
                    querySnapshot.forEach((doc) => {
                    deleteDoc(doc.ref);
                    })
                }}>Take the cash</button> : <div>Your coins aren&apos;t ready yet!</div>}
                </div>
            </div>
        </div>
    </div>
  )
}
