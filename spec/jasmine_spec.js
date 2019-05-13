/**
 * @description 
 * @author David Avalos
 * @lastUpdate 06/05/2019
 */


/**
 * Jasmine works very similar to Mocha framework.
 * 
 * the 'describe' function represents the test suite. It takes two parameters
 * 1.Test suite name. Must be a string
 * 2.Anonymous function, which will contain the test cases within it.
 * 
 * the 'it' function represents the test case. 
 * It goes inside the describe callback function and you can add as many as you want.
 * 
 * Each test must contain an expect, otherwise it will alwas pass. 
 * In this example the most common expect is shown. expect(actual).toBe(expected)
 * 
 * actual - This could be any value, variable, expression or function that returns an specific value which we will evaluate.
 * expected - The expected value
 */ 
describe("Suite Name", function(){
    it("Test Name", function(){
        expect(true).toBe(true);
    });
});

/**
 * Setup and Teardown are basic functions on any testing framework.
 * Depending on the framework you will see different names for them like hooks or annotations.
 * 
 * Jasmine have 4 basic setup / teardown functions
 * 
 * beforeEach - It will execute before every test case (it function). 
 * afterEach  - It will execute after every test case (it function).
 * beforeAll  - It will execute one time before the suite starts execution.
 * afterAll   - It will execute one time after the suite ends execution.
 * 
 * In the below suite all four functions are present. Execute the code so you can see the output and confirm their behaivor.
 */
describe("Setup And Teardown", function(){

    beforeEach(function(){
        console.log("beforeEach");
    });

    afterEach(function(){
        console.log("afterEach");
    });

    beforeAll(function(){
        console.log("beforeAll");
    });

    afterAll(function(){
        console.log("afterAll");
    });

    it("Demo test 01",function(){
        console.log("Output for demo test 01");
    });

    it("Demo test 02",function(){
        console.log("Output for demo test 02");
    });

});

/**
 * Nested describe - You can nest as much 'describe' functions as you want.
 * The advantage to do this is to get nested calls to the setup / teardown functions.
 * 
 * In the below example I use a 'num' variable to keep track on how many 'beforeEach' functions are executed.
 */

describe("Describe block", function(){
    let num = 0; // Initialize the variable to zero, it has a local scope, so the describe and any nested function will be able to use it.

    //The variable will increase in 1 before each test case
    beforeEach(function(){
        num +=1;
    });

    //When the test suite is finished the final result will be printed. And this includes the nested test suites!
    afterAll(function(){
        console.log(num);
    });

    //This is the test for the first describe block. At this point the 'num' variable should be equal to 1.
    it("Describe block test", function(){
        expect(num).not.toBe(0);
    });

    //This is the nested describe / test suite
    describe("Nested describe block", function(){
        
        //Before anything happens I want to see the 'num' value
        //which should be equal to 1 since it only has been updated on the upper describe
        beforeAll(function(){
            console.log(num);
        });

        //Then we eant to update the value with a +1 for every test case on the nested test suite
        beforeEach(function(){
            num += 1;
        });

        //Every nested TC will call the setup / teardown from the upper describe functions.
        //In this case we have only one setup function on the upper describe, the beforeEach, so it will execute and add +1 to our 'num' variable giving us a value of 2.
        //Right after that happens and before the TC is executed the beforeEach on the current describe it will also add +1 which will give us num = 3
        it("Nested describe block test", function(){
            expect(num).not.toBe(0);
        });
    });
});

/**
 * Disable suites - this is very straight forward. Just add an 'x' before the 'describe' keyword and the test suite will be ignored whem executed.
 */
xdescribe("Disabled describe", function(){});

/**
 * Pending test cases - The same with the 'dsiabled test suites', you just add an 'x' beofre the 'it' keyword and the test will be marked as 'Pending'.
 * Remember, it does not ignore the test, when you execute the file the results will show a test 'Temporarily disabled'.
 */
describe("Test suite not ignored", function(){
    xit("Pending Test",function(){});
});

/**
 * Matchers - They are functions that help us to assert expetced vs actual values. 
 * 
 */

describe("Matchers", function(){
    
    //I set variables to use in this test suite
    let myNumber = 0, 
    myString = 'test', 
    myBoolean = true, 
    myNull = null,
    undefinedVariable,
    dictionary01 = {
        a: 0
    },
    dictionary02 = {
        b: 0
    }

    //In this setup I create two functions to use later in the matchers
    beforeAll(function(){
        myThrowFunc = function(){
            throw 0;
        }

        myErrorFunc = function(){
            throw new Error("oops!");
        }
    });
    
    /**
     * toBe - This is the first and most common matchers, it basically compares two primitive values.
     */
    it("toBe", function(){
        expect(myNumber).toBe(0); //This is number comparison, it passes
        expect(dictionary01.a).toBe(dictionary02.b); //This is a two different objects properties comparsion. This passes because the value is the same.
    });

    /**
     * toEqual - The main difference between this and toBe is that toEqual does a deep equality. This means that the objects need to be identicall.
     * In other words, for primitive values both matchers will work exactly the same, but for object it will check the properties and fail if any of them is different.
     */
    it("toEqual", function(){
        expect(myNumber).toEqual(0); //Here's the firs example, comparing two numbers, that's all.
        expect(dictionary01).toEqual(dictionary02); //Here I compare two objects and this will fail due that objects has different properties.
    });

    /**
     * toMatch - The main use for this matcher is to compare strings with regular expressions.
     */
    it("toMatch", function(){
        expect(myString).toMatch('t.'); //Regular expression
    });

    /**
     * toBeDefined - This will pass as long as the object has a value assigned.
     */
    it("toBeDefined", function(){
        expect(myString).toBeDefined();
    });

    /**
     * toBeUndefined - If the object doesn't have a value assigned this will pass.
     */
    it("toBeUndefined", function(){
        expect(undefinedVariable).toBeUndefined();
    });

    /**
     * toBeNull - As the name indicates, this matchers evaluates if the given value is null
     */
    it("toBeNull", function(){
        expect(myNull).toBeNull(); //This passes
        expect(myString).toBeNull(); //This fails
    });

    /**
     * toBeTruthy - At first glance you might think that this is yet another boolean comparison, but no!.
     * Basically a "Truthy" value is anything but null or undefined values, not necessarily a 'true' boolean.
     */
    it("toBeTruthy", function(){
        expect(myBoolean).toBeTruthy(); //Pass
        expect(myNumber).toBeTruthy(); //Pass
        expect(myBoolean).toBeTruthy(); //Pass
        expect(null).toBeTruthy(); //Fail
        expect(undefined).toBeTruthy(); //Fail
    });

    /**
     * toBeFalsy - This is the opposite to the "truthy" value. So whatever that's false, null or undefined will casue the test to pass.
     */
    it("ToBeFalsy", function(){
        expect(!myBoolean).toBeFalsy();
        expect(null).toBeFalsy();
        expect(undefined).toBeFalsy();
    });

    /**
     * toContain - It checks that the given sub-string (expected) appears in the actual string.
     */
    it("toContain", function(){
        expect(myString).toContain("st"); //In this exmple the myString variable contains 'test', and the test checks that the sub-string "st" is contained on myString.
    });

    /**
     * toBeLessThan - This matcher is the same as the "less than" mathematical operation.
     */
    it("toBeLessThan", function(){
        expect(myNumber).toBeLessThan(5); //This test is read as myNumber < 5, if that condition is met, then it passes.
    });

    /**
     * toBeGreaterThan - This matcher is the same as the "greater than" mathematical operation
     */
    it("toBeGreaterThan", function(){
        expect(myNumber).toBeGreaterThan(-1);//This test is read as myNumber > -1, if that condition is met, then it passes.
    });

    /**
     * toBeCloseTo - This matcher takes two parameters. 
     * The first one is the expected result, it must be a number usually with decimal point.
     * And the second one is the decimal that you will compare to be equal to the actual result.
     * 
     * In other words, you will tell the 
     */
    it("toBeCloseTo", function(){
        expect(200.012).toBeCloseTo(200.033,1); //This will compare both numbers and expect they're equal up to the first decimal
        expect(200.012).toBeCloseTo(200.013,2); //This one will compare the numbers and expect they're euqal up to the second decimal... and so on.
        //If any of the specified decimal do not match, the test will fail.
    });

    /**
     * toThrow - This matchers verifies if a function throws an error. If it does then the test passes.
     */
    it("toThrow", function(){
        expect(myThrowFunc).toThrow(); //Since myThrowFunc the only thing it does is throw and exception, so the test will pass.
        //You can see the fuction in the beforeAll setup
    });

    /**
     * toThrowError - Very similar to toThrow, but this verifies that en error is thrown.
     * 
     * NOTE: An exception is different than an Error, that's why we have two different matchers
     */
    it("toThrowError", function(){
        expect(myErrorFunc).toThrowError(); //MyErrorFunc, the only thing it does is throw an error. So this test will pass.
    });

});

/**
 * Spies - A Spy is a function the helps to track other functions.
 * 
 * Let's say you are testing code that has several calls to other non-anonymous functions and you can use spye to keep track on whether or not 
 * your function under test is calling succesfuly the other function(s).
 * 
 * 
 */
describe("Spies", function(){
let myFunc; //I declared the variable (object) where I will store my function just becasue best practice.

    //In this particular case I decided to create the function we will spy on the 'beforeAll' so we can use the same code through all the tests
    beforeAll(function(){

        //This is a dictionary that holds functions as vale... right now I have only one key:value pair 'cause is just for sample purpose
        myFunc = {
            //our 'getNumber' function prints whatever input we give to it, in order for it to make sense please provide a number :)
            getNumber: function(n){
                console.log(n);
            }
        }

        /**
         * spyOn function creates the spy, it take two parameters.
         *
         * Object - It holds the functions that we can spy on
         * String - This must be the name of the function we want to spy
         * 
         * So, as general rule the two parameter should work as Object.String which in actual code will be as Object.Function(parameters);
         * If your obejct and function name meet the mentioned criteria, then you're on the good way.
         * 
         */
        spyOn(myFunc, 'getNumber');

        //Running the spied function a couple of times so it has something information to track.
        myFunc.getNumber(3);
        myFunc.getNumber(333);
    });

    /**
     * There are special matcher functions to interact with the spies.
     * 
     * There are three basic matchers:
     * 1.toHaveBeenCalled - verifies that the spied function was called at least one time, else it will fail.
     * 2.toHaveBeenCalledTimes - verifies that the spied function was called an specific number of times, you send that as a parameter (number).
     * Anything different of that number will result on a fail test.
     * 3.toHaveBeenCalledWith - Verifies that the spied function was called sending them a specific parameter.
     * 
     * In the code below I show you some examples.
     */

    it("Verify the spied function was called", function(){
        expect(myFunc.getNumber).toHaveBeenCalled(); //This will pass as long as we call the getNumber function at any point before this test.
    });

    it("Verify that the spy was called X times", function(){
        expect(myFunc.getNumber).toHaveBeenCalledTimes(2); //In this case we expect the spied function (getNumber) to be called two times, which it is.
    });

    it("Verify that a specific parameter was used on the spied funciton", function(){
        expect(myFunc.getNumber).toHaveBeenCalledWith(3); //Any call to getNumber function that uses '3' as parameter will make this test pass.
    });

});
