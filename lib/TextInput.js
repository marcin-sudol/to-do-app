var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_React$Component) {
  _inherits(TextInput, _React$Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _this.state = {
      input: ""
    };

    _this.changeInput = _this.changeInput.bind(_this);
    _this.sendInput = _this.sendInput.bind(_this);
    _this.inputKeyPressed = _this.inputKeyPressed.bind(_this);
    return _this;
  }

  _createClass(TextInput, [{
    key: "changeInput",
    value: function changeInput(event) {
      this.setState({ input: event.target.value });
    }
  }, {
    key: "sendInput",
    value: function sendInput() {
      if (this.state.input != "") {
        this.props.onSubmit(this.state.input);
        this.setState({ input: "" });
      }
    }
  }, {
    key: "inputKeyPressed",
    value: function inputKeyPressed(event) {
      if (event.code === "Enter") {
        event.preventDefault();
        document.getElementById("add-item-btn").click();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.getElementById("input-item").addEventListener("keydown", this.inputKeyPressed);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.getElementById("input-item").removeEventListener("keydown", this.inputKeyPressed);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { className: "form-group" },
        React.createElement(
          "div",
          { className: "input-group" },
          React.createElement("input", {
            type: "text",
            className: "form-control",
            id: "input-item",
            placeholder: "Enter item to add to the list",
            value: this.state.input,
            onChange: this.changeInput,
            "aria-label": "Enter item to add to the list",
            "aria-describedby": "add-item-btn"
          }),
          React.createElement(
            "div",
            { className: "input-group-append" },
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-warning",
                id: "add-item-btn",
                onClick: this.sendInput
              },
              "Add"
            )
          )
        )
      );
    }
  }]);

  return TextInput;
}(React.Component);

TextInput.propTypes = {
  onSubmit: PropTypes.func
};
export default TextInput;