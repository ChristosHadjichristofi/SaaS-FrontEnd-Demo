import React, { useState, useEffect } from "react";
import { Grid, Box, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledGrid = styled(Grid)({
  margin: "2rem 0",
});

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  height: "100%",
  alignItems: "center"
});

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "70%"
});

const StyledTypography = styled(Typography)({
  marginBottom: "1rem",
});

const Cart = ({ cart, products }) => {
  const handlePay = () => {
    // TODO: Implement order completion logic
    console.log("Order completed");
  };

  const total = cart.products.reduce(
    (total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + product.price * item.quantity;
    },
    0
  );

  return (
    <>
      <StyledGrid container spacing={2}>
        {cart.products.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <Grid item xs={12} key={product.id}>
              <StyledCard>
                <CardMedia
                  style={{paddingLeft: "1rem"}}
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{ width: 100 }}
                />
                <StyledCardContent>
                  <Typography variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <StyledTypography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
                    Quantity: {item.quantity}
                  </StyledTypography>
                  <StyledTypography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
                    Price: {product.price} $
                  </StyledTypography>
                </StyledCardContent>
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "30%", paddingRight: "1rem" }}>
                <Typography variant="h6" color="primary">
                    {product.price * item.quantity} $
                </Typography>
                </Box>
              </StyledCard>
            </Grid>
          );
        })}
      </StyledGrid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 2 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          Total:
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {total} $
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handlePay}>
          Pay Now
        </Button>
      </Box>
    </>
  );
};

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Get a random cart from the API
    fetch("https://fakestoreapi.com/carts")
      .then((response) => response.json())
      .then((data) => {
        const randomCart = data[Math.floor(Math.random() * data.length)];
        setCart(randomCart);
        // Fetch product details for each product in the cart
        const productIds = randomCart.products.map((product) => product.productId);
        fetch(`https://fakestoreapi.com/products?ids=${productIds.join(",")}`)
          .then((response) => response.json())
          .then((data) => {
            setProducts(data);
          });
      });
  }, []);

  if (!cart || !products.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Cart cart={cart} products={products} />
    </>
  );
};

export default CartPage;
