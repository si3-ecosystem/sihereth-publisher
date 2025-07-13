const Text = () => {
  return (
    <div className="px-4 py-8 bg-purple-primary text-xs">
      <div className="max-w-[90rem] mx-auto space-y-4 text-justify md:text-center leading-4">
        <p className="font-dm-sans text-sm">
          You are viewing an ENS domain, which is a distributed and open naming system based on the Ethereum blockchain.
          This website is hosted with Pinata on the IPFS, or InterPlanetary File System, which is a peer-to-peer file
          sharing network. The .link domain extension is a privacy-preserving ENS gateway for resolving/accessing ENS
          records/domains & IPFS/internet 3.0 content. For a complete Web3 experience, we recommend viewing this site
          with a Metamask extension or Brave browser.
        </p>
        <p className="uppercase font-medium">
          This site has been built by SI&lt;3&gt; in support of the decentralized and democratized web.
        </p>
      </div>
    </div>
  );
};

export default Text;
