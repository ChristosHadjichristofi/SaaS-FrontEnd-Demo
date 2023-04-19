import React, { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Button } from "@mui/material";

import Link from "next/link";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [mode, setMode] = useState("card");

  const handleModeChange = (e) => {
    if (e.target.value === "card") {
      setMode("card");
      return;
    }
    else if (e.target.value === "table") {
      setMode("table");
      return;
    }
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const downloadImage = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCardMode = () => {
    return (
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Link href={`/products/${product.id}`} underline="none" style={{ textDecoration: "none" }}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
                <CardContent sx={{ height: "100%", overflow: "auto" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.price} $
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderTableMode = () => {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price} $</TableCell>
                <TableCell>
                  <Button onClick={() => downloadImage(product.image, `${product.title}.jpg`)}>
                    <img src={product.image} alt={product.title} style={{ width: "100px", height: "auto" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <select value={mode} onChange={handleModeChange}>
          <option value="card">Card</option>
          <option value="table">Table</option>
        </select>
      </div>
      {mode === "card" ? renderCardMode() : renderTableMode()}
    </>
  );
};

export default ProductsPage;
