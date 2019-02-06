'use strict';

import _objectSpread from "/Users/danielque/git/windmill/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _regeneratorRuntime from "/Users/danielque/git/windmill/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/Users/danielque/git/windmill/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/Users/danielque/git/windmill/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/Users/danielque/git/windmill/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/Users/danielque/git/windmill/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/Users/danielque/git/windmill/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/Users/danielque/git/windmill/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/Users/danielque/git/windmill/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import * as Web3 from 'web3'; //import $ from 'jquery';
//import _ from 'underscore';
//import BigNumber from 'bignumber.js';
//import Select from 'react-select';
//import Figure from './Figure.js';

import * as abi from 'ethereumjs-abi';
var e = React.createElement;
var web3;

var DarkRead =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DarkRead, _React$Component);

  function DarkRead(props) {
    var _this;

    _classCallCheck(this, DarkRead);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DarkRead).call(this, props));

    _this.handleAddressChange = function (event) {
      _this.setState({
        address: event.target.value
      });
    };

    _this.handleSlotChange = function (event) {
      _this.setState({
        slot: event.target.value
      });
    };

    _this.handleRequest =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('', _this.state.address, _this.state.slot);
              web3.eth.getStorageAt(_this.state.address, _this.state.slot, function (error, result) {
                var data = result.substring(2);

                _this.setState({
                  data: data
                });
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    _this.handleTypeChange =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(event) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.setState({
                  type: event.target.value
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.renderData = function (data) {
      console.log(', this.state.type', _this.state.type);

      if (_this.state.data && _this.state.type) {
        var decoded;

        if (_this.state.type === 'string') {
          decoded = Buffer.from(_this.state.data, 'hex').toString();
          return React.createElement("div", null, decoded);
        }

        try {
          decoded = abi.rawDecode([_this.state.type], Buffer.from(_this.state.data, 'hex'));
        } catch (e) {
          return React.createElement("div", null, "Error decoding");
        }

        if (_this.state.type === 'bytes32') {
          var decodedData = decoded[0]; // Only one element since we're supplying one type

          decoded = Buffer.from(decodedData).toString('hex');
        }

        decoded = decoded.toString();
        return React.createElement("div", null, decoded);
      } else {
        return React.createElement("div", null);
      }
    };

    _this.state = {
      address: '',
      slot: '',
      type: 'bytes32',
      data: ''
    };
    _this.handleRequest = _this.handleRequest.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(DarkRead, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('componentDidMount');

                if (!window.ethereum) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 4;
                return window.ethereum.enable();

              case 4:
                web3 = new Web3(ethereum);
                _context3.next = 8;
                break;

              case 7:
                if (window.web3) {
                  // Legacy browsers
                  web3 = new Web3(web3.currentProvider);
                } else {
                  alert('Please connect Metamask');
                }

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var pageStyle = {
        backgroundColor: '#f5f5f5'
      };
      var containerStyle = {
        //backgroundColor: '#fff',
        fontFamily: 'sans-serif',
        width: '1200px',
        margin: '0 auto',
        // Center
        padding: '30px'
      };
      var titleStyle = {
        textAlign: 'center'
      };
      var cardStyle = {
        width: '600px',
        margin: '15px auto',
        // Center
        padding: '10px 15px',
        borderColor: '#ddd',
        borderRadius: '5px',
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: '#fff',
        shadowColor: '#aaa',
        shadowOffset: {
          width: '5px',
          height: '5px'
        },
        boxShadow: '0px 0px 10px 3px rgba(200, 200, 200, 1)',
        position: 'relative',
        overflowWrap: 'break-word' // centered
        // rounded
        // light gray stroke

      };
      var cardTitleStyle = {
        fontWeight: 'bold',
        textAlign: 'center'
      };
      var inputStyle = {
        width: '500px',
        fontSize: '14px',
        height: '50px',
        borderColor: 'ddd',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '0 10px',
        textAlign: 'center'
      };
      var buttonStyle = {
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
        color: 'white'
      };
      var typeDropdownStyle = {
        position: 'absolute',
        right: 3
      };
      var resultStyle = {
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
      return React.createElement("div", {
        style: pageStyle
      }, React.createElement("div", {
        style: containerStyle
      }, React.createElement("title", null, "Dark Read: Reveal internal contract state"), React.createElement("div", null, React.createElement("h1", {
        style: titleStyle
      }, "Dark Read"), React.createElement("div", {
        style: cardStyle
      }, React.createElement("div", null, React.createElement("div", {
        style: cardTitleStyle
      }, "Instructions"), React.createElement("p", null, "Dark Read makes reading internal contract state easy. Simply plug in the contract address and the slot (offset from which to read from). Recall that each slow is 32 bytes."), React.createElement("p", null, "Metamask is required."), React.createElement("p", null, "Example: address: 0x1985365e9f78359a9b6ad760e32412f4a445e862, slot: 1, type: string"), React.createElement("p", null, "Example2: address: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48, slot: 7616251639890160809447714111544359812065171195189364993079081710756264753419, type: address"))), React.createElement("div", {
        style: _objectSpread({}, cardStyle, {
          textAlign: 'center'
        })
      }, React.createElement("div", {
        style: cardTitleStyle
      }, "Input"), React.createElement("br", null), React.createElement("div", null, React.createElement("input", {
        style: inputStyle,
        placeholder: "Contract address",
        value: this.state.address,
        onChange: this.handleAddressChange,
        type: "text"
      })), React.createElement("br", null), React.createElement("div", null, React.createElement("input", {
        style: inputStyle,
        placeholder: "Slot",
        value: this.state.slot,
        onChange: this.handleSlotChange
      })), React.createElement("br", null), React.createElement("div", null, React.createElement("button", {
        style: buttonStyle,
        onClick: this.handleRequest
      }, "Get Storage"))), React.createElement("div", {
        style: _objectSpread({}, cardStyle, {
          textAlign: 'center',
          height: '200px'
        })
      }, React.createElement("div", {
        style: typeDropdownStyle
      }, React.createElement("select", {
        value: this.state.type,
        onChange: this.handleTypeChange
      }, React.createElement("option", {
        value: "bytes32"
      }, "bytes32"), React.createElement("option", {
        value: "uint256"
      }, "uint256"), React.createElement("option", {
        value: "address"
      }, "address"), React.createElement("option", {
        value: "string"
      }, "string"))), React.createElement("div", {
        style: cardTitleStyle
      }, "Result"), React.createElement("div", {
        style: resultStyle
      }, this.renderData(this.state.result))))));
    }
  }]);

  return DarkRead;
}(React.Component);

var domContainer = document.querySelector('#app-container');
ReactDOM.render(e(DarkRead, {}), domContainer);