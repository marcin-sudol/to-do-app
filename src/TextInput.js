export default class TextInput extends React.Component {
  constructor(props) {
    super(props);

    // ----- STATE
    this.state = {
      input: "",
    };

    // ----- BINDING METHODS -----
    this.changeInput = this.changeInput.bind(this);
    this.sendInput = this.sendInput.bind(this);
    this.inputKeyPressed = this.inputKeyPressed.bind(this);
  }

  // ----- PROP TYPES -----
  static propTypes = {
    onSubmit: PropTypes.func,
  };

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
    document
      .getElementById("input-item")
      .addEventListener("keydown", this.inputKeyPressed);
  }

  componentWillUnmount() {
    document
      .getElementById("input-item")
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
}
