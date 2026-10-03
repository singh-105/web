export interface BrandConfig {
  brandName: string;
  tagline: string;
  description: string;
  logoText: string;
  currencySymbol: string;
  currencyCode: string;
  supportEmail: string;
  supportPhone: string;
  storeLocations: {
    name: string;
    address: string;
    city: string;
    hours: string;
  }[];
  socialLinks: {
    instagram: string;
    twitter: string;
    pinterest: string;
  };
  navigationCategories: string[];
}

export const brandConfig: BrandConfig = {
  brandName: "AURA LUXE",
  tagline: "Contemporary Haute Couture & Urban Elegance",
  description: "Crafted for the discerning modern individual. Timeless silhouettes meet sustainable luxury fabrics.",
  logoText: "AURA LUXE",
  currencySymbol: "₹",
  currencyCode: "INR",
  supportEmail: "concierge@auraluxe.com",
  supportPhone: "+91 (800) 456-7890",
  storeLocations: [
    {
      name: "AURA Flagship Atelier - Bandra",
      address: "45 Linking Road, Bandra West",
      city: "Mumbai, MH 400050",
      hours: "10:30 AM - 9:00 PM Daily",
    },
    {
      name: "AURA Boutique - DLF Emporio",
      address: "Vasant Kunj Phase II",
      city: "New Delhi, DL 110070",
      hours: "11:00 AM - 9:30 PM Daily",
    },
    {
      name: "AURA House - UB City",
      address: "24 Vittal Mallya Road",
      city: "Bengaluru, KA 560001",
      hours: "10:00 AM - 8:30 PM Daily",
    },
  ],
  socialLinks: {
    instagram: "@auraluxe_official",
    twitter: "@auraluxe",
    pinterest: "pinterest.com/auraluxe",
  },
  navigationCategories: ["New Arrivals", "Men", "Women", "Kids", "Collections", "Sale"],
};
