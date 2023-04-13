import React, { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Link } from "@mui/material";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const categoryName = router.query.categoryName;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryName) {
      fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        });
    }
  }, [categoryName]);

  return (
    <>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Link href={`/products/${product.id}`} underline="none">
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
    </>
  );
};

const ProductsPage = () => {
  return (
    <>
      <Products />
    </>
  );
};

export default ProductsPage;