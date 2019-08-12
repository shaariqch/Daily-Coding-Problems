def cons(a, b):
    def pair(f):
        return f(a, b)
    return pair

def car(pair):
    """Return the first element of pair.
    >>> car(cons(1,2))
    1
    """
    def retrieveFirst(a, b):
        return a
    return pair(retrieveFirst)

def cdr(pair):
    """Return the last element of pair.
    >>> cdr(cons(1,2))
    2
    """
    def retrieveLast(a, b):
        return b
    return pair(retrieveLast)

print(car(cons(1,2))) # 1

print(cdr(cons(1,2))) # 2


# To run doctests, run the command "python cdr.py -v"
if __name__ == "__main__":
    import doctest
    doctest.testmod()

