var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ----- MAIN APP COMPONENT -----
var ToDoApp = function (_React$Component) {
    _inherits(ToDoApp, _React$Component);

    function ToDoApp(props) {
        _classCallCheck(this, ToDoApp);

        // ----- STATE -----
        var _this = _possibleConstructorReturn(this, (ToDoApp.__proto__ || Object.getPrototypeOf(ToDoApp)).call(this, props));

        _this.state = {
            items: [],
            nextId: 0
        };

        // ----- BINDING METHODS -----
        _this.addItem = _this.addItem.bind(_this);
        _this.changeItemCompletion = _this.changeItemCompletion.bind(_this);
        _this.removeItem = _this.removeItem.bind(_this);
        _this.removeCompletedItems = _this.removeCompletedItems.bind(_this);
        _this.removeAllItems = _this.removeAllItems.bind(_this);
        return _this;
    }

    // ----- METHODS -----


    _createClass(ToDoApp, [{
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
            this.setState({ items: [] });
        }

        // ----- RENDER -----

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
                        } },
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
                                    onClick: this.removeCompletedItems },
                                "Remove completed"
                            ),
                            React.createElement(
                                "button",
                                {
                                    type: "button",
                                    className: "btn btn-sm btn-outline-danger mt-3 mx-2",
                                    onClick: this.removeAllItems },
                                "Clear list"
                            )
                        ) : null
                    )
                )
            );
        }
    }]);

    return ToDoApp;
}(React.Component);

;

// ----- TEXT INPUT COMPONENT -----

var TextInput = function (_React$Component2) {
    _inherits(TextInput, _React$Component2);

    function TextInput(props) {
        _classCallCheck(this, TextInput);

        // ----- STATE
        var _this3 = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

        _this3.state = {
            input: ''
        };

        // ----- BINDING METHODS -----
        _this3.changeInput = _this3.changeInput.bind(_this3);
        _this3.sendInput = _this3.sendInput.bind(_this3);
        _this3.inputKeyPressed = _this3.inputKeyPressed.bind(_this3);
        return _this3;
    }

    // ----- PROP TYPES -----


    _createClass(TextInput, [{
        key: "changeInput",


        // ----- METHODS -----
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

        // ----- RENDER -----

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
    onSubmit: PropTypes.func };
;

// ----- LIST ITEM COMPONENT -----

var Item = function (_React$Component3) {
    _inherits(Item, _React$Component3);

    function Item(props) {
        _classCallCheck(this, Item);

        // ----- BINDING METHODS -----
        var _this4 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

        _this4.changeCompletion = _this4.changeCompletion.bind(_this4);
        _this4.remove = _this4.remove.bind(_this4);
        return _this4;
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
            var itemId = 'item' + this.props.id;
            var htmlItem = this.props.completed ? React.createElement(
                "del",
                null,
                this.props.text
            ) : this.props.text;

            return React.createElement(
                "li",
                { className: "list-group-item " + (this.props.completed ? "bg-light" : null) },
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
    onClose: PropTypes.func };
;

// ----- RENDER -----
ReactDOM.render(React.createElement(ToDoApp, null), document.getElementById('app'));