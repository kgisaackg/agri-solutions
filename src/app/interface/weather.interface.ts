export interface weather{
    user_id: string;
    uuid?: string;
    location: string;
    date: Date;
    temperature: string;
    notification: boolean;
}