import { transporter } from './transporter';

const fromEmail = 'authentication@nikanzeyaei.ir';

export const sendRegistrationEmail = async (email: string) => {
  return await transporter.sendMail({
    from: fromEmail,
    to: email,
    subject: 'Welcome',
    text: 'Thank you for registering on our website!',
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetURL = `http://localhost:3000/reset/${token}`;
  return await transporter.sendMail({
    from: fromEmail,
    to: email,
    subject: 'Password Reset',
    html: `
        <p> You requested a password reset! </p>
        <p> Click on the link below to reset your password! </p>
        <a href="${resetURL}"> ${resetURL} </a>
    `,
  });
};
