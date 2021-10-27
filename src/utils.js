import { utils } from "web3";

export const shortenAddress = (address) =>
  address ? address.slice(0, 4) + "..." + address.slice(-4) : "";

export const formatWei = (wei) => parseFloat(utils.fromWei(wei)).toFixed(3);
