from curses.ascii import isalnum
import json
import csv

def removeSpaces(st):
  return "".join([ch for ch in st if ch != ""])

def fixname(st):
  return "".join([ch for ch in st if isalnum(ch)])

def getCreds(st):
  return int(st.split('(')[-1][:-1])

def time_trim(st):
  return "".join([ch for ch in st if isalnum(ch) or ch in [":", "-"]])

def get_hm(time):
  if(time_trim(time) != time):
    print("anjhfnshdjf")
  _list = [int(num) for num in time.split(":")]
  return (_list[0], _list[1])

def parse_time(timeStr):
  timeStr = removeSpaces(timeStr)
  res = [[], [], [], [], []]
  if(not timeStr):
    return res
  weekDay = {
    "M": 0,
    "T": 1,
    "W": 2,
    "Th": 3,
    "F": 4,
  }
  for part in timeStr.split(" ,"):
    days, time = part.split(" ")
    st = get_hm(time.split("-")[0])
    ed = get_hm(time.split("-")[1])
    for i in range(len(days)):
      if(days[i] == "T"):
        if(i+1 < len(days) and days[i+1] == 'h'):
          res[3] = [st, ed]
        else:
          res[1] = [st, ed]
      elif(days[i] != 'h'):
        res[weekDay[days[i]]] = [st, ed]
  return res

csv_file = open("all_courses_odd.csv")
csv_reader = csv.reader(csv_file, delimiter=',')

cnt = 0
course_list = []

for row in csv_reader:
  if(cnt >= 1):
    department = row[1]
    _namesList = row[2].split('(')
    course_id = _namesList[-1][:-1]
    course_name = '('.join(_namesList[:-1])
    if(not row[3]):
      prereq = []
    else:
      prereq = row[3].split('AND')
      prereq = [req.split('OR') for req in prereq]
      prereq = [[fixname(cname) for cname in req] for req in prereq]
    creds = getCreds(row[5])
    instr = row[6]
    instr_email = row[7]
    lec_time = parse_time(row[8])
    tut_time = parse_time(row[10])
    prac_time = parse_time(row[12])

    course = {
      "course_name": course_name,
      "course_id": course_id,
      "department": department,
      "credits": creds,
      "instructors": instr,
      "instructor_emails": instr_email,
      "prerequisites": prereq,    # PoS form, need to make some manual changes
      "lecture_time": lec_time,
      "tutorial_time": tut_time,
      "practical_time": prac_time,
    }
    course_list.append(course)

  cnt += 1

json_data = {
  "courses": course_list,
}

with open("course_list_odd.json", 'w') as write_json_file:
  json.dump(json_data, write_json_file, indent=4)
