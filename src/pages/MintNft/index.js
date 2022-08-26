import { useState, useEffect } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material/'
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers';
// import axios from 'axios';

const projectId = '2Do7IBeR7OuYfyz0gA1po4FCeW0';
const projectSecret = '645a4b5ee36b9fa92e4433af8f295287';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const MintNft = () => {

  const [WalletAddress, setWalletAddress] = useState();
  const [, setWalletBalance] = useState();

  // const [contractAddress, updateContractAddress] = useState('')
  const [fileUrl, updateFileUrl] = useState('')
  const [nftDataUrl, updateNftDataUrl] = useState('')
  const [formInput, updateFormInput] = useState({
    name: '',
    description: '',
  });

  async function fetchMyAddress() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const accounts = await provider.send('eth_requestAccounts', []);
    setWalletAddress(accounts);
    const balance = await provider.getBalance(accounts[0]);
    setWalletBalance(ethers.utils.formatEther(balance));
  }

  useEffect(() => {
    fetchMyAddress();
  }, []);

  const onChange = async (e) => {
    // debugger
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createNFT() {
    const url = await createData();
    updateNftDataUrl(url)

    // try {
    //   debugger
    //   const response = await axios.get('https://us-central1-knightweb3.cloudfunctions.net/getLatestContractAddress',);
    //   console.log(response);
    //   updateContractAddress(response.data)
    // }
    // catch (error) {
    //   console.log(error);
    // }

    handleMintNft();
  }

  const createData = async () => {
    // debugger
    const { name, description } = formInput;
    if (!name || !description || !fileUrl) return;
    // upload to IPFS
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  }

  const handleMintNft = async () => {
    debugger
    const response = await fetch(
      'https://thentic.tech/api/nfts/mint',
      {
        body: JSON.stringify({
          key: process.env.REACT_APP_KEY,
          chain_id: process.env.REACT_APP_CHAIN_ID,
          contract: '0xC14f6718681DD4D6511DE30EEB1A332E335107bF',
          nft_id: 11,
          nft_data: nftDataUrl,
          to: WalletAddress[0],
          redirect_url: 'https://www.google.com',
          webhook_url: 'https://us-central1-knightweb3.cloudfunctions.net/addMintNFT'
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    ).then((response) => response.json())
      .then((data) => {
        console.log(data, 'data')
        debugger
        const url = data.transaction_url;
        window.location.href = url;
      });
    console.log(response)
  }

  return (
    <div>
      <Typography sx={{ textAlign: 'center', mt: 3 }} variant='h3' component='h2'>
        Mint NFT
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={2}></Grid>
          <Grid item md={4} xs={8} sx={{ p: 5, px: 5, m: 1, textAlign: 'center' }}>
            <TextField
              label='Asset Name'
              variant='filled'
              required
              onChange={(e) =>
                updateFormInput({ ...formInput, name: e.target.value })
              }
              fullWidth
              sx={{ mt: 5, backgroundColor: 'white' }}
            />
            <TextField
              label='Asset Description'
              variant='filled'
              required
              onChange={(e) =>
                updateFormInput({ ...formInput, description: e.target.value })
              }
              fullWidth
              sx={{ mt: 5, backgroundColor: 'white' }}
            />
            {/* <TextField
              label='Asset Price in Eth'
              variant='filled'
              required
              onChange={(e) =>
                updateFormInput({ ...formInput, price: e.target.value })
              }
              fullWidth
              sx={{ mt: 5, backgroundColor: 'white' }}
            /> */}

            <TextField
              type='file'
              variant='filled'
              required
              fullWidth
              sx={{ mb: 5, mt: 5, backgroundColor: 'white' }}
              onChange={onChange}
            />

            {fileUrl && <img width='350px' src={fileUrl} />}

            <Stack direction='row' spacing={2} sx={{ mt: 5, mb: 5, mx: 6, justifyContent: 'center' }}>
              <Button
                style={{ width: 500, height: 40 }}
                variant='contained'
                color='success'
                onClick={createNFT}
              >
                Mint NFT
              </Button>
            </Stack>

            {/* {WalletAddress} {WalletBalance} */}

          </Grid>
          <Grid item md={4} xs={2}></Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default MintNft;