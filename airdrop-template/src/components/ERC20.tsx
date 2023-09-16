"use client";

import {useState} from "react";
import {BaseError} from "viem";
import {
    Address,
    useAccount,
    useNetwork,
    useWaitForTransaction,
    useContractRead,
    usePrepareContractWrite,
    useContractWrite,
} from "wagmi";

import {ApolloProvider} from "react-apollo";
import {
    useErc20Allowance,
    useErc20Approve,
    useErc20BalanceOf,
    useErc20Name,
    useErc20Symbol,
    useErc20TotalSupply,
    useErc20Transfer,
    usePrepareErc20Approve,
    usePrepareErc20Transfer,
} from "../generated";
import {airdropAbi} from "./abi";
import {all} from "deepmerge";
import ApolloClient, {gql, InMemoryCache} from "apollo-boost";


export function ERC20() {
    const {address} = useAccount();
    const [tokenAddress, setTokenAddress] = useState<Address>(
        `0xC3126566A2D1214C927f96e7C7193F5EE0D3c762${""}`
    )
    const [airdropAddress, setAirdropAddress] = useState<Address>(
        `0x6483CdD37cDDb2ADA57198a3b41B24cdd1387b14${""}`
    )


    return (

        <div className="block items-center pt-2">
            <div>
                <label className="text-[#0A2540]">Airdrop Address: </label>
                <input
                    className="ml-[30px] appearance-none mx-5 w-120 bg-white text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white rounded-full"
                    onChange={(e) => setAirdropAddress(e.target.value as Address)}
                    value={airdropAddress}
                    style={{width: 400}}

                />
            </div>
            <div>
                <label className="text-[#0A2540]">Token Address: </label>
                <input
                    className="ml-[30px] appearance-none mx-5 w-120 bg-white text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white rounded-full"
                    onChange={(e) => setTokenAddress(e.target.value as Address)}
                    value={tokenAddress}
                    style={{width: 400}}

                />
            </div>
            <>
                <h3></h3>
                <div className="stats my-5 bg-[#635AFF]">
                    <div className="stat place-items-center">
                        <div className="stat-title text-gray-200">Name</div>
                        <Name tokenAddress={tokenAddress}></Name>
                        <div className="stat-desc"></div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-title text-gray-200">Balance</div>
                        <BalanceOf tokenAddress={tokenAddress} address={address}/>
                        <div className="stat-desc text-secondary"></div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-title text-gray-200">Total Supply</div>
                        <TotalSupply tokenAddress={tokenAddress}/>

                        <div className="stat-desc"></div>
                    </div>
                </div>


                <h3></h3>
                {/* Allowance Component Here */}
                <Allowance address={address} contractAddress={airdropAddress} tokenAddress={tokenAddress}/>

                {/* Airdrop Component Here */}
                <Airdrop
                    profileAddress={address}
                    contractAddress={airdropAddress}
                    tokenAddress={tokenAddress}
                ></Airdrop>


            </>
        </div>

    );
}

function Name({tokenAddress}: { tokenAddress: Address }) {
    const {data: name} = useErc20Name({
        address: tokenAddress
    });
    const {data: symbol} = useErc20Symbol({
        address: tokenAddress
    })
    return (
        <div className="text-white">
            {name} ({symbol})
        </div>
    );
}

function TotalSupply({tokenAddress}: { tokenAddress: Address }) {
    const {data: totalSupply} = useErc20TotalSupply({
            address: tokenAddress
        }
    )
    let tokenSupplyDecimal = 0
    if (totalSupply) {
        tokenSupplyDecimal = Number(totalSupply) / 1e18
    }
    return <div className="text-white">
        {tokenSupplyDecimal?.toString()} units
    </div>;
}

function BalanceOf({
                       address,
                       tokenAddress,
                   }: {
    address?: Address;
    tokenAddress: Address;
}) {
    const {data: balance} = useErc20BalanceOf({
        address: tokenAddress,
        args: address ? [address] : undefined,
        watch: true
    })
    let balanceDecimal = 0
    if (balance) {
        balanceDecimal = Number(balance) / 1000000000000000000
    }
    return <div className="text-white">
        {balanceDecimal?.toString()} units
    </div>;
}


function Airdrop({
                     contractAddress, //airdrop
                     tokenAddress, //token address
                     profileAddress,
                 }: {
    contractAddress?: Address;
    tokenAddress: Address;
    profileAddress?: Address;
}) {


    const [addresses, setAddresses] = useState([])

    const client = new ApolloClient({
        uri: "https://squid.subsquid.io/transactions-example/graphql",
        cache: new InMemoryCache()
    });

    const GET_USERS_QUERY = gql`
        query getUsers {
            addresses {
                id,
            }
        }
    `


    const [recipients, setRecipients] = useState([{
        recipient: "",
        amount: 0
    }])

    async function getUsers() {
        try {
            const {data} = await client.query({
                query: GET_USERS_QUERY
            })
            // process the GraphQL response data
            const users = data.addresses
            setAddresses(users.slice(0, 10))
            let recipientList = []
            //
            for (let i = 0; i < 10; i++) {
                recipientList.push({
                    recipient: users[i].id,
                    amount: 100000000
                })
            }
            setRecipients(recipientList);
        } catch (e) {
            console.error("Error while fetching data : ", e)
        }
    }

    // console.log(tokenAddress)
    // console.log(contractAddress)
    // console.log(profileAddress)
    // console.log(recipients)
    const {config,error} = usePrepareContractWrite({
        address: contractAddress,
        abi: airdropAbi,
        functionName: "airdropERC20",
        args: [tokenAddress, profileAddress, recipients]
    })
    // console.log(config)
    // console.log(error)
    const {write} = useContractWrite(config);
    return (
        <ApolloProvider client={client}>
            <div>
                <button
                    className="btn rounded-full bg-[#635AFF] border-[#635AFF] text-white mr-2 my-2 btn-xs sm:btn-sm md:btn-md lg:btn-md"
                    onClick={() => getUsers()}
                >
                    Get Addresses
                </button>

                <button
                    className="btn rounded-full mr-2 border-[#635AFF] bg-[#635AFF] text-white  my-2 btn-xs sm:btn-sm md:btn-md lg:btn-md"
                    onClick={() => {
                        console.log(config)
                        write?.()
                    }
                    }
                    disabled={addresses.length === 0}

                >
                    Airdrop
                </button>
            </div>
        </ApolloProvider>
    );
}

function Allowance({
                       address,
                       contractAddress,
                       tokenAddress,
                   }: {
    address?: Address;
    contractAddress: Address;
    tokenAddress: Address;
}) {
    const [amount, setAmount] = useState("")
    const [spender, setSpender] = useState(contractAddress)

    const {config, error, isError} = usePrepareErc20Approve({
        address: tokenAddress,
        args: spender && amount ? [spender, BigInt(Number(amount) * 1e18)] : undefined,
        enabled: Boolean(spender && amount)
    })
    const {data, write} = useErc20Approve(config)

    const {isLoading, isSuccess} = useWaitForTransaction({
        hash: data?.hash
    })

    const {data: balance} = useErc20Allowance({
        address: tokenAddress,
        args: address && spender ? [address, contractAddress] : undefined,
        watch: true
    })
    let allowance = 0
    if (balance) {
        allowance = Number(balance) / 1e18
    }

    return (
        <div>

            <div className="text-[#0A2540]">
                Airdrop Allowance:{" "}
                <input
                    disabled={isLoading}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="amount (units)"
                    value={amount}
                    className="appearance-none mx-5 w-60 bg-white text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white rounded-full"

                />
                <button
                    disabled={isLoading && !write}
                    className="btn text-white rounded-full bg-[#635AFF] border-[#635AFF] mr-2 my-2 btn-xs sm:btn-sm md:btn-md lg:btn-md"
                    onClick={() => write?.()}
                >
                    set
                </button>
                {isLoading && <ProcessingMessage hash={data?.hash}/>}
                {isSuccess && <div> Success! </div>}
                {isError && <div> Error: {(error as BaseError)?.shortMessage}</div>}

            </div>
            <div className="text-[#0A2540]">Allowance: {allowance?.toString()}</div>
        </div>
    );
}


function ProcessingMessage({hash}: { hash?: `0x${string}` }) {
    const {chain} = useNetwork();
    const etherscan = chain?.blockExplorers?.etherscan;
    return (
        <span>
      Processing transaction...{" "}
            {etherscan && (
                <a href={`${etherscan.url}/tx/${hash}`}>{etherscan.name}</a>
            )}
    </span>
    );
}




