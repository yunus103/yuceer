/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path will handle this generic page.
 * To learn more about the structure of this file and how it works, see:
 * https://www.sanity.io/docs/nextfs-app-router
 */

import {NextStudio} from 'next-sanity/studio'
import config from '../../../../../sanity.config'

export const dynamic = 'force-static'

export {metadata, viewport} from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
