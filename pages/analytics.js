import React from "react";
import { Grid, Box, Paper, Typography } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ChartPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

const getRandomOptions = () => {
  const chartTypes = ["line", "bar", "area", "spline"];
  const chartType = chartTypes[Math.floor(Math.random() * chartTypes.length)];
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push(Math.random());
  }
  return {
    chart: {
      type: chartType,
    },
    title: {
      text: `Random ${chartType} Chart`,
    },
    xAxis: {
      categories: ["A", "B", "C", "D", "E"],
    },
    yAxis: {
      title: {
        text: "Values",
      },
    },
    series: [
      {
        name: "Series 1",
        data,
      },
    ],
  };
};

const HighChartsPage = () => {
  return (
    <Root>
      <Box sx={{ mt: 2, textAlign: "center", marginBottom: "1rem" }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Highcharts Demo
            </Typography>
        </Box>
      <Grid container spacing={2}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ChartPaper>
              <HighchartsReact highcharts={Highcharts} options={getRandomOptions()} />
            </ChartPaper>
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default HighChartsPage;
