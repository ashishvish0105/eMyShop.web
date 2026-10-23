import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MockCommerceService, MenuItem } from '../mock-commerce.service';

interface AdminRecord {
  id: string;
  name: string;
  secondary: string;
  category: string;
  status: string;
  amount: number;
  stock: number;
}

@Component({
  selector: 'app-admin-pages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-pages.component.html',
})
export class AdminPagesComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly commerce = inject(MockCommerceService);
  readonly Math = Math;
  readonly customerRecords: AdminRecord[] = [
    { id: 'C-3021', name: 'Jordan Lee', secondary: 'jordan.lee@email.com · Joined May 2024', category: 'Gold', status: 'Active', amount: 428.5, stock: 12 },
    { id: 'C-3018', name: 'Amelia Chen', secondary: 'amelia.chen@email.com · Joined Jun 2024', category: 'Silver', status: 'Active', amount: 286, stock: 8 },
    { id: 'C-3014', name: 'Noah Williams', secondary: 'noah.w@email.com · Joined Jul 2024', category: 'Gold', status: 'Active', amount: 612.75, stock: 16 },
    { id: 'C-3009', name: 'Sofia Patel', secondary: 'sofia.p@email.com · Joined Aug 2024', category: 'New', status: 'Active', amount: 86.5, stock: 3 },
    { id: 'C-3005', name: 'Liam Garcia', secondary: 'liam.g@email.com · Joined Sep 2024', category: 'Silver', status: 'Inactive', amount: 194, stock: 6 },
    { id: 'C-2998', name: 'Olivia Brown', secondary: 'olivia.b@email.com · Joined Oct 2024', category: 'New', status: 'Active', amount: 72, stock: 2 },
  ];
  page = 'dashboard';
  search = '';
  statusFilter = 'All';
  sortDescending = true;
  pageIndex = 0;
  pageSize = 5;
  modal: 'create' | 'edit' | 'detail' | 'delete' | null = null;
  selected?: AdminRecord;
  private editingRecordId = '';
  notice = '';
  draft = { name: '', secondary: '', category: 'Mains', amount: 0, stock: 10 };
  settingsSaved = false;
  reportRange = 'Last 30 days';
  dashboardRange = 'Last 7 Days';
  alerts = { newOrders: true, lowStock: true, dailySummary: false };
  readonly hours = [
    { day: 'Monday', open: true, start: '09:00', end: '22:00' },
    { day: 'Tuesday–Saturday', open: true, start: '09:00', end: '22:00' },
    { day: 'Sunday', open: false, start: '09:00', end: '22:00' },
  ];
  settings = {
    businessName: 'Green Table Bistro',
    contactEmail: 'manager@greentable.com',
    phone: '+1 (555) 123-4567',
    currency: 'USD ($) - US Dollar',
  };
  private extraRecords: AdminRecord[] = [];
  private deletedIds = new Set<string>();

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.page = String(data['page'] ?? 'dashboard');
      this.pageIndex = 0;
      this.search = '';
    });
    this.route.queryParamMap.subscribe((params) => {
      this.search = params.get('search') ?? '';
    });
  }

  get title(): string {
    const titles: Record<string, string> = {
      dashboard: 'Good Morning, Joe', orders: 'Orders management', products: 'Menu management',
      customers: 'Customer database', inventory: 'Inventory control', reports: 'Business reports',
      settings: 'General settings',
    };
    return titles[this.page] ?? 'Dashboard';
  }

  get description(): string {
    const descriptions: Record<string, string> = {
      dashboard: 'Here is what is happening at your restaurant today.',
      orders: 'Review incoming orders and keep every delivery moving.',
      products: 'Keep your menu fresh and your best dishes in stock.',
      customers: 'Get to know the people who make your restaurant special.',
      inventory: 'Track stock levels and stay ahead of reorder needs.',
      reports: 'A clear view of sales, customer trends and performance.',
      settings: 'Manage your restaurant information and preferences.',
    };
    return descriptions[this.page] ?? '';
  }

  get records(): AdminRecord[] {
    const products = this.commerce.products.map((item: MenuItem) => ({
      id: `M-${item.id}`, name: item.name, secondary: item.description, category: item.category,
      status: item.status, amount: item.price, stock: item.stock,
    }));
    const orders = this.commerce.orders.map((order) => ({
      id: order.id, name: order.customer, secondary: order.items, category: 'Delivery',
      status: order.status, amount: order.total, stock: 1,
    }));
    let source = this.page === 'orders' ? orders : this.page === 'customers' ? this.customerRecords : products;
    if (this.page === 'inventory') source = products.filter((product) => product.stock < 20);
    return [...source, ...this.extraRecords].filter((record) => !this.deletedIds.has(record.id));
  }

  get filteredRecords(): AdminRecord[] {
    const query = this.search.toLowerCase().trim();
    return this.records
      .filter((record) => !query || `${record.id} ${record.name} ${record.secondary} ${record.category}`.toLowerCase().includes(query))
      .filter((record) => this.statusFilter === 'All' || record.status === this.statusFilter)
      .sort((a, b) => this.sortDescending ? b.amount - a.amount : a.amount - b.amount);
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.filteredRecords.length / this.pageSize));
  }

  get pageRecords(): AdminRecord[] {
    return this.filteredRecords.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  get totalItems(): number {
    return this.commerce.itemCount;
  }

  get lowStockCount(): number {
    return this.records.filter((item) => item.status === 'Low stock').length;
  }

  get reportBars(): number[] {
    if (this.reportRange === 'Last 7 days') return [42, 62, 57, 36, 78, 92, 68];
    if (this.reportRange === 'This year') return [30, 42, 37, 55, 50, 66, 61, 73, 68, 84, 79, 96];
    return [34, 46, 39, 58, 52, 70, 62, 79, 66, 90, 74, 96];
  }

  get dashboardBars(): number[] {
    return this.dashboardRange === 'Last 30 Days'
      ? [34, 46, 39, 58, 52, 70, 62]
      : [42, 62, 57, 36, 78, 92, 68];
  }

  get dashboardLabels(): string[] {
    return this.dashboardRange === 'Last 30 Days'
      ? ['1', '5', '10', '15', '20', '25', '30']
      : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  }

  money(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  openCreate(): void {
    this.editingRecordId = '';
    this.draft = { name: '', secondary: '', category: this.page === 'products' ? 'Mains' : 'Delivery', amount: 0, stock: 10 };
    this.modal = 'create';
  }

  editRecord(record: AdminRecord): void {
    this.selected = record;
    this.editingRecordId = record.id;
    this.draft = {
      name: record.name,
      secondary: record.secondary,
      category: record.category,
      amount: record.amount,
      stock: record.stock,
    };
    this.modal = 'edit';
  }

  saveRecord(): void {
    if (!this.draft.name.trim() || this.draft.amount < 0) return;
    if (this.modal === 'edit' && this.selected) {
      const product = this.commerce.products.find((item) => `M-${item.id}` === this.editingRecordId);
      if (product) {
        product.name = this.draft.name.trim();
        product.description = this.draft.secondary.trim();
        product.category = this.draft.category;
        product.price = Number(this.draft.amount);
        product.stock = Number(this.draft.stock);
        if (!product.stock) product.status = 'Unavailable';
        else if (product.stock < 10) product.status = 'Low stock';
        else product.status = 'Available';
      }
      const order = this.commerce.orders.find((item) => item.id === this.editingRecordId);
      if (order) {
        order.customer = this.draft.name.trim();
        order.items = this.draft.secondary.trim() || this.draft.category;
        order.total = Number(this.draft.amount);
      }
      const customer = this.customerRecords.find((item) => item.id === this.editingRecordId);
      if (customer) {
        customer.name = this.draft.name.trim();
        customer.secondary = this.draft.secondary.trim();
        customer.category = this.draft.category;
        customer.amount = Number(this.draft.amount);
      }
      const extra = this.extraRecords.find((item) => item.id === this.editingRecordId);
      if (extra) {
        extra.name = this.draft.name.trim();
        extra.secondary = this.draft.secondary.trim();
        extra.category = this.draft.category;
        extra.amount = Number(this.draft.amount);
        extra.stock = Number(this.draft.stock);
      }
      this.modal = null;
      this.showNotice(`${this.recordLabel} updated.`);
      return;
    }
    const id = `NEW-${Date.now()}`;
    if (this.page === 'dashboard' || this.page === 'orders') {
      this.commerce.orders.unshift({
        id: `#FD-${2050 + this.commerce.orders.length}`,
        customer: this.draft.name.trim(),
        email: this.draft.secondary.trim() || 'new.customer@email.com',
        items: this.draft.category,
        date: 'Just now',
        total: Number(this.draft.amount),
        status: 'Pending',
      });
      this.modal = null;
      this.showNotice('Order added to the local demo.');
      if (this.page === 'dashboard') this.router.navigate(['/seller-Account/orders']);
      return;
    }
    if (this.page === 'products' || this.page === 'inventory') {
      this.commerce.products.push({
        id: Math.max(0, ...this.commerce.products.map((item) => item.id)) + 1,
        name: this.draft.name.trim(),
        category: this.draft.category,
        description: this.draft.secondary.trim() || 'Freshly prepared with quality ingredients.',
        price: Number(this.draft.amount),
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
        stock: Number(this.draft.stock),
        status: Number(this.draft.stock) === 0 ? 'Unavailable' : Number(this.draft.stock) < 10 ? 'Low stock' : 'Available',
      });
    } else if (this.page === 'customers') {
      this.customerRecords.push({
        id, name: this.draft.name.trim(), secondary: this.draft.secondary.trim() || 'Added just now',
        category: this.draft.category, status: 'Active', amount: Number(this.draft.amount), stock: Number(this.draft.stock),
      });
    } else {
      this.extraRecords = [...this.extraRecords, {
        id, name: this.draft.name.trim(), secondary: this.draft.secondary.trim() || 'Added just now',
        category: this.draft.category, status: 'Available', amount: Number(this.draft.amount), stock: Number(this.draft.stock),
      }];
    }
    this.modal = null;
    this.showNotice(`${this.recordLabel} added successfully.`);
  }

  showDetails(record: AdminRecord): void {
    this.selected = record;
    this.modal = 'detail';
  }

  askDelete(record: AdminRecord): void {
    this.selected = record;
    this.modal = 'delete';
  }

  deleteRecord(): void {
    if (!this.selected) return;
    if (this.selected.id.startsWith('M-')) {
      const productId = Number(this.selected.id.slice(2));
      const productIndex = this.commerce.products.findIndex((item) => item.id === productId);
      if (productIndex >= 0) this.commerce.products.splice(productIndex, 1);
    }
    if (this.selected.id.startsWith('#FD-')) {
      const orderIndex = this.commerce.orders.findIndex((item) => item.id === this.selected?.id);
      if (orderIndex >= 0) this.commerce.orders.splice(orderIndex, 1);
    }
    if (this.selected.id.startsWith('C-')) {
      const customerIndex = this.customerRecords.findIndex((item) => item.id === this.selected?.id);
      if (customerIndex >= 0) this.customerRecords.splice(customerIndex, 1);
    }
    this.extraRecords = this.extraRecords.filter((item) => item.id !== this.selected?.id);
    this.deletedIds.add(this.selected.id);
    this.modal = null;
    this.showNotice(`${this.selected.name} removed.`);
  }

  updateStatus(record: AdminRecord): void {
    if (this.page === 'orders') {
      const order = this.commerce.orders.find((item) => item.id === record.id);
      if (!order || order.status === 'Completed' || order.status === 'Cancelled') {
        this.showNotice(`Order ${record.id} is already closed.`);
        return;
      }
      order.status = order.status === 'Pending' ? 'Preparing' : order.status === 'Preparing' ? 'Ready' : 'Completed';
      this.showNotice(`Order ${record.id} status updated to ${order.status}.`);
    } else if (this.page === 'products' || this.page === 'inventory') {
      const product = this.commerce.products.find((item) => `M-${item.id}` === record.id);
      if (product) product.status = product.status === 'Unavailable' ? 'Available' : 'Unavailable';
      this.showNotice(`${record.name} availability updated.`);
    } else {
      record.status = record.status === 'Active' ? 'Inactive' : 'Active';
      this.showNotice(`${record.name} status updated.`);
    }
  }

  nextPage(delta: number): void {
    this.pageIndex = Math.min(Math.max(0, this.pageIndex + delta), this.pageCount - 1);
  }

  saveSettings(): void {
    this.settingsSaved = true;
    this.showNotice('Settings saved in this demo.');
  }

  exportReport(): void {
    const header = ['ID', 'Name', 'Category', 'Status', 'Amount'];
    const rows = this.records.map((record) => [
      record.id,
      record.name,
      record.category,
      record.status,
      record.amount.toFixed(2),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(','))
      .join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'restoadmin-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  discardSettings(): void {
    this.settings = {
      businessName: 'Green Table Bistro',
      contactEmail: 'manager@greentable.com',
      phone: '+1 (555) 123-4567',
      currency: 'USD ($) - US Dollar',
    };
    this.settingsSaved = false;
  }

  get recordLabel(): string {
    return this.page === 'orders' || this.page === 'dashboard' ? 'Order' : this.page === 'customers' ? 'Customer' : 'Menu item';
  }

  get actionLabel(): string {
    return this.page === 'orders' || this.page === 'dashboard' ? 'New order' : this.page === 'customers' ? 'Add customer' : 'Add menu item';
  }

  showNotice(message: string): void {
    this.notice = message;
    setTimeout(() => this.notice = '', 2800);
  }
}
