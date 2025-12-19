#include <iostream>
#include "TaskManager.h"
#include "Scheduler.h"

using namespace std;

int main() {

    TaskManager manager;
    Scheduler scheduler;

    int id1 = manager.addTask("DSA",
                              "Study priority queue",
                              1, 5, 2);

    int id2 = manager.addTask("Math",
                              "Practice calculus",
                              2, 3, 3);

    int id3 = manager.addTask("Project",
                              "Trie based search engine",
                              1, 2, 4);

    scheduler.addTask(manager.getTask(id1));
    scheduler.addTask(manager.getTask(id2));
    scheduler.addTask(manager.getTask(id3));

    while (true) {

        Task* task = scheduler.getNextTask();

        if (task == nullptr)
            break;

        cout << "Working on: " << task->title << endl;

        task->completed = true;
    }

    cout << "All tasks completed" << endl;

    return 0;
}
