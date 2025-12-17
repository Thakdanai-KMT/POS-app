import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
    standalone: false,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  activeRoute = 'dashboard';
  
  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: 'dashboard' },
    { icon: 'analytics', label: 'Analytics', route: 'analytics' },
    { icon: 'inventory', label: 'Projects', route: 'projects', badge: 3 },
    { icon: 'people', label: 'Team', route: 'team' },
    { icon: 'settings', label: 'Settings', route: 'settings' },
  ];

  userInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activeRoute = this.router.url.split('/')[1] || 'dashboard';
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(route: string): void {
    this.activeRoute = route;
    this.router.navigate([`/${route}`]);
  }

  logout(): void {
    // เคลียร์ token หรือข้อมูล authentication
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}