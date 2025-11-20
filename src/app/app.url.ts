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
  BusinessRegister: {
    Business: 'business',
    BusinessLocation: 'business/location',
    BusinessHours: 'business/hours',
    BusinessVerify: 'business/review',
  },
  ChatMessage: {
    Chat: 'ChatMessage',
    GetAllChatsForUser: 'GetAllChatsForUser',
    GetChatBetweenUsers: 'GetChatBetweenUsers'
  },
  AdminNotification: "admin/notify-new-business",
  BusinessNotification: "admin/notify-to-business",
  SearchBusiness: "SearchBusiness",
  BusinessReview: "BusinessReview",
  BusinessPhoto: "BusinessPhoto/bulk",
  BusinessDash: 'BusinessDash/dashboard',
  BusinessCategory: 'BusinessCategory',
  Dashboard: 'dashboard',
  Wildcard: '**'
};


export const Modules = {
  Base: environment.apiURL,
  Store: environment.fileURL
};