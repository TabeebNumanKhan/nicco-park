import { redirect } from 'next/navigation'

/** "/" opens the English site. Bengali and Hindi live at /bn and /hi. */
export default function Root() {
  redirect('/en')
}
