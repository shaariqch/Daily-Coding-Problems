def matrix_islands(grid):
    """
    grid: Matrix of ints
    Returns the number of "islands" in grid
    """
    if not grid:
        return 0
    r = len(grid)
    c = len(grid[0])
    visited = [[False for _ in range(c)] for _ in range(r)]
    
    
    def visit(i, j):
        if i < 0 or j < 0 or i >= r or j >= c:
            return
        if visited[i][j] or grid[i][j] == 0:
            return
        visited[i][j] = True
        
        visit(i + 1, j)
        visit(i, j + 1)
        visit(i - 1, j)
        visit(i, j - 1)
    
    result = 0
    for i in range(r):
        for j in range(c):
            if not visited[i][j] and grid[i][j] == 1:
                result += 1
                visit(i, j)
                
    return result



