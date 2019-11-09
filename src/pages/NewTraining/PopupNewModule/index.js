import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CKEditor from "components/CKEditor";
import AuthStorage from "utils/AuthStorage";
function mapStateToProps(state) {
  return {
    store: {
      isCreatedModule: state.isCreatedModule.isCreatedModule.data,
      loadingCreatedModule: state.isCreatedModule.isCreatedModule.loading
    }
  };
}

const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators({}, dispatch)
  };
};

class PopupNewModule extends Component {
  state = {
    description: "",
    fileToUpload: [],
    nameFile: "",
    imgSrc: ""
  };
  componentDidMount() { }

  fileSelectHandler = e => {
    let files = e.target.files;
    let { fileToUpload } = this.state;
    const reader = new FileReader();
    const file = files[0];
    const url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({
        imgSrc: reader.result
      });
    }.bind(this);

    fileToUpload.push(files[0]);
    this.setState({ fileToUpload: fileToUpload, nameFile: files[0].name });
  };

  handleNewModule = async () => {
    const { title } = this.refs;
    const { description, fileToUpload } = this.state;
    let thumbnail = {};
    if (fileToUpload.length > 0) {
      let data = new FormData();
      data.append("files", fileToUpload[0]);
      await this.props
        .UploadFile(data)
        .then(res => {
          return res.json();
        })
        .then(result => {
          thumbnail = result;
        });
    }
    this.props.handleCreateModule(
      title.value,
      description,
      thumbnail,
      AuthStorage.userInfo
    );
    this.form.reset();
    this.setState({
      description: "",
      fileToUpload: [],
      nameFile: "",
      imgSrc: ""
    });
    this.props.handleShowPopup();
  };

  handleChangeDescription = data => {
    this.setState({ description: data });
  };

  render() {
    const { isShow } = this.props;

    return (
      <div
        className={`modal bd-example-modal-lg fade ${isShow ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={
          isShow
            ? {
              display: "block",
              paddingRight: "15px"
            }
            : {}
        }
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add new module
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form ref={form => (this.form = form)}>
                <div className="form-group">
                  <label>Title (*)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter module title here"
                    ref="title"
                  />
                </div>
                <div className="form-group">
                  <label>Description (*)</label>
                  <CKEditor
                    handleChangeDescription={this.handleChangeDescription}
                    defaultData="Enter data in here..."
                  />
                </div>
                <div className="form-group">
                  <label>Thumbnail</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      onChange={this.fileSelectHandler}
                      id="customFile"
                      lang="en"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {this.state.nameFile !== ""
                        ? this.state.nameFile
                        : "Choose file"}
                    </label>
                  </div>
                </div>
                {this.state.imgSrc !== "" && (
                  <div className="mt-3 text-center mb-3">
                    <img src={this.state.imgSrc} alt="" />
                  </div>
                )}
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn bg-root-active"
                onClick={this.handleNewModule}
              >
                Add
                  </button>
              <button
                type="button"
                className="btn bg-secondary"
                data-dismiss="modal"
                onClick={this.props.handleShowPopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupNewModule);
