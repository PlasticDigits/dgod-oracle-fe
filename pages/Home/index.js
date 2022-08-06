
import React, { Component, useState, useEffect } from 'react';
import Web3ModalButton from '../../components/Web3ModalButton';
import Footer from '../../components/Footer';
import "./index.module.scss";
import { useEthers, useContractFunction, useCall, useTokenBalance, useTokenAllowance, useEtherBalance  } from '@usedapp/core'
import {useCoingeckoPrice } from '@usedapp/coingecko';
import { utils, Contract, constants } from 'ethers'
import useCountdown from "../../hooks/useCountdown";
import DggLogo from '../../public/static/assets/logo.png';
import LogoReflect from '../../public/static/assets/images/logoreflect.png';
import DggMascot from '../../public/static/assets/images/Refined Mascot Full.png';
import PoweredByCz from '../../public/static/assets/images/poweredbycz.png';
import BackgroundImage from '../../public/static/assets/images/bg.jpg';
import OracleBanner from '../../public/static/assets/images/oracleBannerV2.png';
import TopVideo from '../../public/static/assets/vids/bgv3.mp4';
import { shortenAddress, useLookupAddress} from '@usedapp/core'
import IERC20Abi from "../../abi/IERC20.json";
import DgodAbi from "../../abi/Dgod.json";
import DgodLockAbi from "../../abi/Dgod.json";
import AutoRewardPoolAbi from "../../abi/AutoRewardPool.json";
import {  ADDRESS_DOGE, ADDRESS_DGOD, ADDRESS_AUTO_REWARD_POOL, ADDRESS_DGOD_LOCK, ADDRESS_DGODCZUSD_PAIR} from '../../constants/addresses';
const { formatEther, parseEther, Interface } = utils;

const DgodInterface = new Interface(DgodAbi);
const CONTRACT_DGOD = new Contract(ADDRESS_DGOD,DgodInterface);

const AutoRewardPoolInterface = new Interface(AutoRewardPoolAbi);
const CONTRACT_AUTO_REWARD_POOL = new Contract(ADDRESS_AUTO_REWARD_POOL,AutoRewardPoolInterface);

const DgodLockInterface = new Interface(DgodLockAbi);
const CONTRACT_DGOD_LOCK = new Contract(ADDRESS_DGOD_LOCK,DgodLockInterface);

const Ierc20Interface = new Interface(IERC20Abi);
const CONTRACT_DOGE = new Contract(ADDRESS_DOGE,Ierc20Interface);
const CONTRACT_DGODCZUSD_PAIR = new Contract(ADDRESS_DGODCZUSD_PAIR,Ierc20Interface);



const displayWad = (wad)=>!!wad ? Number(formatEther(wad)).toFixed(2) : "...";

function Home() {
  
  const { account, chainId } = useEthers();
  console.log(chainId)
  


  return (<>
    <section id="top" className="hero has-text-centered">
      <div className="m-0 p-0" style={{position:"relative",width:"100%",height:"7.5em"}}>
        <video autoPlay loop muted style={{position:"absolute",objectFit:"cover",minWidth:"1920px",width:"100vw",left:"50%",top:"0",maxHeight:"7.5em",transform: "translateX(-50%)", backgroundColor:"rgb(50,50,50)"}}>
          <source src={TopVideo} type="video/mp4" />
        </video>
        <Web3ModalButton className="mt-5 mb-5" />
        <p className='has-text-grey-lighter is-size-7 is-dark' style={{position:"absolute", bottom:"0",left:"0",right:"0",zIndex:"2", backgroundColor:"rgba(0,10,40,0.8)"}}>
          <span className="mr-2 mb-0 is-inline-block has-text-left" style={{width:"11em"}}>Network: {!!account ? (chainId == 56 ? (<span className="has-text-success">✓ BSC</span>) : <span className="has-text-error has-text-danger">❌NOT BSC</span>) : "..."}</span>
          <span className="mt-0 is-inline-block has-text-left" style={{width:"11em"}}>Wallet: {!!account ? shortenAddress(account) : "..."}</span>
        </p>
      </div>
      <div className="m-0 " style={{background:"linear-gradient(301deg, rgba(1,31,23,1) 0%, rgba(5,24,40,1) 100%)",paddingBottom:"5em",paddingTop:"1em"}}>
      <img style={{maxWidth:"480px",width:"100vw",marginLeft:"auto",marginRight:"auto"}} src={OracleBanner} />
      <div className="columns is-centered is-vcentered is-multiline pl-2 pr-2 mb-5">
        <div className="stat stat-doge">
          <span className="stat-title">$0.00k</span>
          <span className="stat-content">Total Dogecoin Paid</span>
        </div>
        <div className="stat stat-doge">
          <span className="stat-title">0.00m</span>
          <span className="stat-content">Total Dogecoin Distributed</span>
        </div>
        <div className="stat stat-doge-small">
          <span className="stat-title">0.00m</span>
          <span className="stat-content">Dogecoin Rewards Today</span>
        </div>
        <div className="stat stat-dgod">
          <span className="stat-title">$0.00</span>
          <span className="stat-content">DogeGod Price</span>
        </div>
        <div className="stat stat-dgod">
          <span className="stat-title">00.00%</span>
          <span className="stat-content">DogeGod % Increase</span>
        </div>
        <div className="stat stat-dgod">
          <span className="stat-title">$0.00</span>
          <span className="stat-content">DogeGod Floor Price</span>
        </div>
        <div className="stat stat-dgod">
          <span className="stat-title">00.00%</span>
          <span className="stat-content">Floor % Increase</span>
        </div>
        <div className="stat stat-dgod-small">
          <span className="stat-title">$0.00k</span>
          <span className="stat-content">Total DogeGod Burned</span>
        </div>
        <div className="stat stat-dgod-small">
          <span className="stat-title">0.00m</span>
          <span className="stat-content">DogeGod Burned Today</span>
        </div>
        <div className="stat stat-dgod-small">
          <span className="stat-title">00.00%</span>
          <span className="stat-content">DogeGod APR</span>
        </div>
        <div className="stat stat-dgod-small">
          <span className="stat-title">$0.00k</span>
          <span className="stat-content">DogeGod MCAP</span>
        </div>
        <div className="stat stat-dgod-small">
          <span className="stat-title">00.00%</span>
          <span className="stat-content">Liquidity % of MCAP</span>
        </div>
      </div>
        <h3 className="is-size-3 m-3 mt-5">
          YOUR <span style={{color:"#FFCB16"}}>WALLET</span>
          <span className="is-size-5 is-block" style={{marginTop:"-0.25em"}}>{shortenAddress(account)}</span>
        </h3>
          
      <div className="columns is-vcentered is-centered is-multiline pl-5 pr-5 mb-5">
        <div className="stat stat-doge">
          <span className="stat-title">$0.00k</span>
          <span className="stat-content">Total Dogecoin Earned</span>
        </div>
        <div className="stat stat-doge">
          <span className="stat-title">0.00m</span>
          <span className="stat-content">Dogecoin Per Day</span>
        </div>
        <div className="stat stat-doge">
          <span className="stat-title">0.00m</span>
          <span className="stat-content">Dogecoin Held</span>
        </div>
        <div className="stat stat-doge-small">
          <span className="stat-title">0.00m</span>
          <span className="stat-content">Pending Dogecoin Reward</span>
          <button className='button is-rounded mt-1 is-small is-dark' style={{maxWidth:"10em", position:"absolute",bottom:"-1.5em", right:"0em",backgroundColor:"rgba(0,10,40,1)",border:"solid #126a85 2px"}}>Manual Claim</button>
        </div>
        <div className="stat stat-dgod">
          <span className="stat-title">0.00m</span>
          <span className="stat-content">DogeGod Held</span>
        </div>
        <div className="stat stat-dgod-small">
          <span className="stat-title">0.00m</span>
          <span className="stat-content">DogeGod Vesting</span>
        </div>
        <div className="stat stat-dgod-small">
          <span className="stat-title">00d00m00s</span>
          <span className="stat-content">Next Vesting Unlock</span>
          <button className='button is-rounded mt-1 is-small is-dark' style={{maxWidth:"10em", position:"absolute",bottom:"-1.5em", right:"0em",backgroundColor:"rgba(0,10,40,1)",border:"solid #126a85 2px"}}>Withdraw</button>
        </div>

      </div>
      </div>
    </section>
    
    <Footer />
    
  </>);
}

export default Home
