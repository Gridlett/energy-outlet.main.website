import { Metadata } from 'next'
import VerifyWhatsAppPage from './verify-account-client'

export const metadata: Metadata = {
  title: 'Verify Account',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page() {
  return <VerifyWhatsAppPage />
}
