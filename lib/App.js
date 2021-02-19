var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Item from "./item.js";
import TextInput from "./text-input.js";

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      items: [],
      nextId: 0
    };

    _this.storage = window.localStorage;

    _this.addItem = _this.addItem.bind(_this);
    _this.changeItemCompletion = _this.changeItemCompletion.bind(_this);
    _this.removeItem = _this.removeItem.bind(_this);
    _this.removeCompletedItems = _this.removeCompletedItems.bind(_this);
    _this.removeAllItems = _this.removeAllItems.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "addItem",
    value: function addItem(text) {
      if (text != "") {
        var newItems = this.state.items.slice();

        newItems.push({
          id: this.state.nextId,
          text: text,
          completed: false
        });

        this.setState(function (state) {
          return {
            items: newItems,
            nextId: state.nextId + 1
          };
        });
      }
    }
  }, {
    key: "changeItemCompletion",
    value: function changeItemCompletion(id) {
      var newItems = this.state.items.map(function (item) {
        return item.id === id ? Object.assign({}, item, { completed: !item.completed }) : item;
      });
      this.setState({ items: newItems });
    }
  }, {
    key: "removeItem",
    value: function removeItem(id) {
      var newItems = this.state.items.filter(function (item) {
        return item.id != id;
      });
      this.setState({ items: newItems });
    }
  }, {
    key: "removeCompletedItems",
    value: function removeCompletedItems() {
      var newItems = this.state.items.filter(function (item) {
        return !item.completed;
      });
      this.setState({ items: newItems });
    }
  }, {
    key: "removeAllItems",
    value: function removeAllItems() {
      this.setState({ items: [], nextId: 0 });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var state = this.storage.getItem("toDoList");
      if (state !== undefined) {
        this.setState(JSON.parse(state));
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.storage.setItem("toDoList", JSON.stringify(this.state));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "container-fluid p-3" },
        React.createElement(
          "div",
          {
            className: "card bg-light shadow mx-auto mt-sm-3",
            style: {
              minHeight: 400,
              width: "100%",
              maxWidth: 500
            }
          },
          React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
              "h3",
              { className: "text-center text-primary mb-4" },
              React.createElement("i", { className: "far fa-check-square" }),
              " to-do"
            ),
            React.createElement(TextInput, { onSubmit: this.addItem }),
            this.state.items.length > 0 ? React.createElement("hr", null) : React.createElement(
              "p",
              { className: "text-center text-secondary" },
              "Your list is empty!"
            ),
            React.createElement(
              "ul",
              { className: "list-group" },
              this.state.items.map(function (item) {
                return React.createElement(Item, Object.assign({
                  key: item.id
                }, item, {
                  onChange: _this2.changeItemCompletion,
                  onClose: _this2.removeItem
                }));
              })
            ),
            this.state.items.length > 0 ? React.createElement(
              "div",
              { className: "text-center" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-sm btn-outline-secondary mt-3 mx-2",
                  onClick: this.removeCompletedItems
                },
                "Remove completed"
              ),
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-sm btn-outline-danger mt-3 mx-2",
                  onClick: this.removeAllItems
                },
                "Clear list"
              )
            ) : null
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

export default App;