
// ----- MAIN APP COMPONENT -----
class ToDoApp extends React.Component {
    constructor(props) {
        super(props);

        // ----- STATE -----
        this.state = {
            itemList: [],
            activeList: [],
            nextKey: 0
        };

        // ----- BINDING METHODS -----
        this.addItem = this.addItem.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.removeNotActiveItems = this.removeNotActiveItems.bind(this);
        this.removeAllItems = this.removeAllItems.bind(this);

        this.textInput = <TextInput adder={this.addItem} />;
    }

    // ----- METHODS -----
    addItem(item) {
        if (item != "") {
            let newItemList = this.state.itemList.slice();
            let newActiveList = this.state.activeList.slice();

            newItemList.push(
                <ListItem
                    key={this.state.nextKey}
                    id={this.state.nextKey}
                    item={item}
                    activityChanger={this.changeActive}
                    remover={this.removeItem}
                />
            );

            newActiveList.push(true);

            this.setState(
                (state) => ({
                    itemList: newItemList,
                    activeList: newActiveList,
                    nextKey: state.nextKey + 1
                })
            );
        }
    }

    changeActive(id) {
        let newActiveList = this.state.activeList.map(
            (i, key) => (this.state.itemList[key].props.id === id ? !i : i)
        );
        this.setState({ activeList: newActiveList });
    }

    removeItem(id) {
        let newItemList = this.state.itemList.filter(i => i.props.id != id);
        let newActiveList = this.state.itemList.filter((i, key) => this.state.itemList[key].props.id != id);

        this.setState(
            {
                itemList: newItemList,
                activeList: newActiveList
            }
        );
    }

    removeNotActiveItems() {
        let newItemList = this.state.itemList.filter((i, key) => this.state.activeList[key]);
        let newActiveList = this.state.activeList.filter(i => i);

        this.setState(
            {
                itemList: newItemList,
                activeList: newActiveList
            }
        );
    }

    removeAllItems() {
        this.setState(
            {
                itemList: [],
                activeList: []
            }
        );
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
                        {this.textInput}

                        {this.state.itemList.length > 0
                            ? <hr />
                            : <p className="text-center text-secondary">Your list is empty!</p>
                        }

                        {/* ----- ITEM LIST ----- */}
                        <ul className="list-group">
                            {this.state.itemList}
                        </ul>

                        {/* ----- REMOVE ALL BUTTON ----- */}
                        {this.state.itemList.length > 0
                            ? <RemoveButtons
                                notActiveRemover={this.removeNotActiveItems}
                                allItemsRemover={this.removeAllItems}
                            />
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
        adder: PropTypes.func
    }

    // ----- METHODS -----
    changeInput(event) {
        this.setState({ input: event.target.value });
    }

    sendInput() {
        if (this.state.input != "") {
            this.props.adder(this.state.input);
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
class ListItem extends React.Component {
    constructor(props) {
        super(props);

        // ----- STATE -----
        this.state = {
            active: true
        };

        // ----- BINDING METHODS -----
        this.changeActive = this.changeActive.bind(this);
        this.remove = this.remove.bind(this);
    }

    // ----- PROP TYPES -----
    static propTypes = {
        id: PropTypes.number,
        item: PropTypes.string,
        activityChanger: PropTypes.func,
        remover: PropTypes.func
    }

    // ----- METHODS -----
    changeActive() {
        this.setState(
            (state) => ({ active: !state.active })
        );
        this.props.activityChanger(this.props.id);
    }

    remove() {
        this.props.remover(this.props.id);
    }

    // ----- RENDER -----
    render() {
        const itemId = 'item' + this.props.id;
        const htmlItem =
            this.state.active ? this.props.item : (<del>{this.props.item}</del>);

        return (
            <li className={"list-group-item " + (!this.state.active ? "bg-light" : null)}>
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id={itemId}
                        checked={!this.state.active}
                        onChange={this.changeActive}
                    />
                    <label
                        className={"custom-control-label" + (this.state.active ? "" : " text-secondary")}
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





// ----- REMOVE ALL COMPONENT -----
const RemoveButtons = (props) => {
    return (
        <div className="text-center">
            <button
                type="button"
                className="btn btn-sm btn-outline-secondary mt-3 mx-2"
                onClick={props.notActiveRemover}>
                Remove completed
            </button>

            <button
                type="button"
                className="btn btn-sm btn-outline-danger mt-3 mx-2"
                onClick={props.allItemsRemover}>
                Clear list
            </button>
        </div>
    )
};





// ----- RENDER -----
ReactDOM.render(
    <ToDoApp />,
    document.getElementById('app')
);
