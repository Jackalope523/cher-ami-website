export interface AddPostRequest {
  time: string;
  caption: string;
  imageFile: File;
  imageWidth: number;
  imageHeight: number;
}

export interface EmailAuthRequest {
  email: string;
}

export interface EmailVerifyRequest {
  email: string;
  code: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  avatarFile: File | null;
}

export interface CreateCircleRequest {
  title: string;
  imageFile: File;
}

export interface UpdateCircleRequest {
  title: string;
  headerFile: File | null;
}

export interface JoinCircleRequest {
  code: string;
}

export interface TokenRequest {
  authorizationCode: string;
}

export interface IdRequest {
  Id: number;
}

export interface RecipientRequest {
  avatarFile: File | null;
  name: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  provinceOrState: string;
  postalCode: string;
  country: string;
  isVeteran: boolean;
}

export interface UpdateRecipientRequest {
  id: number;
  avatarFile: File | null;
  name: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  provinceOrState: string;
  postalCode: string;
  country: string;
  isVeteran: boolean;
}
