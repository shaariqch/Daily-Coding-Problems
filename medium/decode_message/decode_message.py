mappings = {
        str(i+1): chr(97 + i) for i in range(26)
    }

def decodeMessage(msg):
    if not msg:
        return ""
    result = []
    decodeMessageRec(msg, 0, "", result)
    return len(result)

def decodeMessageRec(msg, i, s, result):
    if i >= len(msg):
        result.append(s)
        return
    
    decodeMessageRec(msg, i + 1, s + mappings[msg[i]], result)

    if i + 1 < len(msg) and mappings.get(msg[i:i+2]):
            decodeMessageRec(msg, i + 2, s + mappings[msg[i:i+2]], result)

if __name__ == '__main__':
    msg = '111'
    decoded = decodeMessage(msg)
    print(decoded)
    
    msg = '1234'
    decoded = decodeMessage(msg)
    print(decoded)
