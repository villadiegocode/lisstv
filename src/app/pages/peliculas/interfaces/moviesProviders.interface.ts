export interface MovieProviders {
    id:      number;
    results: Results;
}

export interface Results {
    AU: Au;
    CA: Au;
    GB: Au;
    IE: Au;
    IT: Au;
    NZ: Au;
    US: Au;
}

export interface Au {
    link: string;
    buy:  Buy[];
    rent: Buy[];
}

export interface Buy {
    logo_path:        string;
    provider_id:      number;
    provider_name:    string;
    display_priority: number;
}
