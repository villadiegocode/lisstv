import { inject, Injectable } from '@angular/core';
import { from } from 'rxjs';
import { SupabaseAuthService } from './supabase-auth.service';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';

@Injectable({providedIn: 'root'})
export class AuthService {
    private _supabaseClient = inject(SupabaseAuthService).supabaseCliente;

    session(){
        return this._supabaseClient.auth.getSession();
    }

    async isSession() {
        const { data: { session } } = await this._supabaseClient.auth.getSession();
        return !!session;
    }

    signUp(credentials: SignUpWithPasswordCredentials){
        return from(this._supabaseClient.auth.signUp(credentials));

    }

    signIn( credentials: SignUpWithPasswordCredentials ){
        return from(  this._supabaseClient.auth.signInWithPassword(credentials) );

    }

    logOut(){
        return this._supabaseClient.auth.signOut();
    }

}
