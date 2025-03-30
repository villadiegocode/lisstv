import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "../../../../environments/environment.development";


export function movieInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

    const movieApiKey = environment.movieApiKey;

    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${movieApiKey}`),
    });

    return next(newReq);
  }
