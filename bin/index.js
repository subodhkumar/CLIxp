#!/usr/bin/env node

const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "first_name",
    message: "Whats your first name?",
  },
  {
    type: "input",
    name: "last_name",
    message: "Whats your last name?",
    default() {
      return `Doe`;
    },
  },
  {
    type: "input",
    name: "phone",
    message: "Whats your phone number?",
    validate(value) {
      const pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }
      return "Please enter a valid phone number";
    },
  },
];
inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(JSON.stringify(answers, null, "\t"));
  })
  .catch((err) => {});

