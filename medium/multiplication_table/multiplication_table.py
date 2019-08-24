import timeit

def multiplicationTable(N, X):
    """
    Returns number of instances where X appears in a multiplication table of size NxN
    Unoptimized, so takes o(n^2) time and space
    """
    table = []

    # Generate multiplication table
    for i in range(N):
        row = []
        for j in range(N):
            row.append((j + 1) * (i + 1))
        table.append(row)

    result = 0
    # Count number of times X appears in table
    for i in range(N):
        for j in range(N):
            if table[i][j] == X:
                result += 1

    return result

def multiplicationTableOptimized(N, X):
        """
    Returns number of instances where X appears in a multiplication table of size NxN.
    Optimized to run in o(n) time and to have o(1) space complexity
    """
    i = 1
    result = 0
    while i <= N:
        if (X/i).is_integer() and X/i <= N:
            result += 1
        i += 1
    return result

if __name__ == '__main__':
    N, X = 6, 12
    print(multiplicationTableOptimized(N, X)) # 4

    N, X = 4, 18
    print(multiplicationTableOptimized(N, X)) # 0
    
    N, X = 13, 13
    print(multiplicationTableOptimized(N, X)) # 2
    
    N, X = 12, 13
    print(multiplicationTableOptimized(N, X)) # 0