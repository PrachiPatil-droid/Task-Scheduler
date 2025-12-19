#include <unordered_map>
#include <string>
#include "Task.h"

using namespace std;

class TaskManager {
private:
    unordered_map<int, Task*> tasks; 
    int nextId;

public:
    TaskManager() {
        nextId = 1;
    }

    int addTask(string title,
                string description,
                int priority,
                int deadline,int timeRequired)
    {
        int id = nextId;
        nextId++;

        Task* t = new Task(id, title, description, priority, deadline,timeRequired);
        tasks[id] = t;

        return id;
    }

    Task* getTask(int id) {
        if (tasks.find(id) == tasks.end())
            return nullptr;
        return tasks[id];
    }

    void completeTask(int id) {
        if (tasks.find(id) != tasks.end()) {
            tasks[id]->completed = true;
        }
    }

    void deleteTask(int id) {
        if (tasks.find(id) != tasks.end()) {
            delete tasks[id];      
            tasks.erase(id);
        }
    }
};
