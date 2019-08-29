import os, json, sys
from hard.longest_increasing_subsequence.longest_increasing_subsequence import *
tests_to_run = []

# Walk through directories, and look for tests.json files
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith("tests.json"):
            with open(os.path.join(root, file), 'r') as f:
                tests_to_run.append(json.load(f))

all_tests_passed = True
# Go through parsed tests
for tests in tests_to_run:
    function = tests['title']
    for t in tests['tests']:
        parameters = ["(", None, ")"]
        parameters[1] = ",".join([str(x) for x in t['args']])
        parameters = "".join(parameters)
        actual_result = eval(function + parameters) # Build function with parameters and evaluates it
        expected_result = t['res']
        
        # Prints test details if test failed
        if actual_result != expected_result:
            print("{}: Failed at test case {}".format(function, t['desc']))
            print("Input: {}".format(t['args']))
            print("Actual: {}".format(actual_result))
            print("Expected: {}".format(expected_result))
            all_tests_passed = False

if all_tests_passed:
    print("All tests passed")