export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          status: Database["public"]["Enums"]["account_status"];
          display_name: string | null;
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          avatar_path: string | null;
          suspended_at: string | null;
          suspension_reason: string | null;
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: Database["public"]["Enums"]["app_role"];
          status?: Database["public"]["Enums"]["account_status"];
          display_name?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      shops: {
        Row: {
          id: string;
          owner_id: string;
          slug: string;
          name: string;
          description: string;
          logo_path: string | null;
          cover_path: string | null;
          status: Database["public"]["Enums"]["shop_status"];
          rating_average: number;
          rating_count: number;
          commission_rate_bps: number;
          approved_at: string | null;
          approved_by: string | null;
          rejection_reason: string | null;
          suspended_at: string | null;
          suspension_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          slug: string;
          name: string;
          description?: string;
          status?: Database["public"]["Enums"]["shop_status"];
        };
        Update: Partial<Database["public"]["Tables"]["shops"]["Insert"]>;
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          parent_id: string | null;
          slug: string;
          name: string;
          description: string | null;
          image_path: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          parent_id?: string | null;
          slug: string;
          name: string;
          description?: string | null;
          image_path?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          external_key: string | null;
          shop_id: string;
          category_id: string;
          slug: string;
          name: string;
          short_name: string;
          description: string;
          status: Database["public"]["Enums"]["product_status"];
          brand: string | null;
          specifications: Json;
          rating_average: number;
          rating_count: number;
          sold_count: number;
          published_at: string | null;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          external_key?: string | null;
          shop_id: string;
          category_id: string;
          slug: string;
          name: string;
          short_name: string;
          description?: string;
          status?: Database["public"]["Enums"]["product_status"];
          brand?: string | null;
          specifications?: Json;
          rating_average?: number;
          rating_count?: number;
          sold_count?: number;
          published_at?: string | null;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: {
      public_product_catalog: {
        Row: {
          id: string | null;
          external_key: string | null;
          slug: string | null;
          name: string | null;
          short_name: string | null;
          description: string | null;
          category_slug: string | null;
          category_name: string | null;
          category_description: string | null;
          category_image_path: string | null;
          shop_name: string | null;
          shop_rating: number | null;
          rating_average: number | null;
          rating_count: number | null;
          sold_count: number | null;
          specifications: Json | null;
          primary_image_path: string | null;
          gallery_paths: string[] | null;
          price_amount: number | null;
          compare_at_amount: number | null;
          stock_available: number | null;
          colors: Json | null;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: {
      app_role: "USER" | "ADMIN";
      account_status: "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
      shop_status: "DRAFT" | "PENDING_REVIEW" | "ACTIVE" | "REJECTED" | "SUSPENDED";
      product_status: "DRAFT" | "PENDING_REVIEW" | "ACTIVE" | "REJECTED" | "SUSPENDED" | "ARCHIVED";
    };
    CompositeTypes: Record<string, never>;
  };
};
