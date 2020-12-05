import Item from "./Item.js";
import TextInput from "./TextInput.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      nextId: 0,
    };

    this.storage = window.localStorage;

    this.addItem = this.addItem.bind(this);
    this.changeItemCompletion = this.changeItemCompletion.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeCompletedItems = this.removeCompletedItems.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
  }

  addItem(text) {
    if (text != "") {
      let newItems = this.state.items.slice();

      newItems.push({
        id: this.state.nextId,
        text,
        completed: false,
      });

      this.setState((state) => ({
        items: newItems,
        nextId: state.nextId + 1,
      }));
    }
  }

  changeItemCompletion(id) {
    let newItems = this.state.items.map((item) =>
      item.id === id
        ? Object.assign({}, item, { completed: !item.completed })
        : item
    );
    this.setState({ items: newItems });
  }

  removeItem(id) {
    let newItems = this.state.items.filter((item) => item.id != id);
    this.setState({ items: newItems });
  }

  removeCompletedItems() {
    let newItems = this.state.items.filter((item) => !item.completed);
    this.setState({ items: newItems });
  }

  removeAllItems() {
    this.setState({ items: [], nextId: 0 });
  }

  componentDidMount() {
    const state = this.storage.getItem("toDoList");
    if (state !== undefined) {
      this.setState(JSON.parse(state));
    }
  }

  componentDidUpdate() {
    this.storage.setItem("toDoList", JSON.stringify(this.state));
  }

  render() {
    return (
      <div className="container-fluid p-3">
        <div
          className="card bg-light shadow mx-auto mt-sm-3"
          style={{
            minHeight: 400,
            width: "100%",
            maxWidth: 500,
          }}
        >
          <div className="card-body">
            <h3 className="text-center text-primary mb-4">
              <i className="far fa-check-square"></i> to-do
            </h3>

            {/* ----- TEXT INPUT ----- */}
            <TextInput onSubmit={this.addItem} />

            {this.state.items.length > 0 ? (
              <hr />
            ) : (
              <p className="text-center text-secondary">Your list is empty!</p>
            )}

            {/* ----- ITEM LIST ----- */}
            <ul className="list-group">
              {this.state.items.map((item) => (
                <Item
                  key={item.id}
                  {...item}
                  onChange={this.changeItemCompletion}
                  onClose={this.removeItem}
                />
              ))}
            </ul>

            {/* ----- REMOVE ALL BUTTON ----- */}
            {this.state.items.length > 0 ? (
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary mt-3 mx-2"
                  onClick={this.removeCompletedItems}
                >
                  Remove completed
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger mt-3 mx-2"
                  onClick={this.removeAllItems}
                >
                  Clear list
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
