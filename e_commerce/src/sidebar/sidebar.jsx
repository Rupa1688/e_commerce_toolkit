import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import './index.css';
import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
//sidebar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function SidebarData({cartData}) {
  console.log("cartInSidebarrrrrrrrrrrr",cartData);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    // const cart = useSelector((state) => state.cart?.cart)
    // const cart = JSON.parse(localStorage?.getItem("cart"))
    
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const logout=()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("data")
      navigate("/user/login")
      window.location.reload()
  }
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    );  const handleDrawerOpen = () => {
    setOpen(true);
  };
 
console.log('cartData',cartData);

  const getTotalQuantity = () => {
    // let total = 0
    // cartData?.length >0 && cartData?.forEach(item => {
    //   console.log("item11",item);

    //    total +=item && item !==undefined ? item.quantity:0
      
    // })
    // return total
    return  cartData && cartData !== undefined && cartData?.length > 0 ?cartData?.length:0;
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate=useNavigate()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Shopping
          </Typography>
          <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                // aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                className='profile_cust'
              >
                <AccountCircle />
              </IconButton>
              {/* <div className='shopping-cart' onClick={() => navigate('/cart')}> */}
  {/* <ShoppingCart id='cartIcon'/> */}
  <IconButton aria-label="cart"  className='iconCart' style={{ color: 'white'}} onClick={() => navigate('/product/cart')}>
      <StyledBadge badgeContent={getTotalQuantity() || 0} color="secondary">
        <ShoppingCartIcon/>
      </StyledBadge>
    </IconButton>
  {/* <p>{getTotalQuantity() || 0}</p>
</div> */}
        </Toolbar>
      </AppBar>      
        {renderMenu}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>        
            <ListItem>
                <ListItemIcon>
                <PeopleOutlinedIcon />
                 </ListItemIcon> 
                 <Button onClick={()=>navigate("/user/add" )}>Add User</Button>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                   <HomeOutlinedIcon />  
                </ListItemIcon> 
               <Button onClick={()=>navigate("/user/login" )}>Login</Button>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                  <ContactsOutlinedIcon />  
                </ListItemIcon> 
                <Button onClick={()=>navigate("/product/admin/addCategory" )}>ADD Category</Button>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                  <ReceiptOutlinedIcon />  
                </ListItemIcon> 
                <Button onClick={()=>navigate("/product/admin/addSubCategory" )}>ADD SubCategory</Button>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                  <InboxIcon />  
                </ListItemIcon> 
                <Button onClick={()=>navigate("/product/admin/addProduct" )}>ADD Product</Button>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                  <InboxIcon />   
                </ListItemIcon> 
                <Button onClick={()=>navigate("/product/admin/addVariant" )}>ADD Variant</Button>
            </ListItem>  
            <ListItem>
                <ListItemIcon>
                  <InboxIcon />   
                </ListItemIcon> 
                <Button onClick={()=>navigate("/product/admin/addAttribute" )}>ADD Attribute</Button>
            </ListItem>              
            <ListItem>
                <ListItemIcon>
                  <InboxIcon />   
                </ListItemIcon> 
                <Button onClick={()=>navigate("/product/admin/addPromocode" )}>ADD Promocode</Button>
            </ListItem>        
            <ListItem>
                <ListItemIcon>
                  <InboxIcon />   
                </ListItemIcon> 
                <Button onClick={()=>navigate("/product/admin/GetPromocode" )}>Get Promocode</Button>
            </ListItem>             
        </List>
        <Divider />
        <List>
        <ListItem>
                <ListItemIcon>
                  <InboxIcon />  
                </ListItemIcon> 
                <Button onClick={()=>navigate("/product/category" )}>category</Button>
            </ListItem>         
        </List>
      </Drawer>     
    </Box>
  );
}
