import React from "react";
import "jest-dom/extend-expect";
import Main, { AppProvider } from "../index.js";
import {
  render as rtlRender,
  cleanup,
  fireEvent
} from "@testing-library/react";
import * as utils from "../utils";

function render(ui) {
  return {
    ...rtlRender(<AppProvider>{ui}</AppProvider>)
  };
}

describe("App", () => {
  afterEach(cleanup);

  it("renders", () => {
    render(<Main />);
  });

  it("it has scene with sky and ground", () => {
    const { getByTestId } = render(<Main />);
    expect(getByTestId("Sky")).not.toBeNull();
    expect(getByTestId("Ground")).not.toBeNull();
  });

  it("has only one rocket on app init", () => {
    const { getAllByTestId } = render(<Main />);
    expect(getAllByTestId("Rocket").length).toBe(1);
  });

  it("should add rocket on button click", () => {
    const { getAllByTestId, getByText } = render(<Main />);

    expect(getAllByTestId("Rocket").length).toBe(1);
    fireEvent.click(getByText(/add rocket/i));

    expect(getAllByTestId("Rocket").length).toBe(2);
  });

  it("shouldn't allow to have more that 4 rockets", () => {
    const { getAllByTestId, getByText } = render(<Main />);
    const addBtn = getByText(/add rocket/i);

    expect(getAllByTestId("Rocket").length).toBe(1);

    fireEvent.click(addBtn); // add 2
    fireEvent.click(addBtn); // add 3
    fireEvent.click(addBtn); // add 4

    expect(addBtn).toBeDisabled();

    fireEvent.click(addBtn); // add 4
    expect(getAllByTestId("Rocket").length).toBe(4);
  });

  it("should allow remove rockets if more than one", () => {
    const { getAllByTestId, getByText } = render(<Main />);

    const rmBtn = getByText(/remove rocket/i);
    const addBtn = getByText(/add rocket/i);

    expect(rmBtn).toBeDisabled();

    fireEvent.click(addBtn); // add rocket
    fireEvent.click(addBtn); // add rocket
    fireEvent.click(addBtn); // add rocket

    expect(getAllByTestId("Rocket").length).toBe(4);

    fireEvent.click(rmBtn);
    expect(getAllByTestId("Rocket").length).toBe(3);

    fireEvent.click(rmBtn);
    expect(getAllByTestId("Rocket").length).toBe(2);

    fireEvent.click(rmBtn);
    expect(getAllByTestId("Rocket").length).toBe(1);

    fireEvent.click(rmBtn);
    expect(getAllByTestId("Rocket").length).toBe(1);
  });

  it("changes toggles night/day mode", () => {
    const { getByTestId } = render(<Main />);

    const ground = getByTestId("Ground");
    const sky = getByTestId("Sky");
    const btn = getByTestId("LightModeBtn");

    expect(ground).toHaveClass("ground--day");
    expect(sky).toHaveClass("sky--day");
    expect(btn).toHaveTextContent(/night mode: on/i);

    fireEvent.click(btn);
    expect(ground).toHaveClass("ground--night");
    expect(sky).toHaveClass("sky--night");
    expect(btn).toHaveTextContent(/night mode: off/i);
  });

  it("changes rocket color on click", () => {
    utils.getRandomRGB = jest.fn().mockReturnValueOnce("red");
    const { getByTestId } = render(<Main />);
    const rocket = getByTestId("Rocket");

    expect(rocket).toHaveStyle("fill: red");

    utils.getRandomRGB = jest.fn().mockReturnValueOnce("yellow");

    fireEvent.click(rocket);
    expect(rocket).toHaveStyle("fill: yellow");
  });
});
