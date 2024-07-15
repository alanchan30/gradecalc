// HOME SCREEN

// Creates variables that will store the weight of the categories
var categoryWeight1;
var categoryWeight2;
var categoryWeight3;

// Defaults the weights of each category with HCPS weights
setNumber("categorySlider1", 20);
setNumber("categorySlider2", 30);
setNumber("categorySlider3", 50);

// Updates the weights so it is displayed on the screen
updateCategoryWeights();

// Changes the weight of the first category using a slider
onEvent("categorySlider1", "input", function( ) {
  categoryWeight1 = getNumber("categorySlider1");
  // Updates the text displayed next to the slider
  setProperty("categoryDisplay1", "text", categoryWeight1 + "%");
  // Makes sure that the total of all three weights is equal to 100
  if(categoryWeight1 + categoryWeight2 + categoryWeight3 > 100) {
    setNumber("categorySlider3", 100 - categoryWeight1 - categoryWeight2);
    updateCategoryWeights();
    if(categoryWeight3 <= 0) {
      setNumber("categorySlider3", 0);
      setNumber("categorySlider2", 100 - categoryWeight1);
      updateCategoryWeights();
    }
  }
  if(categoryWeight1 + categoryWeight2 + categoryWeight3 < 100) {
    setNumber("categorySlider3", 100 - categoryWeight1 - categoryWeight2);
    updateCategoryWeights();
  }
});

// Changes the weight of the second category using a slider
onEvent("categorySlider2", "input", function( ) {
  categoryWeight2 = getNumber("categorySlider2");
  // Updates the text displayed next to the slider
  setProperty("categoryDisplay2", "text", categoryWeight2 + "%");
  // Makes sure that the total of all three weights is equal to 100
  if(categoryWeight1 + categoryWeight2 + categoryWeight3 > 100) {
    setNumber("categorySlider3", 100 - categoryWeight1 - categoryWeight2);
    updateCategoryWeights();
    if(categoryWeight3 <= 0) {
      setNumber("categorySlider3", 0);
      setNumber("categorySlider1", 100 - categoryWeight2);
      updateCategoryWeights();
    }
  }
  if(categoryWeight1 + categoryWeight2 + categoryWeight3 < 100) {
    setNumber("categorySlider3", 100 - categoryWeight1 - categoryWeight2);
    updateCategoryWeights();
  }
});

// Changes the weight of the third category using a slider
onEvent("categorySlider3", "input", function( ) {
  categoryWeight3 = getNumber("categorySlider3");
  // Updates the text displayed next to the slider
  setProperty("categoryDisplay3", "text", categoryWeight3 + "%");
  // Makes sure that the total of all three weights is equal to 100
  if(categoryWeight1 + categoryWeight2 + categoryWeight3 > 100) {
    setNumber("categorySlider2", 100 - categoryWeight1 - categoryWeight3);
    updateCategoryWeights();
    if(categoryWeight2 <= 0) {
      setNumber("categorySlider2", 0);
      setNumber("categorySlider1", 100 - categoryWeight3);
      updateCategoryWeights();
    }
  }
  if(categoryWeight1 + categoryWeight2 + categoryWeight3 < 100) {
    setNumber("categorySlider2", 100 - categoryWeight1 - categoryWeight3);
    updateCategoryWeights();
  }
});


// GRADE CALCULATOR SCREEN

// Creates empty lists to store information of each grade
var numerator = [];
var denominator = [];
var category = [];

// Creates empty lists to store sorted information of each grade and category
var numeratorCat1 = [];
var denominatorCat1 = [];
var numeratorCat2 = [];
var denominatorCat2 = [];
var numeratorCat3 = [];
var denominatorCat3 = [];

// Creates variable to keep track whether a category has been added
var catCount1 = 0;
var catCount2 = 0;
var catCount3 = 0;

// Creates variable to store total numerator and denominator point values of each category
var numTotalCat1 = 0;
var denTotalCat1 = 0;
var numTotalCat2 = 0;
var denTotalCat2 = 0;
var numTotalCat3 = 0;
var denTotalCat3 = 0;

// Changes the method of inputting grades from individual to categorical
onEvent("calculationDropdown", "change", function( ) {
  // Resets the display above to display categorical weights as a reminder
  setProperty("gradeCategoryDisplay", "text", "C1: " + categoryWeight1 
  + "%    C2: " + categoryWeight2 + "%    C3: " + categoryWeight3 + "%");
  setProperty("gradeCategoryDisplay", "text-color", rgb(204, 208, 0));
  // Resets lists and changes button menu when method of input changes
  if(getText("calculationDropdown") == "Total Category Points") {
    numerator = [];
    denominator = [];
    category = [];
    showElement("setTotalPointsButton");
    showElement("clearLatestButton");
    hideElement("gradeAppendButton");
    hideElement("gradeRemoveButton");
    
  }
  else {
    numerator = [];
    denominator = [];
    category = [];
    showElement("gradeAppendButton");
    showElement("gradeRemoveButton");
    hideElement("setTotalPointsButton");
    hideElement("clearLatestButton");
  }
});

// Sets the total numerical points of the category after input
onEvent("setTotalPointsButton", "click", function( ) {
  // Prompts user to input valid choices if they have not
  if(getText("numeratorGradeInput") == "" || getText("denominatorGradeInput") == "" || getText("categoryDropdown") == "Select Category:") {
    setProperty("gradeCategoryDisplay", "text", "Please input valid choices!");
    setProperty("gradeCategoryDisplay", "text-color", rgb(254, 1, 4));
    // Clears inputs if they were not valid, keeps them if they were
    if(isNaN(getText("numeratorGradeInput")) || isNaN(getText("denominatorGradeInput"))) {
      setProperty("numeratorGradeInput", "value", "");
      setProperty("denominatorGradeInput", "value", "");
    }
    setProperty("categoryDropdown", "text", "Select Category:");
  }
  else {
    // Resets inputs if valid numbers are not inputted
    if(isNaN(getText("numeratorGradeInput")) || isNaN(getText("denominatorGradeInput"))) {
      setProperty("gradeCategoryDisplay", "text", "Please input a valid number!");
      setProperty("gradeCategoryDisplay", "text-color", rgb(254, 1, 4));
      setProperty("numeratorGradeInput", "value", "");
      setProperty("denominatorGradeInput", "value", "");
      setProperty("categoryDropdown", "text", "Select Category:");
    }
    else {
      catCount1 = 0;
      catCount2 = 0;
      catCount3 = 0;
      // Checks to see if a category has already been inputted
      for(var j = 0; j < category.length; j++) {
        if(category[j] == "Category 1") {
          catCount1++;
        }
        else if(category[j] == "Category 2") {
          catCount2++;
        }
        else if(category[j] == "Category 3") {
          catCount3++;
        }
      }
      // If category attempted to be inputted has already been inputted, it will not add
      if((getText("categoryDropdown") == "Category 1" && catCount1 >= 1) ||
      (getText("categoryDropdown") == "Category 2" && catCount2 >= 1) ||
      (getText("categoryDropdown") == "Category 3" && catCount3 >= 1)) {
        setProperty("gradeCategoryDisplay", "text", "Category already inputted!");
        setProperty("gradeCategoryDisplay", "text-color", rgb(254, 1, 4));
      }
      else {
        setProperty("gradeCategoryDisplay", "text", "Successfully added!");
        setProperty("gradeCategoryDisplay", "text-color", rgb(19, 208, 0));
        appendItem(numerator, getNumber("numeratorGradeInput"));
        appendItem(denominator, getNumber("denominatorGradeInput"));
        appendItem(category, getText("categoryDropdown"));
      }
      // Clears values for next use
      setProperty("numeratorGradeInput", "value", "");
      setProperty("denominatorGradeInput", "value", "");
      setProperty("categoryDropdown", "text", "Select Category:");
    }
  }
 });

// Removes the latest addition of categorical values
onEvent("clearLatestButton", "click", function( ) {
  // Removes last item in lists if lists are not empty
  if(numerator.length != 0) {
    removeItem(numerator, numerator.length - 1);
    removeItem(denominator, denominator.length - 1);
    removeItem(category, category.length - 1);
    // If list is empty after recent removal, it will tell user
    if(numerator.length == 0) {
      setProperty("gradeCategoryDisplay", "text", "All has been removed!");
      setProperty("gradeCategoryDisplay", "text-color", rgb(204, 208, 0));
    }
    // Tells user the most recent input has been removed
    else {
      setProperty("gradeCategoryDisplay", "text", "Successfully removed!");
      setProperty("gradeCategoryDisplay", "text-color", rgb(19, 208, 0));
    }
  }
  // Tells user list is completely empty after most recent removal
  else {
    setProperty("gradeCategoryDisplay", "text", "All has been removed!");
    setProperty("gradeCategoryDisplay", "text-color", rgb(204, 208, 0));
  }
});

// Adds individual grade value to all grades
onEvent("gradeAppendButton", "click", function( ) {
  // Prompts user to input valid choice if they have not
  if(getText("numeratorGradeInput") == "" || getText("denominatorGradeInput") == "" || getText("categoryDropdown") == "Select Category:") {
    setProperty("gradeCategoryDisplay", "text", "Please input valid choices!");
    setProperty("gradeCategoryDisplay", "text-color", rgb(254, 1, 4));
    // Clears inputs if they were not valid, keeps them if they are
    if(isNaN(getText("numeratorGradeInput")) || isNaN(getText("denominatorGradeInput"))) {
      setProperty("numeratorGradeInput", "value", "");
      setProperty("denominatorGradeInput", "value", "");
    }
    setProperty("categoryDropdown", "text", "Select Category:");
  }
  else {
    // If a valid number is not inputted, then it clears all inputs
    if(isNaN(getText("numeratorGradeInput")) || isNaN(getText("denominatorGradeInput"))) {
      setProperty("gradeCategoryDisplay", "text", "Please input a valid number!");
      setProperty("gradeCategoryDisplay", "text-color", rgb(254, 1, 4));
      setProperty("numeratorGradeInput", "value", "");
      setProperty("denominatorGradeInput", "value", "");
      setProperty("categoryDropdown", "text", "Select Category:");
    }
    // Adds individual grade value and clears inputs for next use
    else {
      setProperty("gradeCategoryDisplay", "text", "Successfully added!");
      setProperty("gradeCategoryDisplay", "text-color", rgb(19, 208, 0));
      appendItem(numerator, getNumber("numeratorGradeInput"));
      appendItem(denominator, getNumber("denominatorGradeInput"));
      appendItem(category, getText("categoryDropdown"));
      setProperty("numeratorGradeInput", "value", "");
      setProperty("denominatorGradeInput", "value", "");
      setProperty("categoryDropdown", "text", "Select Category:");
    }
  }
 });

// Removes the most recent individual grade
onEvent("gradeRemoveButton", "click", function( ) {
  // Removes latest value in lists if lists are not empty
  if(numerator.length != 0) {
    removeItem(numerator, numerator.length - 1);
    removeItem(denominator, denominator.length - 1);
    removeItem(category, category.length - 1);
    // Lets user know if lists are completely empty after latest removal
    if(numerator.length == 0) {
      setProperty("gradeCategoryDisplay", "text", "All has been removed!");
      setProperty("gradeCategoryDisplay", "text-color", rgb(204, 208, 0));
    }
    // Lets user know that most recent removal was successful
    else {
    setProperty("gradeCategoryDisplay", "text", "Successfully removed!");
    setProperty("gradeCategoryDisplay", "text-color", rgb(19, 208, 0));
    }
  }
  // Lets user know list is completely empty
  else {
    setProperty("gradeCategoryDisplay", "text", "All has been removed!");
    setProperty("gradeCategoryDisplay", "text-color", rgb(204, 208, 0));
  }
});

// Resets display to show grades when clicked so they can choose the correct intended category
onEvent("categoryDropdown", "click", function( ) {
  setProperty("gradeCategoryDisplay", "text", "C1: " + categoryWeight1 
  + "%    C2: " + categoryWeight2 + "%    C3: " + categoryWeight3 + "%");
  setProperty("gradeCategoryDisplay", "text-color", rgb(204, 208, 0));
});

// Shows what grade on next assignment is needed to get wanted grade
onEvent("gradeTestButton", "click", function( ) {
  // Prompts user to input valid choices if they have not
  if(getText("gradeTotalInput") == "" || getText("overallGradeInput") == "" || getText("categoryDropdown2") == "Select Category:") {
    setProperty("neededValue", "text", "Please input valid choices!");
    setProperty("neededValue", "text-color", rgb(254, 1, 4));
    // If valid number is not inputted, then the inputs are cleared
    if(isNaN(getText("gradeTotalInput")) || isNaN(getText("overallGradeInput"))) {
      setProperty("gradeTotalInput", "value", "");
      setProperty("overallGradeInput", "value", "");
    }
    setProperty("categoryDropdown", "text", "Select Category:");
  }
  else {
    // Prompts user to input valid numbers and clears inputs
    if(isNaN(getText("gradeTotalInput")) || isNaN(getText("overallGradeInput"))) {
      setProperty("neededValue", "text", "Please input a valid number!");
      setProperty("neededValue", "text-color", rgb(254, 1, 4));
      setProperty("gradeTotalInput", "value", "");
      setProperty("overallGradeInput", "value", "");
      setProperty("categoryDropdown2", "text", "Select Category:");
    }
    // Updates all lists and calculates the totals of each category
    else {
      updatedList();
      calculateTotals(4);
      // Tells user the grade is not attainable if returned value is not a number
      if(isNaN(calculateScore(getText("categoryDropdown2")))) {
        setProperty("neededValue", "text", "This Needed Grade is NOT Possible");
        setProperty("neededValue", "text-color", rgb(254, 1, 4));
      }
      // Tells user the point value and percentage they need to obtain wanted grade
      else {
        setProperty("neededValue", "text", "Needed Grade: ≥ " + 
        Math.round(calculateScore(getText("categoryDropdown2")) + 0.499999) + " points or ≥ " +
        Math.round(calculateScore(getText("categoryDropdown2")) / getNumber("gradeTotalInput")
        * 100 + 0.499999) + "%");
        setProperty("neededValue", "text-color", rgb(19, 208, 0));
      }
      // Clears all inputs for next use
      setProperty("gradeTotalInput", "value", "");
      setProperty("overallGradeInput", "value", "");
      setProperty("categoryDropdown2", "text", "Select Category:");
    }
  }
 });

// Resets display to empty values when clicked so it is ready for next use
onEvent("categoryDropdown2", "click", function( ) {
  setProperty("neededValue", "text", "Needed Grade: ≥ ___ points or ≥ ___%");
  setProperty("neededValue", "text-color", rgb(204, 208, 0));
});


// GPA Calculator Screen

// Creates empty lists to store GPA of individual grades and multiple GPAs
var individualGpa = [];
var individualSemester = [];
var semList = [];
var multipleGpa = [];

// Creates variables to store whether a semester has been accounted for already
var semCount1 = 0;
var semCount2 = 0;
var semCountMid= 0;
var semCount3 = 0;
var semCount4 = 0;
var semCountFin = 0;

// Creates variables to store totals of each semester
var semTotal1 = 0;
var semTotal2 = 0;
var semTotalMid = 0;
var semTotal3 = 0;
var semTotal4 = 0;
var semTotalFin = 0;

// Adds individual letter grade for each semester of a single class
onEvent("individualAppendButton", "click", function( ) {
  // Prompts user to input valid choice if not done so
  if(getText("individualGpaInput") == "" || getText("semesterDropdown") == "Select Semester:") {
    setProperty("individualGpaDisplay", "text", "Please input valid choices!");
    setProperty("individualGpaDisplay", "text-color", rgb(254, 1, 4));
    // Clears inputs if they are not valid, leaves them if they are
    if(InvalidInputTester("individual")) {
      setProperty("individualGpaInput", "value", "");
    }
    setProperty("semesterDropdown", "text", "Select Semester:");
  }
  else {
    // Prompts user to input a valid letter if not done so
    if(InvalidInputTester("individual")) {
      setProperty("individualGpaDisplay", "text", "Please input a valid letter!");
      setProperty("individualGpaDisplay", "text-color", rgb(254, 1, 4));
      setProperty("individualGpaInput", "value", "");
      setProperty("semesterDropdown", "text", "Select Semester:");
    }
    else {
      semCount1 = 0;
      semCount2 = 0;
      semCountMid= 0;
      semCount3 = 0;
      semCount4 = 0;
      semCountFin = 0;
      // Checks each semester to see if it has been accounted for already
      for(var j = 0; j < individualSemester.length; j++) {
        if(individualSemester[j] == "1st Quarter") {
          semCount1++;
        }
        else if(individualSemester[j] == "2nd Quarter") {
          semCount2++;
        }
        else if(individualSemester[j] == "Midterm") {
          semCountMid++;
        }
        else if(individualSemester[j] == "3rd Quarter") {
          semCount3++;
        }
        else if(individualSemester[j] == "4th Quarter") {
          semCount4++;
        }
        else if(individualSemester[j] == "Final Exam") {
          semCountFin++;
        }
      }
      // Does not allow for input of semester if it has been previously added already
      if((getText("semesterDropdown") == "1st Quarter" && semCount1 >= 1) ||
      (getText("semesterDropdown") == "2nd Quarter" && semCount2 >= 1) ||
      (getText("semesterDropdown") == "Midterm" && semCountMid >= 1) ||
      (getText("semesterDropdown") == "3rd Quarter" && semCount3 >= 1) ||
      (getText("semesterDropdown") == "4th Quarter" && semCount4 >= 1) ||
      (getText("semesterDropdown") == "Final Exam" && semCountFin >= 1)) {
        setProperty("individualGpaDisplay", "text", "Semester already inputted!");
        setProperty("individualGpaDisplay", "text-color", rgb(254, 1, 4));
      }
      // Successfully adds grade for semester
      else {
        setProperty("individualGpaDisplay", "text", "Successfully added!");
        setProperty("individualGpaDisplay", "text-color", rgb(19, 208, 0));
        appendItem(individualGpa, getText("individualGpaInput"));
        appendItem(individualSemester, getText("semesterDropdown"));
      }
      // Clears inputs for next use
      setProperty("individualGpaInput", "value", "");
      setProperty("semesterDropdown", "text", "Select Semester:");
    }
  }
 });

// Removes latest addition of semester grade
onEvent("individualClearLatestButton", "click", function( ) {
  // Removes latest value from lists if lists are not empty
  if(individualGpa.length != 0) {
    removeItem(individualGpa, individualGpa.length - 1);
    removeItem(individualSemester, individualSemester.length - 1);
    // Lets user know all values have been removed if latest removal leaves lists empty
    if(individualGpa.length == 0) {
      setProperty("individualGpaDisplay", "text", "All has been removed!");
      setProperty("individualGpaDisplay", "text-color", rgb(204, 208, 0));
    }
    // Lets uer know that latest semester grade has been removed
    else {
      setProperty("individualGpaDisplay", "text", "Successfully removed!");
      setProperty("individualGpaDisplay", "text-color", rgb(19, 208, 0));
    }
  }
  // Lets user know that list is completely empty
  else {
    setProperty("individualGpaDisplay", "text", "All has been removed!");
    setProperty("individualGpaDisplay", "text-color", rgb(204, 208, 0));
  }
});

// Adds individual class GPA to all their classes
onEvent("multipleAppendButton", "click", function( ) {
  // If input is not within letter or number range it will prompt user to try again and clear inputs
  if(InvalidInputTester("multiple") && !(getNumber("multipleGpaInput") >= 0.0 && getNumber("multipleGpaInput") <= 5.0)) {
    setProperty("multipleGpaDisplay", "text", "Please input a valid value!");
    setProperty("multipleGpaDisplay", "text-color", rgb(254, 1, 4));
    setProperty("multipleGpaInput", "value", "");
  }
  else {
    // Obtains numerical value from input
    var temp = getNumber("multipleGpaInput");
    // If letter GPA is inputted instead, it will set variable to letter GPA
    if(isNaN(getNumber("multipleGpaInput"))) {
      temp = getText("multipleGpaInput");
    }
    // Tells user value is added and resets for next use
    setProperty("multipleGpaDisplay", "text", "Successfully added!");
    setProperty("multipleGpaDisplay", "text-color", rgb(19, 208, 0));
    setProperty("multipleGpaInput", "value", "");
    // If GPA is weighted, it sets letter values to weighted numerical values
    if(getChecked("multipleWeightedCheckbox")) {
      if(temp == "A" || temp == "a") {
        temp = 5.0;
      }
      else if(temp == "B" || temp == "b") {
        temp = 4.0;
      }
      else if(temp == "C" || temp == "c") {
        temp = 3.0;
      }
      else if(temp == "D" || temp == "d") {
        temp = 1.0;
      }
      else if(temp == "E" || temp == "e") {
        temp = 0.0;
      }
    }
    // If GPA is not weighted, it sets letter values to unweighted numerical values
    else {
      if(temp == "A" || temp == "a") {
        temp = 4.0;
      }
      else if(temp == "B" || temp == "b") {
        temp = 3.0;
      }
      else if(temp == "C" || temp == "c") {
        temp = 2.0;
      }
      else if(temp == "D" || temp == "d") {
        temp = 1.0;
      }
      else if(temp == "E" || temp == "e") {
        temp = 0.0;
      }
    }
    // Clears checkbox for next use
    setChecked("multipleWeightedCheckbox", false);
    // Adds numerical GPA to list containing all GPA values
    appendItem(multipleGpa, temp);
  }
 });

// Removes latest addition of GPA value
onEvent("multipleClearLatestButton", "click", function( ) {
  // Removes latest item in list if it is not empty
  if(multipleGpa.length != 0) {
    removeItem(multipleGpa, multipleGpa.length - 1);
    // If list becomes empty after latest removal, it lets user know there are no values remaining
    if(multipleGpa.length == 0) {
      setProperty("multipleGpaDisplay", "text", "All has been removed!");
      setProperty("multipleGpaDisplay", "text-color", rgb(204, 208, 0));
    }
    // Lets user know latest addition was removed
    else {
      setProperty("multipleGpaDisplay", "text", "Successfully removed!");
      setProperty("multipleGpaDisplay", "text-color", rgb(19, 208, 0));
    }
  }
  // Lets user know the list is completely empty
  else {
    setProperty("multipleGpaDisplay", "text", "All has been removed!");
    setProperty("multipleGpaDisplay", "text-color", rgb(204, 208, 0));
  }
});

// Resets individual GPA display to default when semester dropdown is clicked
onEvent("semesterDropdown", "click", function( ) {
  setProperty("individualGpaDisplay", "text", "Please input letter grades!");
  setProperty("individualGpaDisplay", "text-color", rgb(204, 208, 0));
});

// Resets individual GPA display to default when input is clicked
onEvent("individualGpaInput", "click", function( ) {
  setProperty("individualGpaDisplay", "text", "Please input letter grades!");
  setProperty("individualGpaDisplay", "text-color", rgb(204, 208, 0));
});

// Calculates GPA for individual class and displays it when calculate button is clicked
onEvent("individualCalculateButton", "click", function( ) {
  // Updates all values for the class to ensure most recent additions
  updatedGpa();
  setProperty("individualGpaScore", "text", "GPA: " + calculateGpa("individual") + ".0");
 });

// Calculates GPA for multiple classes and displays it when calculate button is clicked
onEvent("multipleCalculateButton", "click", function( ) {
  setProperty("multipleGpaScore", "text", "GPA: " + calculateGpa("multiple"));
 });



// SWITICHING SCREENS

// Switches from home to grade calculator screen when grade calculator button is clicked
onEvent("homeGradeCalculatorButton", "click", function( ) {
  setScreen("gradeCalculatorScreen");
});

// Switches from home to GPA calculator screen when GPA calculator button is clicked
onEvent("homeGpaCalculatorButton", "click", function( ) {
  setScreen("gpaCalculatorScreen");
});

// Switches from grade calculator to home screen when home button is clicked
onEvent("gradeHomeButton", "click", function( ) {
  setScreen("homeScreen");
});

// Switches from grade calculator to GPA calculator screen when GPA calculator button is clicked 
onEvent("gradeGpaCalculatorButton", "click", function( ) {
  setScreen("gpaCalculatorScreen");
});

// Switches from GPA calculator to grade calculator screen when grade calculator button is clicked
onEvent("gpaGradeCalculatorButton", "click", function( ) {
  setScreen("gradeCalculatorScreen");
});

// Switches from GPA calculator to home screen when home button is clicked
onEvent("gpaHomeButton", "click", function( ) {
  setScreen("homeScreen");
});


// FUNCTIONS

// Updates category weights to most recent values and displays it for user to see
function updateCategoryWeights() {
  categoryWeight1 = getNumber("categorySlider1");
  setProperty("categoryDisplay1", "text", categoryWeight1 + "%");
  categoryWeight2 = getNumber("categorySlider2");
  setProperty("categoryDisplay2", "text", categoryWeight2 + "%");
  categoryWeight3 = getNumber("categorySlider3");
  setProperty("categoryDisplay3", "text", categoryWeight3 + "%");
  setProperty("gradeCategoryDisplay", "text", "C1: " + categoryWeight1 
  + "%    C2: " + categoryWeight2 + "%    C3: " + categoryWeight3 + "%");
}

// Updates lists into categorical values once individual grades are added
function updatedList() {
  // Clears all lists to ensure correct and updated values if it is for the individual calculation method
  if(getText("calculationDropdown") == "Individual Assignment Points") {
    numeratorCat1 = [];
    denominatorCat1 = [];
    numeratorCat2 = [];
    denominatorCat2 = [];
    numeratorCat3 = [];
    denominatorCat3 = [];
  }
  // Clears total numerical values for each category if it is for total category calculation method
  else {
    numTotalCat1 = 0;
    denTotalCat1 = 0;
    numTotalCat2 = 0;
    denTotalCat2 = 0;
    numTotalCat3 = 0;
    denTotalCat3 = 0;
  }
  // Updates lists or values based on calculation methods
  for(var i = 0; i < category.length; i++) {
    // Checks for the first category
    if(category[i] == "Category 1") {
      // Adds numerator and denominator into list of that category for individual grade calculation method
      if(getText("calculationDropdown") == "Individual Assignment Points") {
      appendItem(numeratorCat1, numerator[i]);
      appendItem(denominatorCat1, denominator[i]);
      }
      // Sets value to total for categorical calculation method
      else {
        numTotalCat1 = numerator[i];
        denTotalCat1 = denominator[i];
      }
    }
    // Checks for the second category
    if(category[i] == "Category 2") {
      // Adds numerator and denominator into list of that category for individual grade calculation method
      if(getText("calculationDropdown") == "Individual Assignment Points") {
      appendItem(numeratorCat2, numerator[i]);
      appendItem(denominatorCat2, denominator[i]);
      }
      // Sets value to total for categorical calculation method
      else {
        numTotalCat2 = numerator[i];
        denTotalCat2 = denominator[i];
      }
    }
    // Checks for the third category
    if(category[i] == "Category 3") {
      // Adds numerator and denominator into list of that category for individual grade calculation method
      if(getText("calculationDropdown") == "Individual Assignment Points") {
      appendItem(numeratorCat3, numerator[i]);
      appendItem(denominatorCat3, denominator[i]);
      }
      // Sets value to total for categorical calculation method
      else {
        numTotalCat3 = numerator[i];
        denTotalCat3 = denominator[i];
      }
    }
  }
}

// Calculates the total of numerator and denominator for each category
function calculateTotals(option) {
  // Only occurs if it is for individual grade calculation method
  if(getText("calculationDropdown") == "Individual Assignment Points") {
    // Resets all total values to ensure most recent values are updated
    numTotalCat1 = 0;
    denTotalCat1 = 0;
    numTotalCat2 = 0;
    denTotalCat2 = 0;
    numTotalCat3 = 0;
    denTotalCat3 = 0;
    
    // Selection of options from parameter allows fro specific categories to be chosen and added to total
    if(option == 1 || option == 4) {
      for(var i = 0; i < numeratorCat1.length; i++) {
        numTotalCat1 += numeratorCat1[i];
        denTotalCat1 += denominatorCat1[i];
      }
    }
    if (option == 2 || option == 4) {
      for(var j = 0; j < numeratorCat2.length; j++) {
        numTotalCat2 += numeratorCat2[j];
        denTotalCat2 += denominatorCat2[j];
      }
    }
    if (option == 3 || option == 4) {
      for(var k = 0; k < numeratorCat3.length; k++) {
        numTotalCat3 += numeratorCat3[k];
        denTotalCat3 += denominatorCat3[k];
      }
    }
  }
}

// Calculates the points needed to reach desired grade
function calculateScore(category) {
  // Calculates the current points each category has before new grade
  var pointsCat1 = numTotalCat1 / denTotalCat1 * categoryWeight1;
  var pointsCat2 = numTotalCat2 / denTotalCat2 * categoryWeight2;
  var pointsCat3 = numTotalCat3 / denTotalCat3 * categoryWeight3;
  
  // Creates variables for each step of the calculation
  var step1 = 0;
  var step2 = 0;
  var step3 = 0;
  var pointsNeeded = 0;
  
  // Creates variables to determine whether a grade in a category is present
  var cat1 = 1;
  var cat2 = 1;
  var cat3 = 1;
  
  if(denTotalCat1 == 0) {
    pointsCat1 = 0;
    cat1 = 0;
  }
  if(denTotalCat2 == 0) {
    pointsCat2 = 0;
    cat2 = 0;
  }
  if(denTotalCat3 == 0) {
    pointsCat3 = 0;
    cat3 = 0;
  }
  
  // Calculates score needed to get desired overall grade with each category
  if(category == "Category 1") {
    cat1 = 1;
    step1 = (getNumber("overallGradeInput") / 100) * (cat1*categoryWeight1 + cat2*categoryWeight2 + cat3*categoryWeight3);
    step2 = step1 - (cat2*pointsCat2 + cat3*pointsCat3);
    step3 = (step2 / categoryWeight1) * (denTotalCat1 + getNumber("gradeTotalInput"));
    pointsNeeded = step3 - numTotalCat1;
  }
  else if(category == "Category 2") {
    cat2 = 1;
    step1 = (getNumber("overallGradeInput") / 100) * (cat1*categoryWeight1 + cat2*categoryWeight2 + cat3*categoryWeight3);
    step2 = step1 - (cat1*pointsCat1 + cat3*pointsCat3);
    step3 = (step2 / categoryWeight2) * (denTotalCat2 + getNumber("gradeTotalInput"));
    pointsNeeded = step3 - numTotalCat2;
  }
  else if(category == "Category 3") {
    cat3 = 1;
    step1 = (getNumber("overallGradeInput") / 100) * (cat1*categoryWeight1 + cat2*categoryWeight2 + cat3*categoryWeight3);
    step2 = step1 - (cat1*pointsCat1 + cat2*pointsCat2);
    step3 = (step2 / categoryWeight3) * (denTotalCat3 + getNumber("gradeTotalInput"));
    pointsNeeded = step3 - numTotalCat3;
  }
  
  // Sets points needed to not a number if there is an infinite value
  if(pointsNeeded == "-Infinity" || pointsNeeded == "Infinity") {
    pointsNeeded = NaN;
  }
  
  return pointsNeeded;
}

// Updates the GPA from letter values to numerical values
function updatedGpa() {
  // Sets all totals to 0 to make sure all values are completely updated
  semTotal1 = 0;
  semTotal2 = 0;
  semTotalMid = 0;
  semTotal3 = 0;
  semTotal4 = 0;
  semTotalFin = 0;
  
  // Sets semester totals to its corresponding letter values
  for(var i = 0; i < individualSemester.length; i++) {
    if(individualSemester[i] == "1st Quarter") {
      semTotal1 = individualGpa[i];
    }
    if(individualSemester[i] == "2nd Quarter") {
      semTotal2 = individualGpa[i];
    }
    if(individualSemester[i] == "Midterm") {
      semTotalMid = individualGpa[i];
    }
    if(individualSemester[i] == "3rd Quarter") {
      semTotal3 = individualGpa[i];
    }
    if(individualSemester[i] == "4th Quarter") {
      semTotal4 = individualGpa[i];
    }
    if(individualSemester[i] == "Final Exam") {
      semTotalFin = individualGpa[i];
    }
  }
  
  // Sets all semester values in order in a list
  semList = [semTotal1, semTotal2, semTotalMid, semTotal3, semTotal4, semTotalFin];
  
  // Goes through each value in list and changes letter value to numerical GPA value
  for(var j = 0; j < semList.length; j++) {
    // Accounts for weighted letter grade
    if(getChecked("individualWeightedCheckbox")) {
      if(semList[j] == "A" || semList[j] == "a") {
        semList[j] = 5.0;
      }
      else if(semList[j] == "B" || semList[j] == "b") {
        semList[j] = 4.0;
      }
      else if(semList[j] == "C" || semList[j] == "c") {
        semList[j] = 3.0;
      }
      else if(semList[j] == "D" || semList[j] == "d") {
        semList[j] = 1.0;
      }
      else if(semList[j] == "E" || semList[j] == "e") {
        semList[j] = 0.0;
      }
    }
    // Accounts for unweighted letter grade
    else {
      if(semList[j] == "A" || semList[j] == "a") {
        semList[j] = 4.0;
      }
      else if(semList[j] == "B" || semList[j] == "b") {
        semList[j] = 3.0;
      }
      else if(semList[j] == "C" || semList[j] == "c") {
        semList[j] = 2.0;
      }
      else if(semList[j] == "D" || semList[j] == "d") {
        semList[j] = 1.0;
      }
      else if(semList[j] == "E" || semList[j] == "e") {
        semList[j] = 0.0;
      }
    }
  }
  // Sets semester totals to corresponding numerical GPA values from the list
  semTotal1 = semList[0];
  semTotal2 = semList[1];
  semTotalMid = semList[2];
  semTotal3 = semList[3];
  semTotal4 = semList[4];
  semTotalFin = semList[5];
}

// Calculates the GPA depending on the method
function calculateGpa(type) {
  // Sets variables equal to 0 to ensure most recent values are updated
  var total = 0;
  var gpa = 0;
  // Calculates and rounds GPA based on individual GPA
  if(type == "individual") {
    gpa = (((semTotal1 + semTotal2 + semTotal3 + semTotal4) * 2) + ((semTotalFin))) / 9;
    gpa = Math.round(gpa);
  }
  // Takes average to 2 decimal places for GPA based on GPA for multiple classes
  else if(type == "multiple") {
    // Goes through each GPA in the list and adds it in total
    for(var i = 0; i < multipleGpa.length; i++) {
      total += multipleGpa[i];
    }
    gpa = total / (multipleGpa.length);
    gpa = Math.round(gpa * 100) / 100;
    if(gpa / 5== 1 || gpa / 4 == 1 || gpa / 3 == 1 ||
    gpa / 2 == 1 || gpa / 1 == 1 || gpa == 0) {
      gpa = gpa + ".0";
    }
  }
  return gpa;
}

// Returns whether the input has valid letter grade values present
function InvalidInputTester(type) {
  return !(getText(type + "GpaInput").toUpperCase() == "A" ||
  getText(type + "GpaInput").toUpperCase() == "B" ||
  getText(type + "GpaInput").toUpperCase() == "C" ||
  getText(type + "GpaInput").toUpperCase() == "D" ||
  getText(type + "GpaInput").toUpperCase() == "E");
}