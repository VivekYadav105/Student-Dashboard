export const loginConfig = {
  pageName: 'Signin',
  caption: 'Signin with your roll No',
  fields: [
    {name: 'rollNo', placeholder: 'enter your RollNo', secureTextEntry: false},
    {
      name: 'password',
      placeholder: 'enter your password',
      secureTextEntry: true,
    },
  ],
  primaryBtn: {displayText: 'login'},
  secondaryBtn: {displayText: 'Create Account', pageType: 'signup'},
};

export const ForgotPasswordConfig = {
  pageName: 'Forgot Password',
  caption: 'Confirm your Roll No',
  fields: [
    {name: 'RollNo', placeholder: 'enter your rollno', secureTextEntry: false},
  ],
  primaryBtn: {displayText: 'submit'},
  seconaryBtn: {displayText: 'go to home', pageType: 'login'},
};

export const ResetPasswordConfig = {
  pageName: 'Reset Password',
  caption: 'change your password',
  fields: [
    {
      placeHolder: 'Enter the new Password',
      secureTextEntry: true,
      name: 'password',
    },
    {
      placeHolder: 'Conifm your password',
      secureTextEntry: true,
      name: 'confirm password',
    },
  ],
  primaryBtn: {displayText: 'submit'},
};

export const signupConfig = {
  pageName: 'Signup',
  caption: 'Create A New Account',
  fields: [
    {placeholder: 'Enter the Email', secureTextEntry: false, name: 'email'},
    {
      placeholder: 'Enter the password',
      secureTextEntry: true,
      name: 'password',
    },
    {
      placeholder: 'Confirm the password',
      secureTextEntry: true,
      name: 'confirm password',
    },
  ],
  primaryBtn: {displayText: 'Create Account'},
  secondaryBtn: {displayText: 'Already Have an account?', pageType: 'login'},
};

export const ChangePassword = {
  pageName: 'Change Password',
  caption: 'Signin with your roll No',
  fields: [
    {
      placeHolder: 'Enter the old password',
      secureTextEntry: true,
      name: 'password',
    },
    {
      placeHolder: 'Enter the new Password',
      secureTextEntry: true,
      name: 'New Password',
    },
  ],
  primaryBtn: {displayText: 'Submit'},
};

const authFieldConfig = {
  signup: signupConfig,
  login: loginConfig,
  forgot: ForgotPasswordConfig,
  reset: ResetPasswordConfig,
  change: ChangePassword,
};

export default authFieldConfig;
