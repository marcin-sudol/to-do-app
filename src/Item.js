export default class Item extends React.Component {
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
    onClose: PropTypes.func,
  };

  // ----- METHODS -----
  changeCompletion() {
    this.props.onChange(this.props.id);
  }

  remove() {
    this.props.onClose(this.props.id);
  }

  // ----- RENDER -----
  render() {
    const itemId = "item" + this.props.id;
    const htmlItem = this.props.completed ? (
      <del>{this.props.text}</del>
    ) : (
      this.props.text
    );

    return (
      <li
        className={
          "list-group-item " + (this.props.completed ? "bg-light" : null)
        }
      >
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id={itemId}
            checked={this.props.completed}
            onChange={this.changeCompletion}
          />
          <label
            className={
              "custom-control-label" +
              (this.props.completed ? " text-secondary" : "")
            }
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
}
