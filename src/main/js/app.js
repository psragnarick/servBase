import React from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import imageCompression from "browser-image-compression";
import clsx from "clsx";
import propTypes from "prop-types";
import { v4 as uuid } from "uuid";
import Card from "react-bootstrap/Card";

export default class imageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false
    };
  }

  handle = e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true
    });
  };

  changeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  click = e => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      <div className="m-5">
        <div className="text-light text-center">
          <h1>Three Simple Steps</h1>
          <h3>1. Upload Image</h3>
          <h3>2. Click on Compress</h3>
          <h3>3. Download Compressed Image</h3>
        </div>

        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {this.state.uploadImage ? (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.originalLink}
              ></Card.Img>
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
              ></Card.Img>
            )}
            <div className="d-flex justify-content-center">
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={e => this.handle(e)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
            <br />
            {this.state.outputFileName ? (
              <button
                type="button"
                className=" btn btn-dark"
                onClick={e => this.click(e)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>
            {this.state.clicked ? (
              <div className="d-flex justify-content-center">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="mt-2 btn btn-dark w-75"
                >
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counters[index] };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counters[index] };
    counters[index].value--;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  handleRestart = () => {
    window.location.reload();
  };

  render() {
    return (
      <div>
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onRestart={this.handleRestart}
          />
        </main>
      </div>
    );
  }
}

class UpdateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const updatedlocation = {};
		this.props.attributes.forEach(attribute => {
			updatedlocation[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onUpdate(this.props.location, updatedlocation);
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={this.props.location.entity[attribute]}>
				<input type="text" placeholder={attribute}
					   defaultValue={this.props.location.entity[attribute]}
					   ref={attribute} className="field"/>
			</p>
		);

		const dialogId = "updatelocation-" + this.props.location.entity._links.self.href;

		return (
			<div key={this.props.location.entity._links.self.href}>
				<a href={"#" + dialogId}>Update</a>
				<div id={dialogId} className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Update an location</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Update</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

};

class List extends PureComponent<StableListProps, StableListState> {
  private util: StableListUtils;
  private _currBatch: number;
  private _decrementVal: number;
  private _currDecBatch: number;
  private _itemRemainder: number;
  private _addedItem: boolean;
  private _didScrollUp: boolean;
  private directions: { top: "top"; bottom: "bottom" };
  private _batches: { start: number; end: number }[];
  private _compQueue: JSX.Element[];
  private _container: React.RefObject<HTMLDivElement>;
  private _scrollingContainer: React.RefObject<HTMLDivElement>;
  private _containerElem!: HTMLDivElement;
  private _scrollingContainerElem!: HTMLDivElement;
  private _id: string;

  constructor(props: StableListProps) {
    super(props);
    this._id = uuid();
    this.util = new StableListUtils(this.props, this._id);
    this._currBatch = 0;
    this._decrementVal = 0;
    this._currDecBatch = 0;
    this._itemRemainder = 0;

    this._addedItem = false;
    this._didScrollUp = false;

    this._batches = [];
    this._compQueue = [];
    this._container = createRef();
    this._scrollingContainer = createRef();

    this.state = { components: [] };
    this.directions = { top: "top", bottom: "bottom" };
  }

  componentDidMount() {
    this._batches = this.util.computeBatches(this.props);
    this._currBatch = this.props.direction == this.directions.top ? 0 : this._batches.length - 1;
    this._decrementVal = Math.floor(this.props.maxItems!! / this.props.threshold!!);
    this._itemRemainder = this.props.itemCount % this.props.threshold!;
    this._containerElem = this._container.current!;

    if (this._containerElem) {
      this._containerElem.addEventListener(
        "scroll",
        this.props.direction == this.directions.top
          ? this.directions.top && this.handleScroll
          : this.directions.bottom && this.handleScroll_inv
      );
    }

    this._scrollingContainerElem = this._scrollingContainer.current!;
    this.setState(
      {
        components: this.util.makeComponentBatch(this._batches, this._currBatch),
      },
      () => {
        if (this.props.direction == this.directions.bottom) {
          this._containerElem.scrollTop = this._containerElem.scrollHeight;
        }
      }
    );

    if (this.props.innerRef)
      this.props.innerRef.current = {
        updateAtIndex: this.updateAtIndex,
        updateBatchOfIndex: this.updateBatchOfIndex,
      };
  }

  componentDidUpdate(prevProps: StableListProps) {
    if (prevProps.dataKey != this.props.dataKey) {
      this._reconstruct();
    } else if (this.props.itemCount != prevProps.itemCount) {
      this.handleItemCountChange(this.props.itemCount - prevProps.itemCount);
    } else if (this._didScrollUp) {
      this._didScrollUp = false;
      this._containerElem.scrollTop = this._scrollingContainerElem.scrollHeight * 0.2;
    } else if (this._addedItem && this.props.followNewItems) {
      this._addedItem = false;
      this._containerElem.scrollTo(0, this._scrollingContainerElem.scrollHeight);
    }
  }

  _reconstruct = () => {
    this._compQueue = [];
    this._batches = this.util.computeBatches(this.props);
    this.util.data = this.props.data;

    this._currBatch = this.props.direction == this.directions.top ? 0 : this._batches.length - 1;
    this._currDecBatch = 0;
    this._decrementVal = Math.floor(this.props.maxItems! / this.props.threshold!);

    this._didScrollUp = false;

    this.setState({
      components: this.util.makeComponentBatch(this._batches, this._currBatch),
    });
  };

  hanldeScrolledToTop = () => {
    if (this._currBatch >= this._decrementVal) {
      this._currDecBatch = this._currBatch - this._decrementVal;
      this._didScrollUp = true;
      --this._currBatch;

      this.setState((prevState: StableListState) => ({
        components: this.util.updateComponents(
          prevState.components,
          this.util.makeComponentBatch(this._batches, this._currDecBatch),
          this.state.components.length >= this.props.maxItems!,
          this.props.maxItems! - this.props.threshold!,
          this.state.components.length % this.props.threshold! != 0
            ? this.props.threshold! + this._itemRemainder
            : this.props.threshold!,
          true
        ),
      }));
    }
  };

  hanldeScrolledToBottom = () => {
    this._currBatch += 1;
    this.setState((prevState) => ({
      components: this.util.updateComponents(
        prevState.components,
        this.util.makeComponentBatch(this._batches, this._currBatch),
        this.state.components.length >= this.props.maxItems!,
        0,
        this.props.threshold!,
        false
      ),
    }));
  };

  handleScroll = () => {


    const isTop = this.util.isScrolledToTop(this.props.horizontalScrolling!, this._containerElem);
    const isBottom = this.util.isScrolledToBottom(
      this.props.horizontalScrolling!,
      this._containerElem
    );

    if (isTop && this._currBatch != 0) this.hanldeScrolledToTop();
    else if (isBottom && this._currBatch + 1 < this._batches.length) this.hanldeScrolledToBottom();
  };

  hanldeScrolledToTop_inv = () => {
    --this._currBatch;
    this._didScrollUp = true;
    this.setState((prevState) => ({
      components: this.util.updateComponents(
        prevState.components,
        this.util.makeComponentBatch(this._batches, this._currBatch),
        this.state.components.length >= this.props.maxItems!,
        this.props.maxItems! - this.props.threshold!,
        this.state.components.length % this.props.threshold! != 0
          ? this.props.threshold! + this._itemRemainder
          : this.props.threshold!,
        true
      ),
    }));
  };

  hanldeScrolledToBottom_inv = () => {
    if (this._currBatch + this._decrementVal <= this._batches.length - 1) {
      this._currDecBatch = this._currBatch + this._decrementVal;
      ++this._currBatch;
      this.setState((prevState) => ({
        components: this.util.updateComponents(
          prevState.components,
          this.util.makeComponentBatch(this._batches, this._currDecBatch),
          this.state.components.length >= this.props.maxItems!,
          0,
          this.props.threshold!,
          false
        ),
      }));
    }
  };

  handleScroll_inv = () => {
    const isTop = this.util.isScrolledToTop(this.props.horizontalScrolling!, this._containerElem);
    const isBottom = this.util.isScrolledToBottom(
      this.props.horizontalScrolling!,
      this._containerElem
    );

    if (isTop && this._currBatch - 1 >= 0) this.hanldeScrolledToTop_inv();
    else if (isBottom) this.hanldeScrolledToBottom_inv();
  };

  handleItemCountChange = (diff: number) => {
    const topCon =
      this.props.direction == this.directions.top && this._currBatch == this._batches.length - 1;

    const bottomCon =
      this.props.direction == this.directions.bottom &&
      this._currBatch >= this._batches.length - this._decrementVal;

    const newItemsStart = this.props.itemCount - diff;
    this._compQueue = this.util.makeComponents(newItemsStart, this.props.itemCount);
    this._itemRemainder = this.props.itemCount % this.props.threshold!;

    if (topCon || bottomCon) {
      this._addedItem = true;
      this._batches = this.util.computeBatches(this.props);
      this._currBatch = this._batches.length - 1;
      this.util.data = this.props.data;

      this.setState(
        (prevState) => ({
          components: this.util.updateComponents(
            prevState.components,
            this._compQueue,
            this.state.components.length >= this.props.maxItems!,
            0,
            diff,
            false
          ),
        }),
        () => {
          this._compQueue = [];
        }
      );
    }
  };

  updateAtIndex = (index: number) => {
    if (index < 0) return;

    const targetIndex = this.util.getElementIndex(index);
    let components = ([] as JSX.Element[]).concat(this.state.components);
    components[targetIndex] = this.util.makeComponent(index);
    this.setState({ components });
  };

  updateBatchOfIndex = (index: number) => {
    if (index < 0) return;

    const targetBatch = this._batches.findIndex(
      (indexSet) => index >= indexSet.start && index <= indexSet.end
    );
    this.setState((prevState) => ({
      components: this.util.updateBatchOfIndex(
        this._batches,
        targetBatch,
        this.props.threshold!,
        prevState.components,
        this._currBatch
      ),
    }));
  };


  render() {
    return (
      <div
        className={clsx(this.props.className, "list-root", {
          "horizontal-scroll": this.props.horizontalScrolling,
        })}
        ref={this._container}
        style={this.props.style as CSSProperties}>
        <div className={"scrolling-container"} ref={this._scrollingContainer}>
          {this.state.components}
        </div>
      </div>
    );
  }

  static propTypes = {
    ref: propTypes.func,
    data: propTypes.array.isRequired,
    style: propTypes.oneOfType([propTypes.object, propTypes.array]),
    dataKey: propTypes.any.isRequired,
    innerRef: propTypes.shape({ current: propTypes.any }),
    maxItems: propTypes.number.isRequired,
    className: propTypes.string,
    itemCount: propTypes.number.isRequired,
    threshold: propTypes.number.isRequired,
    component: propTypes.elementType.isRequired,
    propProvider: propTypes.func.isRequired,
    followNewItems: propTypes.bool,
    horizontalScrolling: propTypes.bool,
    direction: propTypes.oneOf(["top", "bottom"]),
  };

  static defaultProps = {
    direction: "top",
    threshold: 20,
    maxItems: 60,
  };
}

const StableList = React.forwardRef((props: StableListProps, ref) => {
  return <List {...props} innerRef={ref} />;
});

export default StableList;