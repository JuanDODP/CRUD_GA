export interface User {
    id:       number;
    name:     string;
    email:    string;
    password: string;
    isActive: boolean;
    rol:      string[];
    token:    string;
}
