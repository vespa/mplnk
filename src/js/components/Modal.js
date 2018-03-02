import React, {Component} from "react"
import PropTypes from 'prop-types'
import MenuItem from 'components/MenuItem';
class Modal extends Component {
  constructor() {
    super();
    this.state ={

    }
  }
  render() {
    const {id} = this.props;
    return (
          <div>
            <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalLabel">{this.props.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {this.props.children}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-info" data-dismiss="modal">close</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
  }
}
Modal.propTypes = {
  id: PropTypes.string.isRequired,
}
export default Modal;
