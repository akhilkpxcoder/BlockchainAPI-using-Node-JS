# BlockchainAPI

This api help to add data to ethereum blockchain and verify the data from the blockchain

# Install Ganache
Ganache help as to add data to ethereum blockchain.
Below link to download it

```
https://github.com/trufflesuite/ganache-ui/releases/download/v2.5.4/Ganache-2.5.4-win-x64.appx
```
# Change PORT 
Find Ganache PORT number

![portnumber](https://user-images.githubusercontent.com/98999402/172682368-97ee77c1-d637-43df-89c1-1e84f862f3c0.PNG)


Change the PORT number in server.js file

![serverjsfile](https://user-images.githubusercontent.com/98999402/172682411-a83b0f2a-34d2-4846-9fcf-fcba6bcd0ec9.PNG)


Change the PORT number in truffle-config.js file

![truffleconfigfile](https://user-images.githubusercontent.com/98999402/172682450-b2cab1a9-ca68-4c47-a063-dbf7ece0bcf7.PNG)


# Install NPM
```
npm install
```
# Install Truffle
```
npm i -g truffle
```
# Set Execution Policy
```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
# Truffle Build
```
truffle build
```
# Truffle Depoly
```
truffle depoly
```
# Start NPM
```
npm start
```
# Post method Add

```
http://localhost:8000/add
```

# Post method Verify

```
http://localhost:8000/verify
```