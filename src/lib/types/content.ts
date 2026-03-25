export type EventStatus = "active" | "upcoming" | "expired";

export type PublishStatus = "draft" | "published";

export type UserRole = "admin" | "senior_admin" | "editor";

export type EventItem = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  image_url: string;
  thumbnail_url?: string;
  link: string | null;
  status: EventStatus;
};

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover: string;
  category: string;
  created_at: string;
  status: PublishStatus;
};

export type GalleryItem = {
  id: string;
  image_url: string;
  tag: string;
  created_at: string;
};

export type UserItem = {
  id: string;
  email: string;
  role: UserRole;
  views: number;
  created_at: string;
};

export type InvitedEmailItem = {
  id: string;
  email: string;
  created_at: string;
  expires_at: string;
};

export type ActiveAdminItem = {
  id: string;
  email: string;
  last_seen: string;
};

export type AdminActivityLogItem = {
  id: string;
  actor_email: string;
  action: string;
  target_type: string;
  target_id?: string | null;
  summary: string;
  created_at: string;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: string;
  updated_at: string;
};

export type DashboardStats = {
  users: number;
  events: number;
  news: number;
  views: number;
};
