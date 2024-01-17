export interface User {
  userId:string;
  userName: string;
  // passWordHash: "PaM7yDz1UqoCzgbR5oGmvA==;DZh4wzK+OiU1P5ngFUTURDVKKW9bAbfVi+lZDPZ+J5w=",
  fullName: string,
  dateOfBirth: Date,
  isMale: number,
  phoneNumber: number,
  email: string,
  address: string,
  userType: number,
  companyId: number,
  creatorUserId: string,
  lastModifyUserId: string,
  createDate: Date,
  lastModifyDate:Date,
  isDeleted: false,
  deletedDate: Date,
  isSelected:boolean,
  isLog:boolean
}
