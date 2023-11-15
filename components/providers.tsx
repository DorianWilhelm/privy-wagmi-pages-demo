import { ChakraProvider } from "@chakra-ui/react";
import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { AvailableChains, PreferredChain } from "@/chain";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const wagmiChainsConfig = configureChains(AvailableChains, [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
  ]);

  useEffect(() => {
    console.log({ AvailableChains, PreferredChain, wagmiChainsConfig });
  }, [wagmiChainsConfig]);

  return (
    <ChakraProvider>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
        config={{
          loginMethods: ["wallet", "google", "email"], // "email", "google", "twitter"
          defaultChain: PreferredChain,
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
          supportedChains: AvailableChains,
          appearance: {
            theme: "dark",
            accentColor: "#676FFF",
            showWalletLoginFirst: true,
          },
        }}
      >
        <PrivyWagmiConnector wagmiChainsConfig={wagmiChainsConfig}>
          {children}
        </PrivyWagmiConnector>
      </PrivyProvider>
    </ChakraProvider>
  );
}
