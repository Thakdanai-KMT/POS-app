import { Component, OnInit } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  color: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  sold: number;
  stock: number;
  image: string;
  trend: 'up' | 'down' | 'stable';
}

interface Order {
  id: string;
  customerName: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  time: string;
}

interface SalesData {
  period: string;
  amount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
      standalone: false,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedPeriod: 'daily' | 'monthly' | 'yearly' = 'daily';

  // Stats สำหรับแต่ละช่วงเวลา
  statsData = {
    daily: [
      {
        title: 'ยอดขายวันนี้',
        value: '฿12,450',
        change: '+15.3%',
        isPositive: true,
        icon: 'payments',
        color: 'purple'
      },
      {
        title: 'ออเดอร์วันนี้',
        value: '48',
        change: '+8.2%',
        isPositive: true,
        icon: 'shopping_cart',
        color: 'blue'
      },
      {
        title: 'ลูกค้าใหม่',
        value: '12',
        change: '+25%',
        isPositive: true,
        icon: 'person_add',
        color: 'green'
      },
      {
        title: 'มูลค่าเฉลี่ย/ออเดอร์',
        value: '฿259',
        change: '-2.4%',
        isPositive: false,
        icon: 'account_balance_wallet',
        color: 'orange'
      }
    ],
    monthly: [
      {
        title: 'ยอดขายเดือนนี้',
        value: '฿348,900',
        change: '+22.5%',
        isPositive: true,
        icon: 'payments',
        color: 'purple'
      },
      {
        title: 'ออเดอร์เดือนนี้',
        value: '1,245',
        change: '+18.7%',
        isPositive: true,
        icon: 'shopping_cart',
        color: 'blue'
      },
      {
        title: 'ลูกค้าใหม่',
        value: '287',
        change: '+31%',
        isPositive: true,
        icon: 'person_add',
        color: 'green'
      },
      {
        title: 'มูลค่าเฉลี่ย/ออเดอร์',
        value: '฿280',
        change: '+3.2%',
        isPositive: true,
        icon: 'account_balance_wallet',
        color: 'orange'
      }
    ],
    yearly: [
      {
        title: 'ยอดขายปีนี้',
        value: '฿4.2M',
        change: '+35.8%',
        isPositive: true,
        icon: 'payments',
        color: 'purple'
      },
      {
        title: 'ออเดอร์ปีนี้',
        value: '14,567',
        change: '+28.3%',
        isPositive: true,
        icon: 'shopping_cart',
        color: 'blue'
      },
      {
        title: 'ลูกค้าทั้งหมด',
        value: '3,421',
        change: '+42%',
        isPositive: true,
        icon: 'groups',
        color: 'green'
      },
      {
        title: 'มูลค่าเฉลี่ย/ออเดอร์',
        value: '฿288',
        change: '+5.7%',
        isPositive: true,
        icon: 'account_balance_wallet',
        color: 'orange'
      }
    ]
  };

  stats: StatCard[] = this.statsData.daily;

  topProducts: Product[] = [
    {
      id: 1,
      name: 'น้ำดื่ม 600ml',
      category: 'เครื่องดื่ม',
      price: 10,
      sold: 145,
      stock: 500,
      image: '🥤',
      trend: 'up'
    },
    {
      id: 2,
      name: 'มาม่ากึ่งสำเร็จรูป',
      category: 'อาหารแห้ง',
      price: 12,
      sold: 132,
      stock: 320,
      image: '🍜',
      trend: 'up'
    },
    {
      id: 3,
      name: 'ขนมปังแซนวิช',
      category: 'เบเกอรี่',
      price: 35,
      sold: 98,
      stock: 150,
      image: '🥪',
      trend: 'stable'
    },
    {
      id: 4,
      name: 'นมกล่อง UHT',
      category: 'นมและโยเกิร์ต',
      price: 18,
      sold: 87,
      stock: 200,
      image: '🥛',
      trend: 'up'
    },
    {
      id: 5,
      name: 'ไข่ไก่ (ฟอง)',
      category: 'อาหารสด',
      price: 5,
      sold: 76,
      stock: 180,
      image: '🥚',
      trend: 'down'
    }
  ];

  recentOrders: Order[] = [
    {
      id: 'ORD-2024-001',
      customerName: 'คุณสมชาย ใจดี',
      items: 8,
      total: 245,
      status: 'completed',
      time: '5 นาทีที่แล้ว'
    },
    {
      id: 'ORD-2024-002',
      customerName: 'คุณสมหญิง รักสุข',
      items: 5,
      total: 180,
      status: 'processing',
      time: '12 นาทีที่แล้ว'
    },
    {
      id: 'ORD-2024-003',
      customerName: 'คุณประยุทธ มั่นคง',
      items: 12,
      total: 420,
      status: 'pending',
      time: '18 นาทีที่แล้ว'
    },
    {
      id: 'ORD-2024-004',
      customerName: 'คุณวิภา สวยงาม',
      items: 3,
      total: 95,
      status: 'completed',
      time: '25 นาทีที่แล้ว'
    },
    {
      id: 'ORD-2024-005',
      customerName: 'คุณสุชาติ ขยัน',
      items: 15,
      total: 580,
      status: 'processing',
      time: '35 นาทีที่แล้ว'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // เรียก API หรือ service ต่างๆ ที่ต้องการ
  }

  changePeriod(period: 'daily' | 'monthly' | 'yearly'): void {
    this.selectedPeriod = period;
    this.stats = this.statsData[period];
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'รอดำเนินการ',
      'processing': 'กำลังจัดเตรียม',
      'completed': 'สำเร็จ',
      'cancelled': 'ยกเลิก'
    };
    return statusMap[status] || status;
  }

  getTrendIcon(trend: string): string {
    if (trend === 'up') return 'trending_up';
    if (trend === 'down') return 'trending_down';
    return 'trending_flat';
  }

  getTrendColor(trend: string): string {
    if (trend === 'up') return '#22c55e';
    if (trend === 'down') return '#ef4444';
    return '#94a3b8';
  }
}