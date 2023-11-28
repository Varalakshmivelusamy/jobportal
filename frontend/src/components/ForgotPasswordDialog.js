// // ForgotPasswordDialog.js
// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

// const ForgotPasswordDialog = ({ open, onClose, onSendVerificationCode }) => {
//   const [email, setEmail] = useState('');

//   const handleSendVerificationCode = () => {
//     onSendVerificationCode(email);
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Forgot Password</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//         />
//         <Button variant="contained" color="primary" onClick={handleSendVerificationCode}>
//           Send Verification Code
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ForgotPasswordDialog;
