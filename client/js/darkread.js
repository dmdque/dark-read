'use strict';

import * as Web3 from 'web3';
//import $ from 'jquery';
//import _ from 'underscore';
//import BigNumber from 'bignumber.js';

//import Select from 'react-select';
//import Figure from './Figure.js';
import * as abi from 'ethereumjs-abi';


const e = React.createElement;

let web3;

class DarkRead extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      address: '',
      slot: '',
      type: 'bytes32',
      data: ''
    };

    this.handleRequest = this.handleRequest.bind(this);
  }

  async componentDidMount() {
    console.log('componentDidMount');

    if (window.ethereum) {
      await window.ethereum.enable();
      web3 = new Web3(ethereum);
    } else if (window.web3) {
      // Legacy browsers
      web3 = new Web3(web3.currentProvider);
    } else {
      alert('Please connect Metamask');
    }
  }

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value,
    });
  }

  handleSlotChange = (event) => {
    this.setState({
      slot: event.target.value
    });
  }

  handleRequest = async () => {
    console.log('', this.state.address, this.state.slot);
    web3.eth.getStorageAt(this.state.address, this.state.slot, (error, result) => {
      let data = result.substring(2);
      this.setState({
        data: data
      });
    });
  }

  handleTypeChange = async (event) => {
    this.setState({
      type: event.target.value
    });
  }

  renderData = (data) => {
    console.log(', this.state.type', this.state.type);
    if (this.state.data && this.state.type) {
      let decoded;

      if (this.state.type === 'string') {
        decoded = Buffer.from(this.state.data, 'hex').toString();
        return <div>{decoded}</div>;
      }

      try {
        decoded = abi.rawDecode([this.state.type], Buffer.from(this.state.data, 'hex'));
      } catch (e) {
        return <div>Error decoding</div>;
      }

      if (this.state.type === 'bytes32') {
        let decodedData = decoded[0];  // Only one element since we're supplying one type
        decoded = Buffer.from(decodedData).toString('hex');
      }

      decoded = decoded.toString();
      return <div>{decoded}</div>;
    } else {
      return <div></div>;
    }
  }

  render() {
    const pageStyle = {
      backgroundColor: '#f6f5f5',
      width: '100vw'
    }
    const containerStyle = {
      backgroundColor: '#fff',
      fontFamily: 'sans-serif',
      width: '1200px',
      margin: '0 auto',  // Center
      padding: '30px',
    };
    const titleStyle = {
      textAlign: 'center'
    };
    const cardStyle = {
      width: '600px',
      margin: '15px auto',  // Center
      padding: '10px 15px',
      borderColor: '#ddd',
      borderRadius: '5px',
      borderStyle: 'solid',
      borderWidth: '1px',
      backgroundColor: '#fff',
      shadowColor: '#aaa',
      shadowOffset: {width: '5px', height: '5px'},
      boxShadow: '0px 0px 10px 3px rgba(200, 200, 200, 1)',
      position: 'relative',
      overflowWrap: 'break-word',
      // centered
      // rounded
      // light gray stroke

    };
    const cardTitleStyle = {
      fontWeight: 'bold',
      textAlign: 'center'
    };
    const inputStyle = {
      width: '500px',
      fontSize: '14px',
      height: '50px',
      borderColor: 'ddd',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '0 10px',
      textAlign: 'center',
    };
    const buttonStyle = {
      margin: 'auto',
      height: '50px',
      width: '150px',
      borderColor: '#ddd',
      borderRadius: '5px',
      borderStyle: 'solid',
      borderWidth: '1px',
      backgroundColor: 'rgba(26, 155, 216, 1)',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
    };
    const typeDropdownStyle = {
      position: 'absolute',
      right: 3
    };
    const resultStyle = {
      position: 'absolute',
      margin: 'auto',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: '500px',
      height: '30px',
      fontSize: '14px'
    };
    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <title>Dark Read: Reveal internal contract state</title>
          <div>
            <h1 style={titleStyle}>Dark Read</h1>
            <div style={cardStyle}>
              <div>
                <div style={cardTitleStyle}>Instructions</div>
                <p>Dark Read makes reading internal contract state easy. Simply plug in the contract address and the slot (offset from which to read from). Recall that each slow is 32 bytes.</p>
                <p>Metamask is required. Make sure you're on the correct network.</p>
                <p>Example: address: 0x1985365e9f78359a9b6ad760e32412f4a445e862, slot: 1, type: string</p>
                <p>Example2: address: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48, slot: 7616251639890160809447714111544359812065171195189364993079081710756264753419, type: address</p>
              </div>
            </div>
            <div style={{...cardStyle, textAlign: 'center'}}>
              <div style={cardTitleStyle}>Input</div>
              <br></br>
              <div><input style={inputStyle} placeholder='Contract address' value={this.state.address} onChange={this.handleAddressChange} type='text'></input></div>
              <br></br>
              <div><input style={inputStyle} placeholder='Slot' value={this.state.slot} onChange={this.handleSlotChange}></input></div>
              <br></br>
              <div>
                <button style={buttonStyle} onClick={this.handleRequest}>Get Storage</button>
              </div>
            </div>
            <div style={{...cardStyle, textAlign: 'center', height: '200px'}}>
              <div style={typeDropdownStyle}>
                <select value={this.state.type} onChange={this.handleTypeChange}>
                  <option value='bytes32'>bytes32</option>
                  <option value='uint256'>uint256</option>
                  <option value='address'>address</option>
                  <option value='string'>string</option>
                </select>
              </div>
              <div style={cardTitleStyle}>Result</div>
                <div style={resultStyle}>{this.renderData(this.state.result)}</div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

const domContainer = document.querySelector('#app-container');
ReactDOM.render(e(DarkRead, {}), domContainer);
