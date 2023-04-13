import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Tooltip
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  maxWidth: 700,
  height: "100%",
  margin: "auto",
});

const StyledCardContent = styled(CardContent)({
  textAlign: "left",
});

const StyledTypography = styled(Typography)({
  marginBottom: "1rem",
});

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} md={6}>
        <StyledCard>
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
          <StyledCardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
                {product.price} $
              </Typography>
              <Tooltip title={`${hoverRating ? hoverRating : product.rating.rate} ${product.rating.rate > 1 ? "stars" : "star"}`} placement="top">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    name="read-only"
                    value={product.rating.rate}
                    precision={0.1}
                    readOnly
                    onMouseEnter={(e) => setHoverRating(e.currentTarget.value)}
                    onMouseLeave={() => setHoverRating(null)}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({product.rating.count} reviews)
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {product.description}
            </Typography>
          </StyledCardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
