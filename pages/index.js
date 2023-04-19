import React, { useState, useEffect } from "react";
import { Grid, Button, Box, Typography, Paper, ButtonGroup } from "@mui/material";
import Carousel from "../components/Carousel";

import Link from "next/link";

const IndexPage = () => {
  const [hotProducts, setHotProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setHotProducts(() => {
          const hotProductsIndexes = new Set();
          while (hotProductsIndexes.size < 4) {
            hotProductsIndexes.add(Math.floor(Math.random() * data.length));
          }
          return Array.from(hotProductsIndexes).map(
            (randomIndex) => data[randomIndex]
          );
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCategoryClick = (category) => {
    window.location.href = `/products/category/${category}`;
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item xs={6} md={3}>
              <Link href="/products">
                <Button variant="contained" fullWidth>
                  View All Products
                </Button>
              </Link>
              </Grid>
              <Grid item xs={6} md={3}>
                <Link href="/products/add">
                  <Button variant="contained" fullWidth>
                    Add Product
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 2, textAlign: "center", marginBottom: "1rem" }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Hot Products
            </Typography>
          </Box>
          <Carousel
            items={hotProducts.map((product) => ({
              id: product.id,
              image: product.image,
              title: product.title,
              price: product.price,
            }))}
            iconSize="small"
            onClickItem={(index) => {
              window.location.href = `/products/${hotProducts[index].id}`;
            }}
          />
          <Paper sx={{ mt: 8, p: 2 }}>
            <Box sx={{ textAlign: "center", marginBottom: "1rem" }}>
              <Typography variant="h6" component="h2" fontWeight="bold">
                Categories
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {categories.map((category) => (
                <Grid item xs={12} sm={6} md={3} key={category}>
                  <Link href={`/products/category/${category}`} underline="none" style={{ textDecoration: "none"}}>
                    <Paper
                      component="div"
                      sx={{
                        p: 2,
                        textAlign: "center",
                        cursor: "pointer",
                        ":hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <Typography variant="subtitle1" component="span">
                        {category}
                      </Typography>
                    </Paper>
                  </Link>
              </Grid>              
              ))}
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
};

export default IndexPage;
