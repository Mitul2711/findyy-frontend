import { environment } from "../environment/environment";

export const FixedRoutes = {
  Root: '',
  Auth: {
    Url: 'auth',
    Lock: 'lock',
    Reset: 'reset',
    SignIn: 'signin',
    SignUp: 'signup',
    Forgot: 'forgot',
  },
  Dashboard: 'dashboard',
  Wildcard: '**'
};


export const Modules = {
  Base: environment.apiURL,
  Store: environment.fileURL
};