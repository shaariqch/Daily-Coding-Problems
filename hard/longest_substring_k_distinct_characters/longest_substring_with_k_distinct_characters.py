def longestSubstringKDistinct(string, k):
    """
    string: str
    k: int
    Returns the longest substring with at most k distinct characters
    """
    if len(string) == 0 or k == 0:
        return 0

    occuredChars = dict()
    left = right = 0
    result = ""
    maxLen = 0

    while right < len(string):
        occuredChars[string[right]] = right
        right += 1

        if len(occuredChars) == k + 1:
            indexToDelete = min(occuredChars.values())
            del occuredChars[string[indexToDelete]]
            left = indexToDelete + 1

        if right - left > maxLen:
            maxLen = right - left
            result = string[left:right]  # this is an expensive operation so we want to make sure to execute it as little as possible, hence wht it is in this condition
    
    return result

if __name__ == '__main__':
    string, k = "abcba", 2
    result = longestSubstringKDistinct(string, k)
    print(result) #bcb

    string, k = "aa", 1
    result = longestSubstringKDistinct(string, k)
    print(result) #aa
    
    string, k = "aaabcba", 2
    result = longestSubstringKDistinct(string, k)
    print(result) #aaab

    string, k = "aaabcba", 3
    result = longestSubstringKDistinct(string, k)
    print(result) #aaabcba

    string, k = "bbbbzaaabcba", 3
    result = longestSubstringKDistinct(string, k)
    print(result) #bbbbzaaab



    