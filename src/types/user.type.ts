export default interface IUser {
   id?: string | null;
   username: string;
   email: string;
   password: string;
   roles?: Array<string>;
}
