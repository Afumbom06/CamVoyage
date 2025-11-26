import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'fr';

interface TranslationStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useTranslation = create<TranslationStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);

// Translation dictionary
export const translations = {
  en: {
    // Admin Navigation
    dashboard: 'Dashboard',
    destinations: 'Destinations',
    financial: 'Financial',
    users: 'Users',
    blog: 'Blog',
    settings: 'Settings',
    logout: 'Logout',
    backToWebsite: 'Back to Website',
    
    // Admin Top Bar
    search: 'Search...',
    notifications: 'Notifications',
    profile: 'Profile',
    adminDashboard: 'Admin Dashboard',
    
    // Dashboard Overview
    dashboardOverview: 'Dashboard Overview',
    welcomeBack: "Welcome back! Here's what's happening.",
    totalDestinations: 'Total Destinations',
    totalUsers: 'Total Users',
    monthlyVisits: 'Monthly Visits',
    monthlyRevenue: 'Monthly Revenue',
    recentActivity: 'Recent Activity',
    topDestinations: 'Top Destinations',
    monthlyStatistics: 'Monthly Statistics',
    
    // Destinations Management
    destinationsManagement: 'Destinations Management',
    manageAllDestinations: 'Manage all tourist destinations',
    addDestination: 'Add Destination',
    allDestinations: 'All Destinations',
    name: 'Name',
    region: 'Region',
    category: 'Category',
    rating: 'Rating',
    entryFee: 'Entry Fee',
    actions: 'Actions',
    addNewDestination: 'Add New Destination',
    save: 'Save',
    cancel: 'Cancel',
    saveDestination: 'Save Destination',
    description: 'Description',
    difficulty: 'Difficulty',
    
    // Financial Management
    financialManagement: 'Financial Management',
    trackRevenue: 'Track revenue, expenses, and profitability',
    exportPDF: 'Export PDF',
    exportExcel: 'Export Excel',
    totalRevenue: 'Total Revenue',
    totalExpenses: 'Total Expenses',
    netProfit: 'Net Profit',
    profitMargin: 'Profit Margin',
    revenueVsExpenses: 'Revenue vs Expenses Trend',
    recentTransactions: 'Recent Transactions',
    addTransaction: 'Add Transaction',
    date: 'Date',
    type: 'Type',
    amount: 'Amount',
    income: 'Income',
    expense: 'Expense',
    
    // Users Management
    usersManagement: 'Users Management',
    manageUserAccounts: 'Manage user accounts and permissions',
    totalUsers: 'Total Users',
    activeUsers: 'Active Users',
    bannedUsers: 'Banned Users',
    newThisMonth: 'New This Month',
    searchUsers: 'Search users by name or email...',
    allUsers: 'All Users',
    user: 'User',
    email: 'Email',
    joinDate: 'Join Date',
    status: 'Status',
    activity: 'Activity',
    
    // Blog Management
    blogManagement: 'Blog Management',
    createManageArticles: 'Create and manage blog articles',
    newArticle: 'New Article',
    totalArticles: 'Total Articles',
    published: 'Published',
    drafts: 'Drafts',
    totalViews: 'Total Views',
    allArticles: 'All Articles',
    title: 'Title',
    author: 'Author',
    
    // Settings
    manageSettings: 'Manage your account and system settings',
    profile: 'Profile',
    security: 'Security',
    system: 'System',
    appearance: 'Appearance',
    adminProfile: 'Admin Profile',
    saveChanges: 'Save Changes',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    twoFactorAuth: 'Two-Factor Authentication',
    securitySettings: 'Security Settings',
    systemSettings: 'System Settings',
    appearanceSettings: 'Appearance Settings',
    
    // Common
    free: 'Free',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    active: 'Active',
    inactive: 'Inactive',
    enabled: 'Enabled',
    disabled: 'Disabled',
    yes: 'Yes',
    no: 'No',
  },
  fr: {
    // Admin Navigation
    dashboard: 'Tableau de bord',
    destinations: 'Destinations',
    financial: 'Financier',
    users: 'Utilisateurs',
    blog: 'Blog',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    backToWebsite: 'Retour au site',
    
    // Admin Top Bar
    search: 'Rechercher...',
    notifications: 'Notifications',
    profile: 'Profil',
    adminDashboard: 'Tableau de bord Admin',
    
    // Dashboard Overview
    dashboardOverview: 'Aperçu du tableau de bord',
    welcomeBack: 'Bon retour! Voici ce qui se passe.',
    totalDestinations: 'Total des destinations',
    totalUsers: 'Total des utilisateurs',
    monthlyVisits: 'Visites mensuelles',
    monthlyRevenue: 'Revenus mensuels',
    recentActivity: 'Activité récente',
    topDestinations: 'Meilleures destinations',
    monthlyStatistics: 'Statistiques mensuelles',
    
    // Destinations Management
    destinationsManagement: 'Gestion des destinations',
    manageAllDestinations: 'Gérer toutes les destinations touristiques',
    addDestination: 'Ajouter une destination',
    allDestinations: 'Toutes les destinations',
    name: 'Nom',
    region: 'Région',
    category: 'Catégorie',
    rating: 'Évaluation',
    entryFee: "Frais d'entrée",
    actions: 'Actions',
    addNewDestination: 'Ajouter une nouvelle destination',
    save: 'Enregistrer',
    cancel: 'Annuler',
    saveDestination: 'Enregistrer la destination',
    description: 'Description',
    difficulty: 'Difficulté',
    
    // Financial Management
    financialManagement: 'Gestion financière',
    trackRevenue: 'Suivre les revenus, dépenses et rentabilité',
    exportPDF: 'Exporter en PDF',
    exportExcel: 'Exporter en Excel',
    totalRevenue: 'Revenus totaux',
    totalExpenses: 'Dépenses totales',
    netProfit: 'Bénéfice net',
    profitMargin: 'Marge bénéficiaire',
    revenueVsExpenses: 'Tendance revenus vs dépenses',
    recentTransactions: 'Transactions récentes',
    addTransaction: 'Ajouter une transaction',
    date: 'Date',
    type: 'Type',
    amount: 'Montant',
    income: 'Revenu',
    expense: 'Dépense',
    
    // Users Management
    usersManagement: 'Gestion des utilisateurs',
    manageUserAccounts: 'Gérer les comptes et permissions des utilisateurs',
    totalUsers: 'Total des utilisateurs',
    activeUsers: 'Utilisateurs actifs',
    bannedUsers: 'Utilisateurs bannis',
    newThisMonth: 'Nouveaux ce mois',
    searchUsers: 'Rechercher par nom ou email...',
    allUsers: 'Tous les utilisateurs',
    user: 'Utilisateur',
    email: 'Email',
    joinDate: "Date d'inscription",
    status: 'Statut',
    activity: 'Activité',
    
    // Blog Management
    blogManagement: 'Gestion du blog',
    createManageArticles: 'Créer et gérer les articles de blog',
    newArticle: 'Nouvel article',
    totalArticles: 'Total des articles',
    published: 'Publiés',
    drafts: 'Brouillons',
    totalViews: 'Vues totales',
    allArticles: 'Tous les articles',
    title: 'Titre',
    author: 'Auteur',
    
    // Settings
    manageSettings: 'Gérer vos paramètres de compte et système',
    profile: 'Profil',
    security: 'Sécurité',
    system: 'Système',
    appearance: 'Apparence',
    adminProfile: 'Profil administrateur',
    saveChanges: 'Enregistrer les modifications',
    changePassword: 'Changer le mot de passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    twoFactorAuth: 'Authentification à deux facteurs',
    securitySettings: 'Paramètres de sécurité',
    systemSettings: 'Paramètres système',
    appearanceSettings: "Paramètres d'apparence",
    
    // Common
    free: 'Gratuit',
    edit: 'Modifier',
    delete: 'Supprimer',
    view: 'Voir',
    active: 'Actif',
    inactive: 'Inactif',
    enabled: 'Activé',
    disabled: 'Désactivé',
    yes: 'Oui',
    no: 'Non',
  },
};

export function useT() {
  const { language } = useTranslation();
  
  return (key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  };
}
