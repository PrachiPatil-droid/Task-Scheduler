#include <queue>
#include <vector>
#include <unordered_map>
# include <Task.h>
# include <TaskManager.h>
using namespace std;

class Scheduler {
private:
    struct Compare {
        bool operator()(Task* a, Task* b) {
            if (a->deadline != b->deadline)
                return a->deadline > b->deadline;
            if (a->priority != b->priority)
                return a->priority > b->priority;
            
            return a->timeRequired > b->timeRequired;
        }
    };

    priority_queue<Task*, vector<Task*>, Compare> pq;

public:
    void addTask(Task* task);       
    Task* getNextTask();            
    void completeTask(Task* task);  
};
