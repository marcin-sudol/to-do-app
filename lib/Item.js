var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item(props) {
    _classCallCheck(this, Item);

    // ----- BINDING METHODS -----
    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

    _this.changeCompletion = _this.changeCompletion.bind(_this);
    _this.remove = _this.remove.bind(_this);
    return _this;
  }

  // ----- PROP TYPES -----


  _createClass(Item, [{
    key: "changeCompletion",


    // ----- METHODS -----
    value: function changeCompletion() {
      this.props.onChange(this.props.id);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.props.onClose(this.props.id);
    }

    // ----- RENDER -----

  }, {
    key: "render",
    value: function render() {
      var itemId = "item" + this.props.id;
      var htmlItem = this.props.completed ? React.createElement(
        "del",
        null,
        this.props.text
      ) : this.props.text;

      return React.createElement(
        "li",
        {
          className: "list-group-item " + (this.props.completed ? "bg-light" : null)
        },
        React.createElement(
          "div",
          { className: "custom-control custom-checkbox" },
          React.createElement("input", {
            type: "checkbox",
            className: "custom-control-input",
            id: itemId,
            checked: this.props.completed,
            onChange: this.changeCompletion
          }),
          React.createElement(
            "label",
            {
              className: "custom-control-label" + (this.props.completed ? " text-secondary" : ""),
              htmlFor: itemId
            },
            htmlItem
          ),
          React.createElement(
            "button",
            {
              type: "button",
              className: "close",
              "aria-label": "Remove item",
              onClick: this.remove
            },
            React.createElement(
              "span",
              { "aria-hidden": "true" },
              "\xD7"
            )
          )
        )
      );
    }
  }]);

  return Item;
}(React.Component);

Item.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  completed: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func
};
export default Item;