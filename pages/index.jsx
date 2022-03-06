import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Script from 'next/script'
import Particles from "react-tsparticles";
import { useMoralis, useWeb3Transfer, enableWeb3, isWeb3Enabled, web3 } from "react-moralis";
import  { Moralis } from "moralis";
import React, { useState } from 'react';
import { initializeApp, firebase } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"



export default function Home() {
    const { authenticate, account } = useMoralis();
    console.log(serverTimestamp())
    var stakeAmount = 10
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
            amount: stakeAmount,
            createdAt: serverTimestamp()
        })
    }

    const [isMenu, setIsMenu] = useState(false);

    const particlesInit = (main) => {
        console.log(main);
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      };
    
      const particlesLoaded = (container) => {
        console.log(container);
      };
      const { fetch, error, isFetching } = useWeb3Transfer({
        amount: Moralis.Units.ETH(0.001),
        receiver: "0xB6A70F2d7e7D16e739eCa7c263b1eF9F45C4c3Bb",
        type: "native",
      });
      
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
                    "name": "stakeamount",
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
                    "name": "stakeamount",
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
    
    const sendOptions = {
        contractAddress: "0x3E353245Cc50F27C781F4f15c46f022fb861ba5C",
        functionName: "stakeStart",
        abi: ABI,
        params: {
          staker: account,
          stakeamount: stakeAmount,
        },
      };

      const payOptions = {
        contractAddress: "0x3E353245Cc50F27C781F4f15c46f022fb861ba5C",
        functionName: "stakeStart",
        abi: ABI,
        params: {
          staker: account,
          stakeamount: stakePay,
        },
      };  
    
    async function stakeSend() {
        saveStake();
        const transaction = await Moralis.executeFunction(sendOptions);
        console.log(transaction.hash)
        await transaction.wait();
    }

    async function payStake() {
        saveStake();
        const transaction = await Moralis.executeFunction(sendOptions);
        console.log(transaction.hash)
        await transaction.wait();
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
                <div className="text-4xl">
                    Start Staking!
                </div>
                <div>
                    fucking
                </div>
                <div id="logging">
                {account ? <button className="drop-shadow-md p-4 rounded-md transition-all overflow-hidden text-ellipsis max-w-[200px] hover:scale-110 bg-blue-900">{account}</button> : <button onClick={authenticate} className="drop-shadow-md p-4 rounded-md transition-all hover:scale-110 bg-blue-900">Connect</button>}
                </div>
            </div>
            <div className="items-center justify-around drop-shadow-xl bg-blue-700 w-full lg:w-1/3 lg:max-w-sm lg:h-full h-96 flex flex-col p-8 rounded-xl">
                <div>
                    hello
                </div>
                <div>
                    <input className='bg-blue-900 rounded-md p-4' type="number" />
                </div>
                <div>
                    {account ? <button className='drop-shadow-md p-4 rounded-md transition-all overflow-hidden text-ellipsis max-w-[240px] hover:scale-110 bg-blue-900' onClick={stakeSend()}>Stake!</button> : <div>Please connect first...</div>}
                </div>
            </div>
            <div className="items-center justify-around drop-shadow-xl bg-blue-700 w-full lg:w-1/3 lg:max-w-sm lg:h-full h-96 flex flex-col p-8 rounded-xl">
                <div>
                {error && <div>error</div>}
      <button onClick={() => fetch()} disabled={isFetching}>
        Transfer
      </button>
                </div>
                <div>
                    fucking
                </div>
                <div>
                    world
                </div>
            </div>
        </div>
    </div>
  )
}
