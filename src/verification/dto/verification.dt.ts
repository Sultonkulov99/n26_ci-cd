
export class SendOtpDto {
  phone: string;
}

export class VerifyOtpDto extends SendOtpDto {
  otp: string;
}
