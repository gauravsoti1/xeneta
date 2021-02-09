# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn`

To install packages

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# Features

1. You can search inside origin and destination ports filter;
2. Origin won't be visible in destination filter and vice-versa.
3. Date format is kept consistent
4. Download graph data in svg format.
5. You can see market rates of a route on a line graph.
6. Filter market rates based on dates.
7. Contains theme file to be used consistently across everywhere

## Assumptions:

1. Data will never be too big and date filter can easily be applied on the frontend.

# Task 2:

Currently, graph data is downloadable as an svg. Svg is a scalable graphic and hence the image won't pixelate, no matter what
the graph size is. But some clients won't understand what an svg is, and for that we have two other approaches

1. Programatically take screenshot
2. Add svg inside a canvas, get the image data url from canvas and download that image.
