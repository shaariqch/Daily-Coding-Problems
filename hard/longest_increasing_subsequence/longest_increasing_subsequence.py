import json

def longest_increasing_subsequence(nums):
    """
    Returns length of longest increasing subsequence given an array of numbers.
    """
    if not nums:
        return 0
        
    dp = [None] * len(nums)
    dp[0] = 1
    maxans = 1
    
    for i in range(1, len(dp)):
        maxval = 0
        for j in range(0, i):
            if nums[i] > nums[j]:
                maxval = max(maxval, dp[j])
        
        dp[i] = maxval + 1
        maxans = max(maxans, dp[i])
        
    return maxans


if __name__ == '__main__':
    with open('hard\longest_increasing_subsequence/tests.json', 'r') as f:
        datastore = json.load(f)
    
    allTestsPass = True
    failedTests = []
    for d in datastore:
        testNumber = d['desc']
        args = d['args'][0]
        expected = d['res']
        actual = longest_increasing_subsequence(args)
        if not actual == expected:
            failedTests.append(testNumber)
        allTestsPass = actual == expected and allTestsPass
        

    if allTestsPass:
        print("All tests passed")
    else:
        print("Some tests failed")
        print("IDs of failed tests: {}".format(failedTests))

    
