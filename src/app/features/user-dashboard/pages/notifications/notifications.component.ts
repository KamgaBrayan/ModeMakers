import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

@Component({
  selector: 'app-notifications',
  template: `

<body class="bg-gray-50">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header avec titre et filtres -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Mes Notifications</h1>
        <p class="text-sm text-gray-500 mt-1">Gérez vos notifications et restez informé</p>
      </div>
      
      <div class="flex gap-3 w-full sm:w-auto">
        <button class="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all">
          <i class="fas fa-check-double mr-2"></i>
          Tout marquer comme lu
        </button>
        
        <div class="relative flex-1 sm:flex-initial">
          <select class="w-full sm:w-auto appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3734A9] hover:border-gray-400 transition-colors">
            <option value="all">Toutes les notifications</option>
            <option value="unread">Non lues</option>
            <option value="read">Lues</option>
          </select>
          <div class="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
            <i class="fas fa-chevron-down text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Liste des notifications -->
    <div class="space-y-4">
      <!-- Notification non lue -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative">
        <div class="absolute top-4 right-4 h-2 w-2 bg-blue-500 rounded-full"></div>
        <div class="flex gap-4">
          <div class="w-12 h-12 rounded-full bg-[#3734A9] bg-opacity-10 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-bell text-[#3734A9] text-lg"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <h3 class="text-base font-semibold text-gray-900">Nouvelle mise à jour disponible</h3>
              <span class="text-sm text-gray-500">Il y a 2 heures</span>
            </div>
            <p class="mt-1 text-sm text-gray-600 leading-relaxed">Une nouvelle version de l'application est disponible. Découvrez les nouvelles fonctionnalités et améliorations de performances.</p>
            <div class="mt-3 flex gap-2">
              <button class="text-[#3734A9] text-sm font-medium hover:text-[#2d2b8a] transition-colors">
                Voir les détails
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Notification lue -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
        <div class="flex gap-4">
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-check text-green-600 text-lg"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <h3 class="text-base font-semibold text-gray-900">Tâche complétée avec succès</h3>
              <span class="text-sm text-gray-500">Hier</span>
            </div>
            <p class="mt-1 text-sm text-gray-600 leading-relaxed">L'exportation de vos données a été effectuée avec succès. Vous pouvez maintenant télécharger vos fichiers.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- État vide -->
    <div class="hidden mt-8 text-center">
      <div class="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
        <i class="fas fa-bell-slash text-gray-400 text-xl"></i>
      </div>
      <h3 class="mt-4 text-lg font-medium text-gray-900">Aucune notification</h3>
      <p class="mt-1 text-sm text-gray-500">Vous n'avez pas de nouvelles notifications pour le moment.</p>
    </div>
  </div>
</body>


`,
  standalone: true,
  imports: [FormsModule]
})
export class NotificationsComponent {
  sortBy: 'popular' | 'recent' = 'popular';
  notifications: Notification[] = [
    {
      id: 1,
      title: 'Nouvelle collection disponible',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq',
      timestamp: new Date(),
      isRead: false
    },
    // Add more notifications...
  ];

  formatTimeAgo(date: Date): string {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} mins ago`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m ago`;
  }
}
