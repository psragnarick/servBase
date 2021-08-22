import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">ServBase</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
              <Route exact path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/business/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.locate}
          </td>
          <td>
            {this.props.obj.product}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangeName.bind(this);
    this.onChangeBusinessName = this.onChangeLocation.bind(this);
    this.onChangeGstNumber = this.onChangeProduct.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      locate: '',
      product:''
    }
  }
  onChangeName(e) {
    this.setState({
      person_name: e.target.value
    });
  }
  onChangeLocation(e) {
    this.setState({
      business_name: e.target.value
    })
  }
  onChangeProduct(e) {
    this.setState({
      business_gst_number: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      locate: this.state.locate,
      product: this.state.product
    };
    axios.post('http://localhost:4000/business/add', obj)
        .then(res => console.log(res.data));

    this.setState({
      name: '',
      locate: '',
      product: ''
    })
  }

  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Add New Business</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Business Name:  </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      />
                </div>
                <div className="form-group">
                    <label>Location: </label>
                    <input type="text"
                      className="form-control"
                      value={this.state.locate}
                      onChange={this.onChangeLocation}
                      />
                </div>
                <div className="form-group">
                    <label>Service: </label>
                    <input type="text"
                      className="form-control"
                      value={this.state.product}
                      onChange={this.onChangeProduct}
                      />
                </div>
                <div className="form-group">
                    <input type="submit"
                      value="Register Business"
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}

xport default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      locate: '',
      product:''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/business/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({
                name: response.data.name,
                locate: response.data.locate,
                product: response.data.product });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeLocation(e) {
    this.setState({
      locate: e.target.value
    })
  }
  onChangeProduct(e) {
    this.setState({
      product: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      locate: this.state.locate,
      product: this.state.product
    };
    axios.post('http://localhost:4000/business/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));

    this.props.history.push('/index');
  }

  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Person Name:  </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      />
                </div>
                <div className="form-group">
                    <label>Business Name: </label>
                    <input type="text"
                      className="form-control"
                      value={this.state.locate}
                      onChange={this.onChangeLocation}
                      />
                </div>
                <div className="form-group">
                    <label>GST Number: </label>
                    <input type="text"
                      className="form-control"
                      value={this.state.product}
                      onChange={this.onChangeProduct}
                      />
                </div>
                <div className="form-group">
                    <input type="submit"
                      value="Update Business"
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {business: []};
    }
    componentDidMount(){
      axios.get('http://localhost:4000/business')
        .then(response => {
          this.setState({ business: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.business.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">Business List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Product</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }




/*import React from "react";
class MemeGenerator extends React.Component {
  state = {
    topText: "",
    bottomText: "",
    allMemeImgs: [],
    randomImg: ""
  };
 
  componentDidMount() {
     
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(content =>
        this.setState({
          allMemeImgs: content.data.memes
        })
      );
  }
 
  handleChange = event => {
    const { name, value } = event.target;
     
    this.setState({
      [name]: value
    });
  };
 
  handleSubmit = event => {
    event.preventDefault();
    const { allMemeImgs } = this.state;
    const rand =
      allMemeImgs[Math.floor(Math.random()
      * allMemeImgs.length)].url;
    this.setState({
      randomImg: rand
    });
  };
 
  render() {
    return (
      <div>
        // Controlled form
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter Text"
            type="text"
            value={this.state.topText}
            name="topText"
            onChange={this.handleChange}
          />
          <input
            placeholder="Enter Text"
            type="text"
            value={this.state.bottomText}
            name="bottomText"
            onChange={this.handleChange}
          />
          <button>Generate</button>
        </form>
 
        <br />
        <div className="meme">
          {this.state.randomImg === "" ? "" :
            <img src={this.state.randomImg} alt="meme" />}
          {this.state.randomImg === "" ? "" :
            <h2 className="top">{this.state.topText}</h2>}
          {this.state.randomImg === "" ? "" :
            <h2 className="bottom">{this.state.bottomText}</h2>}
        </div>
      </div>
    );
  }
}
 
export default MemeGenerator;*/
