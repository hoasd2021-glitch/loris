
import { Product, ShippingOption } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "سماعات رأس لاسلكية برو",
    price: 299,
    category: "إلكترونيات",
    brand: "SoundCore",
    description: "سماعات رأس عالية الجودة مع خاصية إلغاء الضوضاء وعمر بطارية طويل يصل إلى 30 ساعة.",
    images: ["https://picsum.photos/400/400?random=1"],
    stock: 45,
    colors: ["أسود", "فضي", "أزرق"],
    sizes: [],
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: 2,
    name: "ساعة ذكية رياضية",
    price: 450,
    category: "إكسسوارات",
    brand: "FitTech",
    description: "ساعة ذكية تتبع لياقتك البدنية، نبضات القلب، ومقاومة للماء حتى عمق 50 متر.",
    images: ["https://picsum.photos/400/400?random=2"],
    stock: 12,
    colors: ["أسود", "وردي"],
    sizes: ["40mm", "44mm"],
    rating: 4.5,
    reviewsCount: 89
  },
  {
    id: 3,
    name: "حقيبة ظهر عصرية",
    price: 120,
    category: "موضة",
    brand: "TravelMate",
    description: "حقيبة ظهر مريحة وأنيقة، مثالية للعمل أو السفر، مع جيب مخصص للكمبيوتر المحمول.",
    images: ["https://picsum.photos/400/400?random=3"],
    stock: 0,
    colors: ["رمادي", "كحلي"],
    sizes: ["وسط", "كبير"],
    rating: 4.2,
    reviewsCount: 34
  },
  {
    id: 4,
    name: "كاميرا احترافية 4K",
    price: 3500,
    category: "تصوير",
    brand: "ProCam",
    description: "كاميرا رقمية بدقة عالية وتصوير فيديو 4K، مثالية للمصورين المحترفين وصناع المحتوى.",
    images: ["https://picsum.photos/400/400?random=4"],
    stock: 3,
    colors: ["أسود"],
    sizes: [],
    rating: 4.9,
    reviewsCount: 210
  },
  {
    id: 5,
    name: "حذاء رياضي مريح",
    price: 250,
    category: "موضة",
    brand: "SpeedRun",
    description: "حذاء رياضي بتصميم انسيابي يوفر راحة قصوى أثناء الجري والمشي لمسافات طويلة.",
    images: ["https://picsum.photos/400/400?random=5"],
    stock: 25,
    colors: ["أبيض", "أسود/أحمر"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    rating: 4.6,
    reviewsCount: 76
  },
  {
    id: 6,
    name: "مصباح مكتب ذكي",
    price: 85,
    category: "منزل",
    brand: "Lumiere",
    description: "مصباح مكتب LED يمكن التحكم فيه عبر التطبيق، مع إمكانية تغيير الألوان والسطوع.",
    images: ["https://picsum.photos/400/400?random=6"],
    stock: 8,
    colors: ["أبيض"],
    sizes: [],
    rating: 4.3,
    reviewsCount: 45
  },
  {
    id: 7,
    name: "لوحة مفاتيح ميكانيكية",
    price: 320,
    category: "إلكترونيات",
    brand: "GameMaster",
    description: "لوحة مفاتيح للألعاب باستجابة سريعة وإضاءة RGB خلفية قابلة للتخصيص.",
    images: ["https://picsum.photos/400/400?random=7"],
    stock: 0,
    colors: ["أسود", "أبيض"],
    sizes: ["كاملة", "TKL"],
    rating: 4.7,
    reviewsCount: 156
  },
  {
    id: 8,
    name: "نظارات شمسية كلاسيكية",
    price: 150,
    category: "موضة",
    brand: "SunGuard",
    description: "نظارات شمسية بتصميم كلاسيكي وعدسات تحمي من الأشعة فوق البنفسجية.",
    images: ["https://picsum.photos/400/400?random=8"],
    stock: 15,
    colors: ["ذهبي", "أسود"],
    sizes: [],
    rating: 4.4,
    reviewsCount: 28
  }
];

export const APP_NAME = "متجر المستقبل";

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    name: 'شحن قياسي',
    price: 25,
    description: 'توصيل اقتصادي وموثوق',
    estimatedDays: '3-5 أيام عمل'
  },
  {
    id: 'express',
    name: 'شحن سريع',
    price: 50,
    description: 'الأفضل للطلبات المستعجلة',
    estimatedDays: '1-2 يوم عمل'
  },
  {
    id: 'pickup',
    name: 'استلام من الفرع',
    price: 0,
    description: 'استلم طلبك من أقرب فرع',
    estimatedDays: 'جاهز خلال ساعتين'
  }
];
