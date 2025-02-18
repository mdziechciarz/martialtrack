import CoachRegistrationView from './components/CoachRegistrationView/CoachRegistrationView';
import EmployeeRegistrationView from './components/EmployeeRegistrationView/EmployeeRegistrationView';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

import {validateInvitation} from '@/app/dashboard/settings/actions';

export default async function InvitationPage({params}) {
  const token = params.token;

  // Validate the token on the server side.
  const response = await validateInvitation({token});

  const {success: isValid, data} = response;

  // If the token is invalid, redirect the user to an error or "invalid invitation" page.
  if (!isValid) {
    revalidatePath('/login', 'layout');
    redirect(`/login?error=${encodeURIComponent('Zaproszenie jest już nieaktualne')}`);
  }

  if (!data?.role || (data.role !== 'admin' && data.role !== 'coach')) {
    redirect(`/error`);
  }

  if (data.role === 'admin') return <EmployeeRegistrationView email={data.email} token={token} />;

  if (data.role === 'coach') return <CoachRegistrationView email={data.email} token={token} />;

  redirect(`/error`);
}
