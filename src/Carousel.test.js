import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function () {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("expects that when you’re on the second image, clicking the left arrow will move you to the first image", function () {
  const { container, debug } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("checks that the left arrow is missing when you’re on the first image", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  expect(
    container.querySelector(".bi.bi-arrow-left-circle")
  ).not.toBeInTheDocument();
});

it("checks that the rigth arrow is missing when you’re on the third image", function () {
  const { container, debug } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(
    container.querySelector(".bi.bi-arrow-right-circle")
  ).not.toBeInTheDocument();
});
