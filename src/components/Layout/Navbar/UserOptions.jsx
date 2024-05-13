import React, { Fragment, useState } from 'react';
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Backdrop, Box, Switch, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import toast from 'react-hot-toast';
import { logout } from '../../../redux/slices/userAuthSlice';


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const UserOptions = ({ user }) => {

  const { cartItems } = useSelector((state) => state.cart);
// const cartItems = ["1" , "2" , "3"]
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState('down');
  const [hidden, setHidden] = useState(false);

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  const options = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    {
      icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }} />,
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
  ];

  if (user?.role === 'admin') {
    options.unshift({ icon: <DashboardIcon />, name: 'Dashboard', func: dashboard });
  }

  function dashboard() {
    navigate('/admin/dashboard');
  }
  function orders() {
    navigate('/orders');
  }
  function account() {
    navigate('/account');
  }
  function cart() {
    navigate('/cart');
  }
  function logoutUser() {
    dispatch(logout());
    navigate('/');
    toast.success('Logout Successfully');
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: 100 }} />

      <StyledSpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        direction={direction}
        hidden={hidden}
        icon={<PersonPinIcon/>}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </StyledSpeedDial>

    </Fragment>
  );
};

export default UserOptions;
