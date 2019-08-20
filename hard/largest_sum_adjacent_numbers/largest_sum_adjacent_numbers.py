def largest_sum(nums):
    if len(nums) <= 2:
        return max(nums)

    d = [None] * len(nums)
    d[0] = nums[0]
    d[1] = max(nums[0], nums[1])

    for i in range(2, len(nums)):
        d[i] = max(d[i - 1], nums[i] + d[i - 2])
    
    return d[-1]

if __name__ == '__main__':
    nums = [2, 4, 6, 2, 5]
    result = largest_sum(nums)
    print(result)

    nums = [5, 1, 1, 5]
    result = largest_sum(nums)
    print(result)

    nums = [2, 10, 3, 5, 8]
    result = largest_sum(nums)
    print(result)

    nums = [2, 10, 3, 10, 8]
    result = largest_sum(nums)
    print(result)