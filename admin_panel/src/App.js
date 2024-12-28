import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Add, Edit, Delete, Dashboard, Settings, Logout, Menu } from "@mui/icons-material";

const App = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: null });
  const [editItemId, setEditItemId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a small screen

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editItemId) {
        await axios.put(`http://localhost:5000/items/${editItemId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditItemId(null);
      } else {
        await axios.post("http://localhost:5000/items", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchItems();
      setForm({ name: "", price: "", image: null });
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditItemId(item._id);
    setForm({ name: item.name, price: item.price, image: null });
    setDialogOpen(true);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f3e5f5" }}>
      <CssBaseline />
      {/* AppBar for the menu button */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,
         bgcolor: '#2c003e',
         borderBottom: "2px solid #ffffff",
      }}>
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6">Admin Panel</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            bgcolor: "#2c003e",
            color: "#fff",
            borderRight: "2px solid #747474",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Manage Courses
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setDialogOpen(true)}
          sx={{ marginBottom: 3, bgcolor: "#2c003e" }}
        >
          Add Course
        </Button>

        {/* Dialog Form */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>{editItemId ? "Edit Course" : "Add Course"}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Course Name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              name="price"
              label="Price (DT/Month)"
              type="number"
              value={form.price}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              name="image"
              type="file"
              onChange={handleImageChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: "#1565c0" }}>
              {editItemId ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Items Grid */}
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ boxShadow: 0 }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:5000/${item.image}`}
                  alt={item.name}
                  sx={{
                    objectFit: "cover",
                    height: 200,
                    width: "100%",
                    backgroundColor: "#f3e5f5",
                    borderRadius: 1,
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography color="text.secondary">{item.price} DT/Month</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                    <IconButton color="primary" onClick={() => handleEdit(item)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item._id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
