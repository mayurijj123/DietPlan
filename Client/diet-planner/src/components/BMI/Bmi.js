import React, { useState, Component } from "react";
import Sidebar from "../Sidebar";
class Bmi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Guest",
      weight: 90,
      height: 180,
      bmi: 27,
      message: "",
      optimalweight: "",
      time: new Date().toLocaleTimeString(),
      showBmi: true,
    };
    this.submitMe = this.submitMe.bind(this);
    this.heightchange = this.heightchange.bind(this);
    this.weightchange = this.weightchange.bind(this);
    this.change = this.change.bind(this);
    this.ticker = this.ticker.bind(this);
    this.blur = this.blur.bind(this);
    this.calculateBMI = this.calculateBMI.bind(this);
  }

  heightchange(e) {
    this.setState({ height: e.target.value });
    e.preventDefault();
  }

  blur(e) {
    this.calculateBMI();
  }
  weightchange(e) {
    this.setState({ weight: e.target.value });
    e.preventDefault();
  }

  calculateBMI() {
    var heightSquared = ((this.state.height / 100) * this.state.height) / 100;
    var bmi = this.state.weight / heightSquared;
    localStorage.setItem("bmi", bmi);

    var low = Math.round(18.5 * heightSquared);
    var high = Math.round(24.99 * heightSquared);
    var message = "";
    if (bmi >= 18.5 && bmi <= 24.99) {
      message = "You are in a healthy weight range";
    } else if (bmi >= 25 && bmi <= 29.9) {
      message = "You are overweight";
    } else if (bmi >= 30) {
      message = "You are obese";
    } else if (bmi < 18.5) {
      message = "You are under weight";
    }
    this.setState({ message: message });
    this.setState({
      optimalweight:
        "Your suggested weight range is between " + low + " - " + high,
    });
    this.setState({ bmi: Math.round(bmi * 100) / 100 });
    this.setState({ showBmi: true });
  }

  submitMe(e) {
    e.preventDefault();
    this.calculateBMI();
  }

  ticker() {
    this.setState({ time: new Date().toLocaleTimeString() });
  }

  componentDidMount() {
    setInterval(this.ticker, 60000);
  }

  change(e) {
    e.preventDefault();
    console.log(e.target);
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1">
          <h2 className="ml-96 mb-20 mt-12 p-2 w-64 font-bold text-center justify-self-center bg-[#FFB26B] col-span-1 col-start-2 rounded-xl">
            BMI Calculator
          </h2>
          <form onSubmit={this.submitMe}>
            <label className="font-bold ml-12 text-md">Enter Name</label>
            <input
              className="bg-white border ml-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[600px] p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="abc"
              required
              type="text"
              name="name"
              value={this.state.name}
              onBlur={this.blur}
              onChange={this.change}
            />
            <label className="font-bold  ml-12 text-md">
              Enter height in cm:
            </label>
            <input
              className="bg-white border ml-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[600px] p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="00"
              required
              type="text"
              name="height"
              value={this.state.height}
              onBlur={this.blur}
              onChange={this.heightchange}
            />
            <label className="font-bold  ml-12 text-md">
              Enter weight in kg :
            </label>
            <input
              className="bg-white border ml-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[600px]"
              placeholder="00"
              required
              type="text"
              name="weight"
              value={this.state.weight}
              onChange={this.weightchange}
            />
            <input
              className="my-12  ml-12 p-2 w-40 font-bold text-center justify-self-center bg-[#FFB26B] col-span-1 col-start-2 rounded-xl"
              type="submit"
              value="Submit"
            ></input>
          </form>

          <div>
            <label
              className="font-bold text-xl ml-12 p-2
             hover:underline-offset-2"
            >
              {this.state.checked} {this.state.name} 's BMI is {this.state.bmi}{" "}
            </label>
            <div
              className="font-bold grid grid-rows-2 text-lg ml-12 p-4
             text-underline"
            >
              <label className="row-start-1 row-span-1">
                {this.state.message}
              </label>
              <label className="row-start-2 row-span-1">
                {this.state.optimalweight}
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bmi;
