import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';



@Injectable({providedIn: 'root'})
export class SupabaseAuthService {
    supabaseCliente!: SupabaseClient;
    supabaseUrl = environment.supabaseUrl
    supabaseApiKey = environment.apiKeySupabase;
    constructor() {
        this.supabaseCliente = createClient(this.supabaseUrl, this.supabaseApiKey);
    }

}
