import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <div class="bg-gradient-to-r from-[#3734A9] to-[#2d2a87] rounded-xl p-8 mb-8 text-white">
        <h1 class="text-3xl font-bold mb-2">Settings</h1>
        <p class="text-gray-200">Manage your account preferences and application settings</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Account Settings -->
        <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-[#3734A9] bg-opacity-10 rounded-lg mr-4">
              <i class="bi bi-person text-[#3734A9] text-xl"></i>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Account Settings</h2>
              <p class="text-sm text-gray-600">Manage your personal information</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <div class="flex items-center space-x-4">
                <img src="assets/p2.jpg" class="w-16 h-16 rounded-full object-cover" alt="Profile">
                <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Change Photo
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" value="John Doe" 
                     class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3734A9] focus:border-transparent">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value="john@example.com" 
                     class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3734A9] focus:border-transparent">
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-[#3734A9] bg-opacity-10 rounded-lg mr-4">
              <i class="bi bi-bell text-[#3734A9] text-xl"></i>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Notifications</h2>
              <p class="text-sm text-gray-600">Configure your notification preferences</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900">Email Notifications</h3>
                <p class="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3734A9]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3734A9]"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900">Push Notifications</h3>
                <p class="text-sm text-gray-600">Get instant updates in app</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3734A9]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3734A9]"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Appearance Settings -->
        <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-[#3734A9] bg-opacity-10 rounded-lg mr-4">
              <i class="bi bi-palette text-[#3734A9] text-xl"></i>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Appearance</h2>
              <p class="text-sm text-gray-600">Customize your interface</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <select class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3734A9] focus:border-transparent">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3734A9] focus:border-transparent">
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Privacy Settings -->
        <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-6">
            <div class="p-3 bg-[#3734A9] bg-opacity-10 rounded-lg mr-4">
              <i class="bi bi-shield-lock text-[#3734A9] text-xl"></i>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Privacy & Security</h2>
              <p class="text-sm text-gray-600">Manage your security preferences</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900">Two-Factor Authentication</h3>
                <p class="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3734A9]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3734A9]"></div>
              </label>
            </div>

            <button class="w-full px-4 py-2 mt-4 bg-[#3734A9] text-white rounded-lg hover:bg-[#2d2a87] transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-8">
        <button class="px-6 py-2 bg-[#3734A9] text-white rounded-lg hover:bg-[#2d2a87] transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SettingsComponent {}
