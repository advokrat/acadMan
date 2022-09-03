import json

def get_database():
    from pymongo import MongoClient
    import pymongo

    CONNECTION_STRING = "mongodb+srv://mernstack:mernstack@cluster0.hg0p1.mongodb.net/Test-Academics?retryWrites=true&w=majority"

    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    return client["Test-Academics"]

weekDay = [ "M", "T", "W", "Th", "F" ]

if __name__ == "__main__":
    dbname = get_database()

    collection_name = dbname["courses"]

    f = open("course_list_odd.json")
    data = json.load(f)

    courseDocList = []

    for course in data['courses']:

        lecture_schedule = []

        for index, day in enumerate(course['lecture_time'], start = 0):
            if(len(day) > 0):
                start_time = [day[0][0], day[0][1]]
                end_time = [day[1][0], day[1][1]]
                schedule = {
                    "day": weekDay[index],
                    "start": start_time,
                    "end": end_time
                }
                lecture_schedule.append(schedule)

        tutorial_schedule = []

        for index, day in enumerate(course['tutorial_time'], start = 0):
            if(len(day) > 0):
                start_time = [day[0][0], day[0][1]]
                end_time = [day[1][0], day[1][1]]
                schedule = {
                    "day": weekDay[index],
                    "start": start_time,
                    "end": end_time
                }
                tutorial_schedule.append(schedule)

        practical_schedule = []

        for index, day in enumerate(course['practical_time'], start = 0):
            if(len(day) > 0):
                start_time = [day[0][0], day[0][1]]
                end_time = [day[1][0], day[1][1]]
                schedule = {
                    "day": weekDay[index],
                    "start": start_time,
                    "end": end_time
                }
                practical_schedule.append(schedule)

        reviews = []

        courseDoc = {
            "name": course['course_name'],
            "courseID": course['course_id'].lower(),
            "department": course['department'],
            "credits": course['credits'],
            "instructors": course['instructors'],
            "instructor_mailID": course['instructor_emails'],
            "prerequisites": course['prerequisites'],
            "lecture_time": lecture_schedule,
            "tutorial_time": tutorial_schedule,
            "practical_time": practical_schedule,
            "stars": 0,
            "reviews": reviews,
            "rating": 0
        }

        courseDocList.append(courseDoc)

    #print(courseDocList)
    collection_name.insert_many(courseDocList)
