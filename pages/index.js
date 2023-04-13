import React, { useState, useEffect } from "react";
import { Grid, Button, Box, Typography, Paper } from "@mui/material";
import Carousel from "../components/Carousel";

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
          <Box sx={{ textAlign: "right", mt: 4 }}>
          <Button variant="contained" sx={{mr: 4}} href="/products">
              View All Products
          </Button>
          <Button variant="contained" href="/products/add">
              Add Product
          </Button>
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
                    onClick={() => handleCategoryClick(category)}
                  >
                    <Typography variant="subtitle1" component="span">
                      {category}
                    </Typography>
                  </Paper>
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
