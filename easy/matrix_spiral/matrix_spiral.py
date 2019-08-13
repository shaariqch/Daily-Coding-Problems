def spiralOrder(matrix):
    """
    Returns all elements of the matrix in spiral order
    """
    if not matrix:
        return []
    n = len(matrix) * len(matrix[0])
    result = []
    
    jLowerBound = -1
    jUpperBound = len(matrix[0])
    iLowerBound = 0
    iUpperBound = len(matrix)
    direction = 'right'
    i = j = 0
    
    while len(result) != n:
        if direction == 'right':
            j = jLowerBound + 1
            while j < jUpperBound:
                result.append(matrix[i][j])
                j += 1
            jUpperBound -= 1
            j -= 1
            direction = 'down'

        elif direction == 'down':
            i = iLowerBound + 1
            while i < iUpperBound:
                result.append(matrix[i][j])
                i += 1
            i -= 1
            iUpperBound -= 1
            direction = 'left'

        elif direction == 'left':
            j = jUpperBound - 1
            while j > jLowerBound:
                result.append(matrix[i][j])
                j -= 1
            j += 1
            jLowerBound += 1
            direction = 'up'

        elif direction == 'up':
            i = iUpperBound - 1
            while i > iLowerBound:
                result.append(matrix[i][j])
                i -= 1
            i += 1
            iLowerBound += 1
            direction = 'right'
    return result

def printSpiralMatrix(matrix):
    print("\n".join([str(x) for x in spiralOrder(matrix)]))

if __name__ == '__main__':
    matrix = [[1, 2, 3, 4, 5],[6, 7, 8, 9, 10],[11, 12, 13, 14, 15],[16, 17, 18, 19, 20]]
    
    expected_output = [1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12]
    actual_output = spiralOrder(matrix)

    print(expected_output == actual_output)

    printSpiralMatrix(matrix)
