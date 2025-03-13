import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Calendar,
  Clock,
  Users,
  Filter,
  Search,
  MoreVertical,
  Tags,
  MessageSquare,
  Trash2
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  comments: number;
}

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design new dashboard layout",
      description: "Create wireframes and high-fidelity designs for the new analytics dashboard",
      status: "in-progress",
      priority: "high",
      assignee: "Sarah Chen",
      dueDate: "2024-03-25",
      comments: 5
    },
    {
      id: 2,
      title: "Implement authentication flow",
      description: "Set up user authentication with JWT tokens and refresh mechanism",
      status: "todo",
      priority: "high",
      assignee: "Mike Johnson",
      dueDate: "2024-03-28",
      comments: 3
    },
    {
      id: 3,
      title: "Write API documentation",
      description: "Document all API endpoints using OpenAPI specification",
      status: "completed",
      priority: "medium",
      assignee: "Alex Kumar",
      dueDate: "2024-03-20",
      comments: 2
    }
  ]);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      role: "Designer"
    },
    {
      id: 2,
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      role: "Developer"
    },
    {
      id: 3,
      name: "Alex Kumar",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80",
      role: "Tech Writer"
    }
  ];

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Team Task Tracker</h1>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition">
              <Plus size={20} />
              New Task
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Tasks</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Team Members</span>
            <div className="flex -space-x-2">
              {teamMembers.map(member => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  title={member.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid gap-4">
          {filteredTasks.map(task => (
            <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <button 
                    className="mt-1 text-gray-400 hover:text-indigo-600 transition"
                    onClick={() => {
                      setTasks(tasks.map(t => 
                        t.id === task.id 
                          ? {...t, status: t.status === 'completed' ? 'todo' : 'completed'} 
                          : t
                      ));
                    }}
                  >
                    {task.status === 'completed' ? <CheckCircle2 size={20} className="text-green-500" /> : <Circle size={20} />}
                  </button>
                  <div>
                    <h3 className={`text-lg font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MessageSquare size={16} />
                    <span>{task.comments}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={teamMembers.find(m => m.name === task.assignee)?.avatar}
                    alt={task.assignee}
                    className="w-6 h-6 rounded-full"
                    title={task.assignee}
                  />
                  <span className="text-gray-600">{task.assignee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;