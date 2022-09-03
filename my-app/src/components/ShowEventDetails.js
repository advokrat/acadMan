import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton'
import axios from 'axios';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';

var curr = new Date();
curr.setDate(curr.getDate() + 3);
var date = curr.toISOString().substr(0,10);

const defaultDateValue = new Date(date).toISOString().split('T')[0]
const defaultTimeValue = "00:00"

function ShowEventDetails({ event: event }) {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (event) => {

    }

    return (
        <div>
        <Dialog show={show} onClose={handleClose}>
          <DialogTitle>
             Greetings from GeeksforGeeks
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you do coding ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
             Close
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
             Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default ShowEventDetails;