import unittest
from medium.decode_message.decode_message import decodeMessage

class TestDecodeMessage(unittest.TestCase):

    def test_decode(self):
        self.assertEqual(decodeMessage('111'), 3)
    
if __name__ == '__main__':
    unittest.main()