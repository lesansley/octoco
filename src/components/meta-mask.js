import React from "react";
import { ethers } from "ethers";
import { Table } from "reactstrap";

function MetaMask() {
  const [state, setState] = React.useState({
    address: "",
    balance: null,
  });
  const [hasWallet, setHasWallet] = React.useState(false);

  const getWallet = React.useCallback(async () => {
    const getAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const getBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [getAddress[0], "latest"],
    });

    return {
      address: getAddress[0],
      balance: ethers.utils.formatEther(getBalance),
    };
  }, []);

  React.useEffect(() => {
    if (window.ethereum) {
      setHasWallet(true);
      getWallet().then(setState);
    }
  }, [getWallet]);

  return (
    <>
      {!hasWallet ? (
        ""
      ) : (
        <div className="d-none d-md-block">
          <Table className="table table-sm">
            <thead>
              <tr>
                <th colSpan="2">MetaMask Wallet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <small>Address</small>
                </th>
                <td>
                  <small>{state.address}</small>
                </td>
              </tr>
              <tr>
                <th>
                  <small>Balance</small>
                </th>
                <td>
                  <small>{state.balance} ether</small>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default MetaMask;
