import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface StatCard {
  icon: string;
  iconColor: string;
  value: string;
  label: string;
  change: string;
  changeType: 'positive' | 'negative';
}

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'processing';
}

interface Product {
  id: string;
  name: string;
  image: string;
  sold: number;
  revenue: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Stats Data
  stats: StatCard[] = [
    {
      icon: '💰',
      iconColor: 'blue',
      value: '฿12,450',
      label: "Today's Sales",
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      icon: '📦',
      iconColor: 'green',
      value: '143',
      label: 'Orders',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      icon: '👥',
      iconColor: 'purple',
      value: '89',
      label: 'Customers',
      change: '+5.1%',
      changeType: 'positive'
    },
    {
      icon: '📊',
      iconColor: 'orange',
      value: '฿87',
      label: 'Avg. Order Value',
      change: '-2.3%',
      changeType: 'negative'
    }
  ];

  // Recent Orders
  recentOrders: Order[] = [
    { id: 'ORD-1234', customer: 'John Doe', amount: 350, status: 'completed' },
    { id: 'ORD-1233', customer: 'Jane Smith', amount: 125, status: 'pending' },
    { id: 'ORD-1232', customer: 'Mike Johnson', amount: 280, status: 'completed' },
    { id: 'ORD-1231', customer: 'Sarah Wilson', amount: 450, status: 'processing' }
  ];

  // Top Products
  topProducts: Product[] = [
    { id: '1', name: 'Coca Cola 325ml', image: 'https://via.placeholder.com/50', sold: 245, revenue: 6125 },
    { id: '2', name: 'Mama Instant Noodles', image: 'https://via.placeholder.com/50', sold: 189, revenue: 1890 },
    { id: '3', name: 'Water Bottle 1.5L', image: 'https://via.placeholder.com/50', sold: 167, revenue: 2505 },
    { id: '4', name: "Lay's Chips Original", image: 'https://via.placeholder.com/50', sold: 143, revenue: 3575 }
  ];

  // Chart Data (simple bar heights)
  chartData = [
    { day: 'Mon', height: 60 },
    { day: 'Tue', height: 75 },
    { day: 'Wed', height: 45 },
    { day: 'Thu', height: 85 },
    { day: 'Fri', height: 70 },
    { day: 'Sat', height: 90 },
    { day: 'Sun', height: 65 }
  ];

  selectedPeriod = 'Last 7 days';
  notificationCount = 3;
  userName = 'Admin User';
  userAvatar = 'https://ui-avatars.com/api/?name=Admin+User&background=667eea&color=fff';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuth();
    this.animateCards();
  document.body.classList.add('dashboard-bg');

  }


ngOnDestroy() {
  document.body.classList.remove('dashboard-bg');
}

  checkAuth(): void {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  animateCards(): void {
    setTimeout(() => {
      const cards = document.querySelectorAll('.stat-card, .card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          (card as HTMLElement).style.opacity = '1';
          (card as HTMLElement).style.transform = 'translateY(0)';
        }, 100 * index);
      });
    }, 100);
  }

  toggleMenu(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    if (sidebar) {
      sidebar.style.left = sidebar.style.left === '0px' ? '-260px' : '0px';
    }
  }

  onPeriodChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedPeriod = target.value;
    console.log('Period changed to:', this.selectedPeriod);
    // Here you would typically fetch new data based on the selected period
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Quick Actions
  newSale(): void {
    console.log('Navigate to POS');
    this.router.navigate(['/pos']);
  }

  addProduct(): void {
    console.log('Navigate to Add Product');
    this.router.navigate(['/products/new']);
  }

  addCustomer(): void {
    console.log('Navigate to Add Customer');
    this.router.navigate(['/customers/new']);
  }

  viewReports(): void {
    console.log('Navigate to Reports');
    this.router.navigate(['/reports']);
  }

  viewAllOrders(): void {
    this.router.navigate(['/orders']);
  }

  viewAllProducts(): void {
    this.router.navigate(['/products']);
  }

  getStatusClass(status: string): string {
    return status;
  }
  //   logout() {
  //   // ลบ token ทั้งหมด
  //   localStorage.removeItem('token');
  //   sessionStorage.removeItem('token');

  //   // กลับไปหน้า login
  //   this.router.navigate(['/login']);
  // }
}