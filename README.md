### Introduction
- Welcome to the Courier Service Application! This command-line application is designed to help entrepreneurs like Kiki manage their small distance courier service efficiently. Whether you need to estimate delivery costs with offers or calculate estimated delivery times, this application has got you covered.

### Features
- Delivery Cost Estimation with Offers: Estimate the total delivery cost of each package with an offer code (if applicable).
- Delivery Time Estimation: Calculate the estimated delivery time for every package by maximizing the number of packages in every shipment.

## **Problem 01**

### Delivery cost estimation

This problems involves a calculation of price of a package after the offer code has been applied on it. Each offer code comes with a restrictions ie- upper bound and lower bounds on the distance and weights of the package that has to be delivered .

only one offer code can applied on any package.

total delivery cost is calculated based on

## base delivery cost + weight _ unit weight cost + distance _ unit distance cost

offer code is applied on the total delivery cost if applicable and the actual cost of the package is calculated by subtracting the discount amount from the total delivery cost

offercodes are stored in json format and retrived as a file and new offercodes can be added. Updating and deleting the offercodes functionality ate not implemented due time constraints.

## **Problem 02**

This problem involves estimation of the delivery time for all the packages based on the weights given.Heavier packages has to be chosen among the available packages but below the maximum carriable capacity of the vehicle. The shipment which can be delivered first has to be chosen when their weights are same.

### Certain Assumptions made

- All vehicles travel at the same speed and in same route

* All destinations are covered in a single route

## Packages used

- chalk --> to style the strings in hte command line
* cli-table3 --> to render the table on the command line
* figlet --> to implement the big font spec on the terminal
* inquirer --> to implement the ask question feature
* jest --> to write tests 

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. ***Clone the repository:***

    - git clone courier-service
    - cd courier-service
    
2. ***Install dependencies:***

    - npm install

3. ***Run the application:***
    
    - npm run start
   
4. ***Run the tests:***

   - npm run test

