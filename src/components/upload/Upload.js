import React, {Component} from 'react';
import Dropzone from './Dropzone';
import Progress from './Progress';
import './css/Upload.css';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }
  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files),
    }));
  }
  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === 'done' ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
  }
  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          className="buttonUpload"
          onClick={() =>
            this.setState({files: [], successfullUploaded: false})
          }>
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}>
          Upload
        </button>
      );
    }
  }

  async uploadFiles() {
    this.setState({uploadProgress: {}, uploading: true});
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({successfullUploaded: true, uploading: false});
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({successfullUploaded: true, uploading: false});
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener('progress', event => {
        if (event.lengthComputable) {
          const copy = {...this.state.uploadProgress};
          copy[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({uploadProgress: copy});
        }
      });

      req.upload.addEventListener('load', event => {
        const copy = {...this.state.uploadProgress};
        copy[file.name] = {state: 'done', percentage: 100};
        this.setState({uploadProgress: copy});
        resolve(req.response);
      });

      req.upload.addEventListener('error', event => {
        const copy = {...this.state.uploadProgress};
        copy[file.name] = {state: 'error', percentage: 0};
        this.setState({uploadProgress: copy});
        reject(req.response);
      });
      
      this.props.handleFile(file)


      const formData = new FormData();
      formData.append('image[img]', file, file.name);
      formData.append('image[alt]', file.name);
      // req.open('POST', 'http://localhost:3001');
      // req.send(formData);
    });
  }
  render() {
    return (
      <div className="Upload container-fluid">
        <span className="Title">Upload Files</span>
        <div className="Content row">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files col-sm">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        <div className="Actions col-sm align-self-end">{this.renderActions()}</div>
        </div>
      </div>
    );
  }
}
export default Upload;
