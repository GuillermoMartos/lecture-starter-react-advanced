import { USER_BASE_AND_PATHS } from '../../common/constants';
import { UserSignInUpResponse, UserAuthResponse, SignInRequestBody, SignUpRequestBody } from '../../common/types';
import { Accept, ContentType } from '../constants';
import { Http } from '../http/http.service';

type Constructor={
    baseUrl: string,
    http: Http
}

export class Users{
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ http, baseUrl }: Constructor) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.basePath= USER_BASE_AND_PATHS.BASE_PATH;
  }
    
  public authUser(token:string): Promise<UserAuthResponse>{
    return this.http.load(
      this.getUrl(USER_BASE_AND_PATHS.PATHS.AUTH),
      { accept: Accept.JSON, authorization: `Bearer ${token}` });
  }
    
  public signIn(payload: SignInRequestBody): Promise<UserSignInUpResponse>{
    return this.http.load(
      this.getUrl(USER_BASE_AND_PATHS.PATHS.SIGN_IN),
      {
        method:'POST',
        accept: Accept.JSON,
        contentType: ContentType.JSON,
        payload: this.http.stringifyPayload(payload),
      });
  }
    
  public signUp(payload: SignUpRequestBody): Promise<UserSignInUpResponse>{
    return this.http.load(
      this.getUrl(USER_BASE_AND_PATHS.PATHS.SIGN_UP),
      {
        method:'POST',
        accept: Accept.JSON,
        contentType: ContentType.JSON,
        payload: this.http.stringifyPayload(payload),
      });
  }
    
  private getUrl(path:string):string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
  
}