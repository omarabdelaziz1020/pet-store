export interface Pet {
    id: number;
    name: string;
    status: string;
    category?: { id: number; name: string };
    tags?: { id: number; name: string }[];
    photoUrls?: string[];
} 