import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const PasswordDialog = (props) => {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={props.needPassword}
      onClose={props.onClose}
    >
      <DialogTitle>Insira sua senha</DialogTitle>
      <DialogContent className='ds-dialog-content'>
        <TextField
          label='Senha'
          type='password'
          value={props.password}
          onChange={props.handlePasswordChange}
          margin='normal'
        />
      </DialogContent>
      <DialogActions>
        <Button className='ds-password-dialog-button' color='primary' onClick={props.onClose}>Confirmar</Button>
        <Button className='ds-password-dialog-button' color='primary' onClick={props.onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PasswordDialog;