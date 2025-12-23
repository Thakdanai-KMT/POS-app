import { Router, NavigationEnd } from '@angular/router';
import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  activeRoute = 'dashboard';
  private routerSubscription?: Subscription;
  
  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: 'dashboard' },
    { icon: 'analytics', label: 'Analytics', route: 'analytics' },
    { icon: 'inventory', label: 'Products', route: 'products' },
    { icon: 'shopping_cart', label: 'Orders', route: 'orders', badge: 5 },
    { icon: 'people', label: 'Customers', route: 'customers' },
    { icon: 'settings', label: 'Settings', route: 'settings' },
  ];

  userInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  };

  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set initial active route
    this.updateActiveRoute(this.router.url);
    
    // Subscribe to route changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateActiveRoute(event.urlAfterRedirects || event.url);
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateActiveRoute(url: string): void {
    const routeParts = url.split('/').filter(part => part);
    this.activeRoute = routeParts[0] || 'dashboard';
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  navigateTo(route: string): void {
    // this.router.navigate([`/${route}`]);
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }

  logout(): void {
    console.log('Logging out...');
    
    // Clear all authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Navigate to login
    this.router.navigate(['/login']).then(() => {
      console.log('Redirected to login');
    });
  }
}