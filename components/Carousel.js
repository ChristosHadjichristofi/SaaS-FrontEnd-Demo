import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  ArrowBackIosNew as PrevIcon,
  ArrowForwardIos as NextIcon,
} from "@mui/icons-material";
import Link from "next/link";

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % items.length);
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s",
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              flex: "0 0 auto",
              width: "100%",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Link href={`/products/${item.id}`} passHref>
              <div
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      maxWidth: "25%",
                      maxHeight: "25%",
                      cursor: "pointer",
                    }}
                  />
                </Box>
                <Box sx={{ mt: 1, textAlign: "center" }}>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography variant="subtitle2">{`${item.price} $`}</Typography>
                </Box>
              </div>
            </Link>
          </Box>
        ))}
      </Box>
      <IconButton
        sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
        onClick={handlePrev}
        disabled={activeIndex === 0}
      >
        <PrevIcon />
      </IconButton>
      <IconButton
        sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
        onClick={handleNext}
        disabled={activeIndex === items.length - 1}
      >
        <NextIcon />
      </IconButton>
    </Box>
  );
};

export default Carousel;
