#include <string>

using namespace std;

class Task {
public:
    int id;              
    string title;       
    string description;    
    int priority;          
    int deadline;  
    int timeRequired;         
    bool completed;

    Task(int id,
         string title,
         string description,
         int priority,
         int deadline,
         int timeRequired)
    {
        this->id = id;
        this->title = title;
        this->description = description;
        this->priority = priority;
        this->deadline = deadline;
        this->completed = false;
        this->timeRequired=timeRequired;
    }
};