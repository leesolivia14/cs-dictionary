#attempt to transfer python dictionary to javascript
#creds: https://www.youtube.com/watch?v=lSAFVMaaH-w

import sys
import json
import ast # abstract syntax tree



def csv_dictionary(filename):
    file = open(filename)
    file.readline()
    word_dict = {}
    for row in file:
        line = row.strip().split(",")
        term = line[0]
        definition_with_example = line[1] + ". example: " + line[2]
        word_dict[term] = definition_with_example
    return word_dict



# to javascript
word_dict = csv_dictionary(dictionary.csv)

i = 1
for word in word_dict:
	data_to_pass_back = word_dict[word]

	input = ast.literal_eval(sys.argv[i])
	output = input
	output[word] = data_to_pass_back
	i = i + 2
	#print(json.dumps(output))

sys.stdout.flush()