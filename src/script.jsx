
// ----- MAIN APP COMPONENT -----
class ToDoApp extends React.Component {
    constructor(props) {
        super(props);

        // ----- STATE -----
        this.state = {
            items: [],
            nextId: 0
        };

        // ----- BINDING METHODS -----
        this.addItem = this.addItem.bind(this);
        this.changeItemCompletion = this.changeItemCompletion.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.removeCompletedItems = this.removeCompletedItems.bind(this);
        this.removeAllItems = this.removeAllItems.bind(this);
    }

    // ----- METHODS -----
    addItem(text) {
        if (text != "") {
            let newItems = this.state.items.slice();

            newItems.push(
                {
                    id: this.state.nextId,
                    text,
                    completed: false
                }
            );

            this.setState(
                (state) => ({
                    items: newItems,
                    nextId: state.nextId + 1
                })
            );
        }
    }

    changeItemCompletion(id) {
        let newItems = this.state.items.map(
            (item) => (item.id === id ? Object.assign({}, item, { completed: !item.completed }) : item)
        );
        this.setState({ items: newItems });
    }

    removeItem(id) {
        let newItems = this.state.items.filter(item => item.id != id);
        this.setState({ items: newItems });
    }

    removeCompletedItems() {
        let newItems = this.state.items.filter(item => !item.completed);
        this.setState({ items: newItems });
    }

    removeAllItems() {
        this.setState({ items: [] });
    }

    // ----- RENDER -----
    render() {
        return (
            <div className="container-fluid p-3">
                <div
                    className="card bg-light shadow mx-auto mt-sm-3"
                    style={{
                        minHeight: 400,
                        width: "100%",
                        maxWidth: 500
                    }}>

                    <div className="card-body">

                        <h3 className="text-center text-primary mb-4">
                            <i className="far fa-check-square"></i> to-do
                        </h3>

                        {/* ----- TEXT INPUT ----- */}
                        <TextInput onSubmit={this.addItem} />

                        {this.state.items.length > 0
                            ? <hr />
                            : <p className="text-center text-secondary">Your list is empty!</p>
                        }

                        {/* ----- ITEM LIST ----- */}
                        <ul className="list-group">
                            {this.state.items.map(item =>
                                (<Item
                                    key={item.id}
                                    {...item}
                                    onChange={this.changeItemCompletion}
                                    onClose={this.removeItem}
                                />)
                            )}
                        </ul>

                        {/* ----- REMOVE ALL BUTTON ----- */}
                        {this.state.items.length > 0
                            ? (<div className="text-center">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary mt-3 mx-2"
                                    onClick={this.removeCompletedItems}>
                                    Remove completed
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger mt-3 mx-2"
                                    onClick={this.removeAllItems}>
                                    Clear list
                                </button>
                            </div>)
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
};





// ----- TEXT INPUT COMPONENT -----
class TextInput extends React.Component {
    constructor(props) {
        super(props);

        // ----- STATE
        this.state = {
            input: ''
        };

        // ----- BINDING METHODS -----
        this.changeInput = this.changeInput.bind(this);
        this.sendInput = this.sendInput.bind(this);
        this.inputKeyPressed = this.inputKeyPressed.bind(this);
    }

    // ----- PROP TYPES -----
    static propTypes = {
        onSubmit: PropTypes.func
    }

    // ----- METHODS -----
    changeInput(event) {
        this.setState({ input: event.target.value });
    }

    sendInput() {
        if (this.state.input != "") {
            this.props.onSubmit(this.state.input);
            this.setState({ input: "" });
        }
    }

    inputKeyPressed(event) {
        if (event.code === "Enter") {
            event.preventDefault();
            document.getElementById("add-item-btn").click();
        }
    }

    componentDidMount() {
        document.getElementById("input-item")
            .addEventListener("keydown", this.inputKeyPressed);
    }

    componentWillUnmount() {
        document.getElementById("input-item")
            .removeEventListener("keydown", this.inputKeyPressed);
    }

    // ----- RENDER -----
    render() {
        return (
            <form className="form-group">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        id="input-item"
                        placeholder="Enter item to add to the list"
                        value={this.state.input}
                        onChange={this.changeInput}
                        aria-label="Enter item to add to the list"
                        aria-describedby="add-item-btn"
                    />
                    <div className="input-group-append">
                        <button
                            type="button"
                            className="btn btn-warning"
                            id="add-item-btn"
                            onClick={this.sendInput}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        );
    }
};





// ----- LIST ITEM COMPONENT -----
class Item extends React.Component {
    constructor(props) {
        super(props);

        // ----- BINDING METHODS -----
        this.changeCompletion = this.changeCompletion.bind(this);
        this.remove = this.remove.bind(this);
    }

    // ----- PROP TYPES -----
    static propTypes = {
        id: PropTypes.number,
        text: PropTypes.string,
        completed: PropTypes.bool,
        onChange: PropTypes.func,
        onClose: PropTypes.func
    }

    // ----- METHODS -----
    changeCompletion() {
        this.props.onChange(this.props.id);
    }

    remove() {
        this.props.onClose(this.props.id);
    }

    // ----- RENDER -----
    render() {
        const itemId = 'item' + this.props.id;
        const htmlItem = this.props.completed ? (<del>{this.props.text}</del>) : this.props.text;

        return (
            <li className={"list-group-item " + (this.props.completed ? "bg-light" : null)}>
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id={itemId}
                        checked={this.props.completed}
                        onChange={this.changeCompletion}
                    />
                    <label
                        className={"custom-control-label" + (this.props.completed ? " text-secondary" : "")}
                        htmlFor={itemId}
                    >
                        {htmlItem}
                    </label>
                    <button
                        type="button"
                        className="close"
                        aria-label="Remove item"
                        onClick={this.remove}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </li>
        );
    }
};





// ----- RENDER -----
ReactDOM.render(
    <ToDoApp />,
    document.getElementById('app')
);
