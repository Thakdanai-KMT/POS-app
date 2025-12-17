import { Component, OnInit } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  color: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  avatar: string;
}

interface Project {
  id: number;
  name: string;
  progress: number;
  status: 'active' | 'completed' | 'pending';
  deadline: string;
  team: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      isPositive: true,
      icon: 'attach_money',
      color: 'purple'
    },
    {
      title: 'Active Users',
      value: '2,345',
      change: '+8.2%',
      isPositive: true,
      icon: 'people',
      color: 'blue'
    },
    {
      title: 'Projects',
      value: '24',
      change: '-2.4%',
      isPositive: false,
      icon: 'folder',
      color: 'green'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+5.1%',
      isPositive: true,
      icon: 'trending_up',
      color: 'orange'
    }
  ];

  recentActivities: Activity[] = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'completed task "Design Review"',
      time: '2 minutes ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: 2,
      user: 'Mike Chen',
      action: 'uploaded new file to project',
      time: '15 minutes ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    {
      id: 3,
      user: 'Emma Wilson',
      action: 'commented on "Q4 Report"',
      time: '1 hour ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
    },
    {
      id: 4,
      user: 'David Lee',
      action: 'created new project "Mobile App"',
      time: '3 hours ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    }
  ];

  projects: Project[] = [
    {
      id: 1,
      name: 'Website Redesign',
      progress: 75,
      status: 'active',
      deadline: '2024-12-30',
      team: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
      ]
    },
    {
      id: 2,
      name: 'Mobile App Development',
      progress: 45,
      status: 'active',
      deadline: '2025-01-15',
      team: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=5'
      ]
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      progress: 100,
      status: 'completed',
      deadline: '2024-12-15',
      team: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=7',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=8',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=9'
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // เรียก API หรือ service ต่างๆ ที่ต้องการ
  }

  getProgressColor(progress: number): string {
    if (progress >= 75) return '#22c55e';
    if (progress >= 50) return '#06b6d4';
    if (progress >= 25) return '#f59e0b';
    return '#ef4444';
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }
}