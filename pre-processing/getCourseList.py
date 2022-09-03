import json

even = dict()
odd = dict()
with open('course_list_even.json', 'r') as file:
    even = json.load(file)
with open('course_list_odd.json', 'r') as file:
    odd = json.load(file)

id_list = []
for dic in [even, odd]:
    for course in dic['courses']:
        id_list.append(course['course_id'])

json_dump = {
    'courses': id_list
}

with open('course_list.json', 'w') as file:
    json.dump(json_dump, file)

