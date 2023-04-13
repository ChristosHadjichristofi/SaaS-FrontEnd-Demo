import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const AddPage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [error, setError] = useState(false);
  const [productInfo, setProductInfo] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.title &&
      formData.price &&
      formData.description &&
      formData.image &&
      formData.category
    ) {
      fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: "",
            price: "",
            description: "",
            image: "",
            category: "",
          });
          setError(false);
          setProductInfo(data);
          setOpen(true);
        });
    } else {
      setError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
        <Box sx={{ mt: 2, textAlign: "center", marginBottom: "1rem" }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Add 🆕 Product
            </Typography>
        </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          value={formData.title}
          onChange={handleChange}
          label="Title"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="price"
          value={formData.price}
          onChange={handleChange}
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="description"
          value={formData.description}
          onChange={handleChange}
          label="Description"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="image"
          value={formData.image}
          onChange={handleChange}
          label="Image URL"
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="jewelery">Jewelery</MenuItem>
            <MenuItem value="men clothing">Men's Clothing</MenuItem>
            <MenuItem value="women clothing">Women's Clothing</MenuItem>
          </Select>
          {error && <FormHelperText>Please select a category</FormHelperText>}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          {productInfo && (
            <DialogContentText>
              <div>Product ID: {productInfo.id}</div>
              </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddPage;