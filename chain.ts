import {
  base,
  baseGoerli,
  Chain,
  foundry,
  goerli,
  mainnet,
} from "wagmi/chains";

type ChainEnv = "local" | "testnet" | "mainnet";

export const SUPPORTED_CHAINS = {
  local: [foundry],
  testnet: [goerli, baseGoerli],
  mainnet: [mainnet, base],
};

export const AvailableChains: Chain[] =
  SUPPORTED_CHAINS[process.env.NEXT_PUBLIC_CHAIN_ENV as ChainEnv];
export const PreferredChain: Chain = AvailableChains[0];
